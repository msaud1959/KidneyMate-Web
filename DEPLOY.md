# Putting KidneyMate live (free) and editing content

This site is a Statamic (PHP) app, but it is set up to publish as a **static
website** so you can host it on **Netlify's free plan** and point your Wix
domain at it. Total cost: $0.

There are two separate things below:

1. **Going live** – get the website on the internet on your Wix domain.
2. **Editing content** – log into Statamic and change words, images and pages.

---

## 1. Going live on Netlify (free), with your Wix domain

### Step 1 – Create a free Netlify account
Go to https://netlify.com and sign up (the free "Starter" plan is enough).
Choose "Sign up with GitHub" so it can see your repository.

### Step 2 – Connect this repository
- In Netlify: **Add new site → Import an existing project → GitHub**.
  (Shortcut: while logged in, opening
  `https://app.netlify.com/start/deploy?repository=https://github.com/msaud1959/kidneymate-web`
  starts this import for you.)
- Pick the `msaud1959/kidneymate-web` repository.
- **Set the branch to deploy** to `feature/kidneymate-website-build` (that is
  where the finished site lives). Or merge that branch into `main` first and
  deploy `main`. This matters, otherwise Netlify may build an empty branch.
- Netlify reads `netlify.toml` in this repo, so the build settings fill in
  automatically. You do **not** need to type a build command or publish
  directory. Just click **Deploy**.
- The first build takes a few minutes (it installs PHP, builds the site and
  renders every page to static HTML). When it finishes you get a temporary
  address like `https://random-name.netlify.app`. Open it to check the site.

### Step 3 – Connect your Wix domain
1. In Netlify: **Domain management → Add a domain** → type your domain
   (e.g. `kidneymate.com.au`).
2. Netlify shows you the DNS records to add. Usually:
   - an **A record** for `@` pointing to Netlify's IP (`75.2.60.5`), and
   - a **CNAME** for `www` pointing to your `something.netlify.app` address.
   (Use whatever Netlify actually shows you – it is the source of truth.)
3. Log into **Wix → your domain → DNS records / Advanced DNS**, and add those
   two records exactly as Netlify listed them. Save.
4. Back in Netlify, wait for it to verify (minutes to a few hours). Netlify
   then issues a free SSL certificate automatically, and your domain shows the
   KidneyMate site with `https://`.

> Tip: only edit the **DNS records** at Wix. Do not change the nameservers
> unless you also intend to move your email away from Wix.

### After this
Every time new work is pushed to the `feature/kidneymate-website-build`
branch (or whichever branch you set as the production branch in Netlify),
Netlify rebuilds and redeploys the site automatically. You do nothing.

---

## Forms (waitlist and contact)

The "Join the waitlist" and contact forms are wired to **Netlify Forms**,
which is free for up to 100 submissions per month. Nothing extra to set up.

- Submissions appear in Netlify under **Forms**.
- To get an email each time someone signs up: Netlify → **Forms → Settings and
  notifications → Add notification → Email notification**, and enter your
  address (`msaud1959@gmail.com`).
- Spam is filtered by a hidden honeypot field and Netlify's built-in filtering.

---

## 2. Editing content in Statamic

Your content (page text, images, research entries) lives as simple files in
this repository. You edit them through the **Statamic Control Panel**, a
friendly dashboard. Because the live site is static, the Control Panel runs on
your own computer; you edit there, push your changes, and Netlify rebuilds the
live site.

### Your login
An admin account has already been created:

- **Email:** `msaud1959@gmail.com`
- **Temporary password:** `KidneyMate2026!`
- **Please change this password the first time you log in** (top-right avatar →
  your account → change password).

### Running the Control Panel on your computer (one-time setup)
You need PHP 8.3+, Composer and Node installed. Then, in the project folder:

```bash
composer install
npm install
npm run build
php artisan serve
```

Open **http://localhost:8000/cp** and log in with the details above.
Edit pages under **Collections → Pages**, images under **Assets**, and research
under **Collections → Evidence**. Everything you change is saved as files in
the project.

### Publishing your edits
After editing in the Control Panel:

```bash
git add .
git commit -m "Update content"
git push
```

Netlify sees the push and rebuilds the live site within a few minutes.

### The no-install alternative
If you would rather not install anything, you can edit the content files
directly on GitHub in your browser (they are readable Markdown under
`content/collections/pages/`). Commit the change on GitHub and Netlify
rebuilds. You lose the visual dashboard, but it needs zero setup.

---

## If you later want the full online dashboard (optional, paid)

If one day you want the Statamic Control Panel available online 24/7 (so you
can edit from anywhere without running it locally), host the full app on a
small PHP host such as **Cloudways**, **Laravel Forge** or **Ploi**
(~AUD 10–20/month) and point the same Wix domain at it. The site and the
dashboard would then run from one place, and you would not need the static
export. Everything in this repo already supports that; it is only a hosting
choice.
