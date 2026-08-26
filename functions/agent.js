/* Optional: model-backed answers for the investor assistant.
   ============================================================================
   The site works without this. Deploy it only if you want the assistant to
   handle open-ended phrasing rather than matching against the knowledge base.

   Netlify:  drop this folder in as-is (functions directory `functions`).
   Vercel:   move to `api/agent.js`.

   Then set the key as an environment variable in your host's dashboard —
   never in the repository:

       ANTHROPIC_API_KEY=sk-ant-...

   And point the front end at it, in each page or in site.js:

       window.PCP_AGENT = { endpoint: '/.netlify/functions/agent' };

   The system prompt below is the guard rail. It is deliberately strict: on a
   site that publicly markets a Reg D 506(c) offering, an assistant that
   improvises a return figure or offers a recommendation is a compliance
   problem, not a feature.
   ========================================================================== */

const MODEL = 'claude-sonnet-5';

const SYSTEM = `You are the investor assistant for Preferred Capital Partners, a private real estate
investment firm that acquires and operates value-add multifamily assets in the Southeastern United States
for accredited investors.

Answer ONLY from the CONTEXT provided in the user message. The context is drawn from the firm's published
material.

Absolute rules:
- If the context does not contain the answer, say so plainly and direct the person to
  invest@prefcapitalpartners.com. Never fill a gap with a plausible guess.
- Never state a return, fee, minimum, hold period or performance figure that is not in the context.
- Never give investment, legal or tax advice, and never say whether someone should invest. The firm is not
  a registered investment adviser. Direct those questions to the person's own advisers.
- When you mention targets, terms or performance, add that they are indicative, not guaranteed, and
  qualified by the offering documents.
- Never claim an investment is safe, guaranteed or low-risk.

Voice: measured, factual, professional. The audience is high-net-worth and financially literate. No sales
language, no urgency, no exclamation marks, no flattery. Two to four sentences unless more is genuinely
needed. Plain text or simple HTML links only.`;

export default async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return Response.json({ error: 'ANTHROPIC_API_KEY is not set' }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const question = String(body.question || '').slice(0, 600);
  const context = String(body.context || '').slice(0, 12000);
  if (!question) {
    return Response.json({ error: 'No question' }, { status: 400 });
  }

  const history = Array.isArray(body.history) ? body.history.slice(-6) : [];
  const messages = [
    ...history
      .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && m.content)
      .map((m) => ({ role: m.role, content: String(m.content).slice(0, 2000) })),
    { role: 'user', content: `CONTEXT:\n${context}\n\nQUESTION: ${question}` }
  ];

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 500,
        system: SYSTEM,
        messages
      })
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('Anthropic API error', res.status, detail);
      return Response.json({ error: 'Upstream error' }, { status: 502 });
    }

    const data = await res.json();
    const answer = (data.content || [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim();

    if (!answer) {
      return Response.json({ error: 'Empty response' }, { status: 502 });
    }
    return Response.json({ answer });
  } catch (err) {
    console.error('agent function failed', err);
    return Response.json({ error: 'Request failed' }, { status: 500 });
  }
};
