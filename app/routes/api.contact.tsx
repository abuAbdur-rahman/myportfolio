import type { ActionFunctionArgs } from "react-router";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { "Content-Type": "application/json" } });
  }

  let body: { name?: string; email?: string; message?: string; website?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  const { name, email, message, website } = body;

  if (website) {
    return Response.json({ ok: true });
  }
  if (!name || !email || !message) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }
  if (message.trim().length < 10) {
    return Response.json({ error: "Message too short" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || "hello@abdulazeez.dev";
  const from = process.env.CONTACT_FROM || "portfolio@abdulazeez.dev";

  if (!apiKey) {
    console.log("[contact] dev fallback — no RESEND_API_KEY", { name, email });
    return Response.json({ ok: true, dev: true });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject: `Portfolio: message from ${name}`, reply_to: email, text: `From: ${name} <${email}>\n\n${message}` }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("[contact] resend error", err);
      return Response.json({ error: "Failed to send" }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Network error" }, { status: 500 });
  }
}

// GET not used — form posts JSON; also support loader for health check
export function loader() {
  return Response.json({ ok: true, expects: "POST JSON {name,email,message}" });
}
