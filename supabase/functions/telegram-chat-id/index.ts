// Helper: returns chat IDs the bot has recently seen (add bot to the group,
// send any message there, then call this function once).
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const token = Deno.env.get("TELEGRAM_BOT_TOKEN");
  if (!token) {
    return new Response(JSON.stringify({ error: "TELEGRAM_BOT_TOKEN not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
  const data = await res.json();
  if (!res.ok || data?.ok === false) {
    console.error(`getUpdates failed [${res.status}]:`, JSON.stringify(data));
    return new Response(JSON.stringify({ error: "telegram_failed", details: data }), {
      status: res.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const chats = new Map<string, unknown>();
  for (const u of data.result ?? []) {
    const chat = u.message?.chat ?? u.channel_post?.chat ?? u.my_chat_member?.chat;
    if (chat?.id) chats.set(String(chat.id), { id: chat.id, type: chat.type, title: chat.title ?? chat.username });
  }

  return new Response(JSON.stringify({ chats: [...chats.values()] }, null, 2), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
