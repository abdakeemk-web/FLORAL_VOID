# FLORAL VOID 2.0

Static site built by `node scripts/build.mjs` into `dist/`. The commission form posts
directly from the browser to Web3Forms, so there is no server code and no custom
domain, DNS setup, Gmail password, OAuth or domain verification is needed.

## Project layout
- `data/site.config.json`: links, nav, socials, the 8 commission services and the Web3Forms settings (single source of truth)
- `src/pages/*.html`: page bodies (first line is a meta comment with title and description)
- `src/partials/`: shared head, header, footer, social block
- `src/design-system.css` and `src/site.css`: approved design tokens and page styles
- `src/js/`: site, gallery and contact scripts (the contact script submits to Web3Forms)
- `public/`: static files copied as-is (images, icons). `source-images/`: untouched original photos
- `scripts/`: build, image tool, local preview server, API tests

## Run it locally
```
node scripts/build.mjs          # builds dist/
npm run dev                     # build + preview at http://localhost:8000
npm test                        # runs the form wiring tests (no real email is sent)
```
`npm test` checks the service list, the Web3Forms payload, validation states and that no
previous-provider code remains. It never contacts Web3Forms, so no real submission is sent.
You can also open `dist/` with VS Code Live Server to look at the pages.

## Commission form email setup (Web3Forms)
The form posts directly to `https://api.web3forms.com/submit`. Web3Forms emails the
application to the owner, using the applicant's `email` field as the **Reply-To** address,
so pressing Reply in Gmail answers the applicant. No server code, secrets file or custom
domain is involved. The public access key is intended by Web3Forms to live in the form.

Recipient: `abdakeemkehinde@gmail.com` (set by the Web3Forms account that owns the key).

### Setup steps for you
1. Create an account at web3forms.com **with the `abdakeemkehinde@gmail.com` Gmail address**.
2. Verify that email address when Web3Forms asks (check inbox and spam folder).
3. Copy your access key from the Web3Forms dashboard.
4. Open `data/site.config.json` and paste it as `forms.accessKey`, replacing `WEB3FORMS_ACCESS_KEY`.
5. Run `node scripts/build.mjs` and redeploy the site (Vercel builds automatically on push).
6. Submit a test application on the live site and check the Gmail inbox (and spam folder the first time).

No environment variables are needed in Vercel for the form. If the access key is still the
placeholder, submissions fail with an error message and no success is ever shown.

### Testing a real submission
Fill in the live form with a real applicant email you control, submit, then confirm:
- the owner Gmail receives one application email containing every field, and
- pressing Reply addresses the applicant (check the To: line before sending).

### Free-plan limitations (current Web3Forms plans)
- 250 submissions per month on the free plan.
- **No file attachments on free.** Reference images must be shared through the
  Reference Links field (FurAffinity, Toyhouse, Google Drive, Dropbox) until a paid
  plan with uploads is added. Do not promise applicants that uploaded files will arrive.
- **No automatic confirmation email to the applicant on free** (autoresponder is paid).
  The success message only says the application was received; it never claims an email
  was sent to the applicant.

### Security notes
- The browser validates every field first (required fields, email format, length limits).
- A hidden `botcheck` honeypot field plus Web3Forms' spam protection block bots.
- The submit button disables while sending, so double clicks cannot send twice.
- Errors shown in the browser are generic. Web3Forms dashboard keeps the submission log.

## Redirects
`/gallary.html` goes to `/gallery` and `/term.html` goes to `/terms` (301, in `vercel.json`).
