LOANSBHARTI — PRODUCTION SITE NOTES

Production hosting
- The production site is configured as a Cloudflare Worker with Static Assets, not Netlify.
- wrangler.jsonc is the deployment configuration: Worker entry point worker.js, static asset directory ".", binding ASSETS, run_worker_first enabled, and 404-page handling.
- .assetsignore excludes Worker/configuration files and this README from the public static-asset upload.
- worker.js permanently redirects the apex host (loansbharti.com) to https://www.loansbharti.com/ and returns HTTP 410 for legacy /shopdetail/* spam paths.
- _redirects contains permanent extensionless-URL and trailing-slash redirects; _headers contains response security headers. Keep both in the static asset root.
- The canonical site host is https://www.loansbharti.com. robots.txt points to https://www.loansbharti.com/sitemap.xml.

Pages
- Home, Debt Consolidation, Personal Loan, EMI Calculator, About, Contact, Privacy Policy, Terms and the Finance Hub are served from the repository root and /finance.
- The EMI calculator runs in the browser and provides indicative estimates only.
- Keep the existing page design, lender section, approved business details and enquiry flow intact when making changes.

Lead form
- script.js submits the website enquiry form to the configured Google Apps Script web-app endpoint.
- The request uses mode "no-cors", so the browser cannot inspect the endpoint's response. A successful client-side request does not independently prove that a lead was stored or delivered. Verify a test lead in the actual destination after changing the form or endpoint.

Trust and legal review
- privacy-policy.html and terms.html currently contain draft/template wording and are not final legal documents. Before scaling paid lead collection, replace them with legally reviewed, accurate details covering the registered legal entity, data collected, purposes, processors, lender sharing, retention/deletion, privacy contact and grievance process. Do not invent company or regulatory credentials.

Contact
- WhatsApp / phone: +91 95685 80025
- Email: care@loansbharti.com
- Office: A-011, RMG Ninex, Sector 37C, Gurugram, Haryana 122001
