#!/usr/bin/env python3
"""Turn on the investor assistant's model layer, end to end, in one command.

    python enable-assistant.py

What it does, in order:

  1. Reads ANTHROPIC_API_KEY from the leadtide-ai Netlify site.
  2. Tests it against Anthropic before touching anything.
  3. If it is valid, sets it on this site — which overrides the dead
     team-level key currently being inherited.
  4. Triggers a production rebuild, because Netlify bakes environment
     variables at build time and an existing deploy will not pick one up.
  5. Probes the live endpoint and tells you whether it actually works.

The key is held in memory for the length of the run and passed straight from
one command to the next. It is never printed, never written to disk, and never
put in a shell argument that would land in your history. If any step fails the
script stops and says why rather than leaving things half-configured.

Why the validation step matters: the live site is currently failing with
401 invalid x-api-key, and this site has no variable of its own in any
context — so the key being rejected is one inherited from the LeadTide team.
If the key on leadtide-ai is that same key, this script will tell you it is
invalid instead of quietly wiring up a second broken site.
"""

import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.request

SOURCE_SITE = "leadtide-ai"
TARGET_SITE = "precious-bunny-c48b30"
LIVE_URL = "https://prefcapitalpartners.com"
VAR = "ANTHROPIC_API_KEY"


def run(args, **kw):
    return subprocess.run(args, capture_output=True, text=True, shell=False, **kw)


def step(n, text):
    print("\n  [%d/5] %s" % (n, text))


def fail(msg, hint=None):
    print("\n  STOPPED. %s" % msg)
    if hint:
        print("  %s" % hint)
    print("")
    return 1


def main():
    print("\n  Enabling the investor assistant on %s" % LIVE_URL)

    # --- 1. read -----------------------------------------------------------
    step(1, "Reading %s from %s" % (VAR, SOURCE_SITE))
    r = run(["netlify", "env:get", VAR, "--site", SOURCE_SITE])
    key = (r.stdout or "").strip().splitlines()
    key = key[-1].strip() if key else ""
    if r.returncode != 0 or not key or key.startswith("No value"):
        return fail("Could not read the key from %s." % SOURCE_SITE,
                    "Check `netlify status` is logged in, then set it by hand in the "
                    "Netlify dashboard.")
    print("        got a key: %s… (%d chars)" % (key[:11], len(key)))

    # --- 2. validate -------------------------------------------------------
    step(2, "Testing it against Anthropic before changing anything")
    payload = json.dumps({
        "model": "claude-sonnet-5",
        "max_tokens": 1,
        "messages": [{"role": "user", "content": "hi"}],
    }).encode("utf-8")
    req = urllib.request.Request(
        "https://api.anthropic.com/v1/messages", data=payload, method="POST",
        headers={"content-type": "application/json", "x-api-key": key,
                 "anthropic-version": "2023-06-01"})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            resp.read()
        print("        VALID")
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", "replace")
        try:
            why = json.loads(body).get("error", {}).get("message", body)
        except Exception:
            why = body
        if e.code == 401:
            return fail("This key is INVALID (401): %s" % why,
                        "It is the same key the live site is already being rejected for.\n"
                        "  Generate a fresh one at console.anthropic.com, then run:\n\n"
                        '    netlify env:set %s "sk-ant-your-new-key" --site %s\n'
                        "    netlify deploy --build --prod --site %s"
                        % (VAR, TARGET_SITE, TARGET_SITE))
        return fail("Anthropic returned HTTP %d: %s" % (e.code, why))
    except Exception as e:
        return fail("Could not reach Anthropic: %s" % e)

    # --- 3. set ------------------------------------------------------------
    step(3, "Setting %s on %s" % (VAR, TARGET_SITE))
    r = run(["netlify", "env:set", VAR, key, "--site", TARGET_SITE])
    if r.returncode != 0:
        return fail("netlify env:set failed.", (r.stderr or r.stdout or "").strip()[:300])
    print("        set")

    # --- 4. redeploy -------------------------------------------------------
    step(4, "Rebuilding, so the deploy picks the variable up")
    r = run(["netlify", "deploy", "--build", "--prod", "--site", TARGET_SITE])
    if r.returncode != 0:
        return fail("The rebuild failed.",
                    "The variable is set, so a redeploy from the Netlify dashboard "
                    "will finish the job.\n  " + (r.stderr or "").strip()[:300])
    print("        deployed")

    # --- 5. verify ---------------------------------------------------------
    step(5, "Checking the live endpoint")
    body = json.dumps({"question": "what is a capital call", "context": "probe"}).encode()
    for attempt in range(1, 7):
        req = urllib.request.Request(
            LIVE_URL + "/api/agent", data=body, method="POST",
            headers={"content-type": "application/json", "origin": LIVE_URL})
        try:
            with urllib.request.urlopen(req, timeout=45) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            if data.get("answer"):
                print("        the model answered\n")
                print("  DONE. The assistant is fully live at %s\n" % LIVE_URL)
                return 0
        except urllib.error.HTTPError as e:
            if attempt == 6:
                return fail("The endpoint still returns HTTP %d." % e.code,
                            "Check the logs: netlify logs --source functions --function agent")
        except Exception:
            pass
        time.sleep(8)
    return fail("The endpoint did not answer in time.",
                "Check: netlify logs --source functions --function agent")


if __name__ == "__main__":
    sys.exit(main())
