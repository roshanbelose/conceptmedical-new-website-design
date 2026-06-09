# Concept Medical — Dual-Entry Homepage · Deploy Guide

A self-contained static site (HTML/CSS/JSX-in-browser). No build step, no server — it
runs from plain files. Below is the fastest way to get a **shareable, non-indexable**
link for management review.

---

## What's in this project
- `index.html` — entry point (loads everything)
- `homepage.css`, `colors_and_type.css` — styles
- `*.jsx` — React components (compiled in-browser via Babel)
- `assets/` — logos, product renders, badges, background
- `fonts/` — bundled font subset
- `robots.txt` + `<meta name="robots" content="noindex,…">` — already block search engines

> The whole thing is also available as a **single self-contained file**:
> `Concept Medical - Homepage (Standalone).html` — works offline, e-mail it directly if
> you don't want to host anything.

---

## Option A — GitHub Pages (recommended for a shareable link)

You already have the repo: **roshanbelose/conceptmedical-new-website-design**

### 1. Add the files
Easiest (no Git needed): on github.com open the repo →
**Add file → Upload files** → drag in everything from this project →
**Commit changes**.

Or with Git:
```bash
git clone https://github.com/roshanbelose/conceptmedical-new-website-design.git
cd conceptmedical-new-website-design
# copy all project files into this folder, then:
git add .
git commit -m "Dual-entry homepage"
git push origin main
```

### 2. Turn on Pages
Repo → **Settings → Pages** →
**Source: Deploy from a branch** → **Branch: main / (root)** → **Save**.

Wait ~1 minute. Your link will be:
```
https://roshanbelose.github.io/conceptmedical-new-website-design/
```

### 3. It's already non-indexable
The page ships with `noindex, nofollow` meta tags + a `robots.txt` (`Disallow: /`),
so Google and other engines will not list it. The link still works for anyone you
send it to — it's *unlisted*, not access-controlled.

---

## Option B — Want it password-protected (not just unlisted)?
GitHub Pages can't password-protect a free site. Use either:
- **Netlify** (free): drag the project folder onto app.netlify.com → "Deploy" →
  Site settings → **Access control → Password protection**.
- **Vercel** (free): import the repo → Settings → **Deployment Protection**.

Both give an instant URL and let you set a password to share with management.

---

## Notes
- A **personal access token** is only needed if you push via the command line over HTTPS.
  Create your own at GitHub → Settings → Developer settings → Personal access tokens.
  Never share a token with anyone — it acts as your password.
- Nothing here needs `npm install` or a build — it's static files.
