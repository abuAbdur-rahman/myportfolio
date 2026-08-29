export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { "Content-Type": "application/json" } });
  }

  let body: { name?: string; email?: string; message?: string; website?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  const { name, email, message, website } = body;

  // Honeypot — bots fill this invisible field
  if (website) {
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  }

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  if (message.trim().length < 10) {
    return new Response(JSON.stringify({ error: "Message too short" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: "Invalid email" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || "hello@abdulazeez.dev";
  const from = process.env.CONTACT_FROM || "portfolio@abdulazeez.dev";

  // Dev fallback — no key set, log and pretend success so form can be tested without Resend
  if (!apiKey) {
    console.log("[contact] no RESEND_API_KEY — dev fallback", { name, email, message: message.slice(0, 80) });
    return new Response(JSON.stringify({ ok: true, dev: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: `Portfolio: message from ${name}`,
        reply_to: email,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[contact] resend error", err);
      return new Response(JSON.stringify({ error: "Failed to send" }), { status: 502, headers: { "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (e) {
    console.error("[contact] fetch error", e);
    return new Response(JSON.stringify({ error: "Network error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}

export const config = {
  runtime: "edge",
};
