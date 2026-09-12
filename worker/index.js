const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders
    }
  });
}

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return json({
        ok: true,
        service: "AI YouTube Automation API",
        status: "online"
      });
    }

    if (url.pathname === "/api/plan" && request.method === "POST") {
      const body = await request.json().catch(() => ({}));
      const topic = String(
        body.topic || "AI cartoon short"
      ).trim();

      return json({
        ok: true,
        topic,
        message: "Automation API is ready.",
        steps: [
          "Generate story/script",
          "Generate cartoon scenes",
          "Generate voice",
          "Create title, description and hashtags",
          "Publish or schedule to YouTube",
          "Track channel analytics"
        ]
      });
    }

    return json({
      ok: false,
      error: "API route not found"
    }, 404);
  }
};