# Avril Solutions — Site Maintenance Guide

Quick reference so edits are fast. **Read this first, then jump straight to the file/line you need.**

---

## The essentials
- **Live site:** https://avrilsolutionsnw.com (HTTPS enforced, padlock on). `www` also works.
- **Repo:** https://github.com/ATA-26/avril-website — branch **`main`**.
- **Host:** GitHub Pages (branch `main`, root). **Domain DNS:** Squarespace (4 A-records → GitHub + `www` CNAME → `ata-26.github.io`).
- **Email:** @avrilsolutionsnw.com runs on **Google Workspace** via Squarespace MX records. ⚠️ **Never delete the MX or TXT DNS records** or email breaks.

## How to publish an edit (the whole loop)
```
1. Edit the file(s) locally
2. git add -A
3. git commit -m "what changed"
4. git push origin main
5. Wait ~1–2 min → change is live at avrilsolutionsnw.com (hard-refresh Ctrl+F5 to bypass browser cache)
```
That's it. GitHub Pages auto-rebuilds on every push.

---

## File map
| File | What it is |
|------|-----------|
| `index.html` | Home page |
| `how-it-works.html` | Process / cash vs. novation |
| `about.html` | About + team |
| `faq.html` | FAQ |
| `contact.html` | Contact + lead form |
| `styles.css` | All styling (shared) |
| `script.js` | Mobile nav, scroll reveal, form success, floating call widget |
| `assets/logo.png`, `assets/logo-white.png` | Logos (⚠️ must live in `assets/`, HTML links to `assets/…`) |
| `CNAME` | Sets the custom domain — **do not delete** |

Every page shares the same **topbar, header, footer, and floating widget** (copy-paste blocks). If you change one of those, change it in **all 5 pages**.

---

## Where to change common things
| To change… | Where |
|------------|-------|
| **Main phone number** (topbar, header, hero, forms, CTA, footer "Main line", floating widget) | Currently `(425) 675-9964` / `tel:+14256759964`. Search-replace across all 5 HTML files. |
| **Footer "Email"** | Currently `andyr@avrilsolutionsnw.com`. In the footer `<strong>Email</strong>` line of all 5 pages. |
| **Slogan** | `Creating a WIN for everyone.` — footer `<p class="footer__slogan">` in all 5 pages. Style = `.footer__slogan` in `styles.css`. |
| **Team members** (name/role/number/email/order) | Team cards `<div class="member">` in `index.html` + `about.html`; contact list in `contact.html`; and the floating widget block in all 5 pages. |
| **Floating "Talk to a real person" widget** | HTML block `<div class="talk-fab">` near end of each of the 5 pages. Styles = `.talk-fab*` in `styles.css`. Behavior = bottom of `script.js`. |
| **Testimonials** | `index.html`, section "Sellers say". |
| **Lead form fields** | `index.html` (hero) and `contact.html`. |

---

## Current team info (as of 2026-07-02)
Order used everywhere (Rodriguez first, then Thomas, then Matute):
1. **Andy Rodriguez** — Operations Manager — `(425) 675-9964` — `andyr@avrilsolutionsnw.com`  *(also the site's main line)*
2. **Thomas Jones** — Acquisitions Manager — `(425) 426-2628` — `thomas@avrilsolutionsnw.com`
3. **Andy Matute** — Founder & CEO — **no contact info shown** (by request; he's not on first-line leads). Appears on Home + About team only, not on the Contact call-list.

---

## Gotchas
- **Logos** must be in `assets/` (all HTML references `assets/logo.png`). Don't move them to root.
- **Shared blocks** (topbar/header/footer/floating widget) are duplicated in all 5 pages — update everywhere.
- **DNS:** only the website A-records + `www` CNAME point to GitHub. Leave Google Workspace **MX** and **TXT** records alone.
- **`.claude/`** folder is git-ignored (local tool files) — don't commit it.

## Lead forms — LIVE (Formspree)
Both forms (hero on `index.html`, form on `contact.html`) POST to **Formspree** endpoint `https://formspree.io/f/xgojpebk`, which delivers leads to **andyr@avrilsolutionsnw.com**.
- Submit is AJAX (`fetch`) in `script.js` → keeps the inline "Thanks" success message; shows a call-us error if the POST fails.
- Spam: hidden `_gotcha` honeypot + `_subject` set on each form.
- To change the destination email: do it in the **Formspree dashboard** (not in code). To change which endpoint is used: replace `formspree.io/f/xgojpebk` in both HTML files.
- Free tier ≈ 50 submissions/month.
