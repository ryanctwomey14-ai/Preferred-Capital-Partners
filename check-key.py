#!/usr/bin/env python3
"""Tell you whether an Anthropic API key actually works, before you wire it up.

The assistant on this site is currently failing with a 401. A key IS reaching
the function — it is inherited from the Netlify team, since this site has no
variable of its own in any context — and Anthropic is rejecting it. So copying
that same key from wherever else it lives would very likely reproduce the same
failure. Check first.

Usage, from this folder:

    $env:ANTHROPIC_API_KEY="sk-ant-..."     (Windows PowerShell)
    set ANTHROPIC_API_KEY=sk-ant-...        (Windows cmd)
    export ANTHROPIC_API_KEY=sk-ant-...     (bash)

    python check-key.py

It makes the smallest possible request — one token — and reports only whether
the key was accepted. The key is read from the environment, never written to
disk, never printed, and only its length and public "sk-ant-" style prefix are
shown so you can tell two keys apart without exposing either.
"""

import json
import os
import sys
import urllib.error
import urllib.request

API_URL = "https://api.anthropic.com/v1/messages"
MODEL = "claude-sonnet-5"


def main():
    key = os.environ.get("ANTHROPIC_API_KEY", "").strip()
    if not key:
        print("\n  ANTHROPIC_API_KEY is not set in this shell.")
        print("  Set it, then run this again.\n")
        return 2

    # Enough to distinguish two keys, not enough to use one.
    shape = "%s… (%d chars)" % (key[:11], len(key))
    print("\n  Testing %s" % shape)

    payload = json.dumps({
        "model": MODEL,
        "max_tokens": 1,
        "messages": [{"role": "user", "content": "hi"}],
    }).encode("utf-8")

    req = urllib.request.Request(
        API_URL, data=payload, method="POST",
        headers={
            "content-type": "application/json",
            "x-api-key": key,
            "anthropic-version": "2023-06-01",
        },
    )

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            json.loads(resp.read().decode("utf-8"))
        print("\n  VALID — this key works.\n")
        print("  Wire it to the site with:\n")
        print('    netlify env:set ANTHROPIC_API_KEY "$env:ANTHROPIC_API_KEY" '
              '--site precious-bunny-c48b30\n')
        print("  Then redeploy — Netlify bakes environment variables at build time.\n")
        return 0
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", "replace")
        try:
            msg = json.loads(detail).get("error", {}).get("message", detail)
        except Exception:
            msg = detail
        if e.code == 401:
            print("\n  INVALID — Anthropic rejected this key (401).")
            print("  Reason: %s" % msg)
            print("\n  This is the same failure the live site is showing, so this is")
            print("  probably the key already in circulation. Generate a fresh one at")
            print("  console.anthropic.com and test that instead.\n")
        elif e.code == 429:
            print("\n  The key is real, but rate limited or out of credit (429).")
            print("  Reason: %s\n" % msg)
        else:
            print("\n  Request failed with HTTP %d." % e.code)
            print("  Reason: %s\n" % msg)
        return 1
    except Exception as e:
        print("\n  Could not reach the API: %s\n" % e)
        return 1


if __name__ == "__main__":
    sys.exit(main())
