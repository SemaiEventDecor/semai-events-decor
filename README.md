# Semai Events & Decor — website

A plain HTML, CSS and JavaScript rebuild of the Lovable site. No build step, no
npm, no framework, no subscription. Open `index.html` in a browser and it works.

## What's in here

```
index.html            Home
about/index.html      About
services/index.html   Services
packages/index.html   Packages
gallery/index.html    Gallery (filters + lightbox)
contact/index.html    Request a quote (working form)
404.html              Shown for broken links
css/style.css         All styling. Colours and fonts are at the very top.
js/main.js            Menu, gallery, form. Form settings are at the very top.
assets/               Your photos go here
download-assets.sh    Pulls the current photos off Lovable into assets/
sitemap.xml           Update the domain if it isn't semaieventsdecor.com
robots.txt            Same
.nojekyll             Tells GitHub Pages to serve the files as-is
```

## Step 1 — Get the photos

Right now the pages fall back to the photos still hosted on Lovable, so nothing
looks broken. That fallback dies the day you delete the Lovable project, so save
real copies once:

```bash
bash download-assets.sh
```

No terminal? On your Lovable site, right-click each photo → "Save image as" →
save into `assets/` using the exact filenames listed in `download-assets.sh`.

These are stock-style images. Replacing them with photos of your own events is
the single biggest improvement you can make to this site.

## Step 2 — Put it on GitHub

1. Go to <https://github.com/new>. Name the repo `semai-events-decor`. Public.
   Don't tick "Add a README".
2. On the empty repo page, click **uploading an existing file**.
3. Drag in everything from this folder — including the `css`, `js` and `assets`
   folders. Commit.
4. Repo → **Settings** → **Pages** → Source: *Deploy from a branch*,
   Branch: `main`, folder: `/ (root)`. Save.
5. Wait about a minute. Your site is live at
   `https://<your-username>.github.io/semai-events-decor/`.

Hidden files like `.nojekyll` can be awkward to drag in a browser. If it doesn't
upload, the site still works — you'd just create an empty file named
`.nojekyll` through GitHub's "Add file → Create new file" button.

## Step 3 — Use your own domain (optional)

In **Settings → Pages → Custom domain**, enter `semaieventsdecor.com`. Then at
your domain registrar add these DNS records:

| Type  | Name  | Value                     |
|-------|-------|---------------------------|
| A     | @     | 185.199.108.153           |
| A     | @     | 185.199.109.153           |
| A     | @     | 185.199.110.153           |
| A     | @     | 185.199.111.153           |
| CNAME | www   | `<your-username>.github.io.` |

Tick **Enforce HTTPS** once the certificate is issued. Hosting stays free.

## Step 4 — Make the quote form reach your inbox

Out of the box, pressing "Send inquiry" opens the visitor's own mail app with
every answer pre-filled and addressed to you. That works everywhere and costs
nothing, but some visitors won't have a mail app set up.

To have inquiries arrive without that:

1. Create a free form at <https://formspree.io> using
   `info@semaieventsdecor.com`.
2. Open `js/main.js` and paste the endpoint it gives you:

```js
const FORM_ENDPOINT = "https://formspree.io/f/xxxxxxxx";
```

The free tier covers 50 submissions a month. Formspree's own confirmation page
never appears — the form posts in the background and shows a thank-you message
on your own page.

## Editing the site

**Colours and fonts** — the top of `css/style.css`. Change `--wine` and the
accent updates on every page and every button at once.

**Text** — open the relevant `index.html` and edit between the tags.

**Adding a gallery photo** — save it into `assets/`, then in
`gallery/index.html` copy one `<figure class="shot">` block and change the
filename, the `data-category` and the `alt` text. Delete the `data-fallback`
attribute on any new photo. Categories are: `birthdays`, `bridal`, `baby`,
`engagements`, `weddings`, `other`.

**Menu, footer, and the closing call-to-action** are repeated in each HTML file,
so changing a menu item means changing it in all seven. That's the trade-off for
having no build step — find-and-replace across the folder handles it.

## Notes

- The brand is spelled **Semai** throughout — wordmark, page titles, meta
  descriptions and body copy. The domain and email address stay
  `semaieventsdecor.com`, which reads as "semai" + "eventsdecor".
- `sitemap.xml` and `robots.txt` assume `https://semaieventsdecor.com`. Update
  the address inside both if you use the github.io one instead.
- Phone number and social links are marked "coming soon", matching the original.
