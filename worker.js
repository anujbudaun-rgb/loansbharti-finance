export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Keep one canonical host so Google consolidates signals on www.
    if (url.hostname === "loansbharti.com") {
      url.hostname = "www.loansbharti.com";
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === "/shopdetail" || url.pathname.startsWith("/shopdetail/")) {
      return new Response(
        "<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"robots\" content=\"noindex, nofollow\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Page Permanently Removed | LoansBharti</title></head><body><main><h1>Page permanently removed</h1><p>This URL is no longer available.</p><a href=\"/\">Go to LoansBharti homepage</a></main></body></html>",
        {
          status: 410,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "X-Robots-Tag": "noindex, nofollow",
            "Cache-Control": "public, max-age=3600"
          }
        }
      );
    }

    return env.ASSETS.fetch(request);
  }
};
