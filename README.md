# Semai Events & Decor — website

A plain HTML, CSS and JavaScript rebuild of the Lovable site. No build step, no
npm, no framework, no subscription. Open `index.html` in a browser and it works.

Every file sits in one flat folder with no subdirectories. That's deliberate:
browser uploads to GitHub flatten folder structures, which breaks a site built
around them. Nothing here can break that way.

## What's in here

```
index.html          Home
about.html          About
services.html       Services
packages.html       Packages
gallery.html        Gallery (filters + lightbox)
contact.html        Request a quote
404.html            Shown for broken links
style.css           All styling. Colours and fonts are at the very top.
main.js             Menu, gallery, form. Form settings are at the very top.
sitemap.xml         Update the domain here if you move to your own
robots.txt          Same
download-assets.sh  Pulls the current photos off Lovable
.nojekyll           Tells GitHub Pages to serve the files as-is
```

Photos also live in this same folder, alongside the HTML.

## Putting it on GitHub

If the repository already has files in it, just upload these on top — matching
filenames get overwritten and the new pages get added. Nothing needs deleting.

1. In your repository, click **Add file → Upload files**.
2. Open this folder, select **all the files inside it**, and drag them onto the
   page. There are no subfolders to worry about.
3. Scroll down, click **Commit changes**, and wait for it to finish.
4. If Pages isn't on yet: **Settings → Pages → Source: Deploy from a branch**,
   branch `main`, folder `/ (root)`, Save.

Your site is at `https://semaieventdecor.github.io/semai-events-decor/`.

Hidden files like `.nojekyll` can be awkward to drag. On Mac press
Cmd+Shift+period to reveal it; on Windows tick View → Hidden items. If it won't
upload, the site still works — you can create an empty file named `.nojekyll`
through **Add file → Create new file**.

## Get the photos

The pages currently fall back to the photos still hosted on Lovable, so nothing
looks broken. That fallback dies the day you delete the Lovable project, so save
real copies. Right-click each photo on your Lovable site, choose "Save image
as", and save it using the exact filenames listed in `download-assets.sh`:

```
hero.jpg              about-studio.jpg       service-birthday.jpg
service-bridal.jpg    service-baby.jpg       service-engagement.jpg
service-custom.jpg
```

Then upload them to the repository the same way as the HTML files. They belong
in the root, next to `index.html`.

These are stock-style images. Replacing them with photos of your own events is
the single biggest improvement you can make to this site.

## Using your own domain

In **Settings → Pages → Custom domain**, enter `semaieventsdecor.com`. Then at
your domain registrar add these DNS records:

| Type  | Name | Value                            |
|-------|------|----------------------------------|
| A     | @    | 185.199.108.153                  |
| A     | @    | 185.199.109.153                  |
| A     | @    | 185.199.110.153                  |
| A     | @    | 185.199.111.153                  |
| CNAME | www  | `semaieventdecor.github.io.`     |

Tick **Enforce HTTPS** once the certificate is issued. Hosting stays free.

Afterwards, open each HTML file and change the address in the `canonical` and
`og:url` tags from the github.io one to `https://semaieventsdecor.com`, and do
the same inside `sitemap.xml` and `robots.txt`. Search engines use those to work
out which address is the real one.

## Making the quote form reach your inbox

Out of the box, pressing "Send inquiry" opens the visitor's own mail app with
every answer pre-filled and addressed to you. That works everywhere and costs
nothing, but some visitors won't have a mail app set up.

To have inquiries arrive without that:

1. Create a free form at <https://formspree.io> using
   `info@semaieventsdecor.com`.
2. Open `main.js` and paste the endpoint it gives you near the top:

```js
const FORM_ENDPOINT = "https://formspree.io/f/xxxxxxxx";
```

The free tier covers 50 submissions a month. Formspree's own confirmation page
never appears — the form posts in the background and shows a thank-you message
on your own page.

## Editing the site

**Colours and fonts** — the top of `style.css`. Change `--wine` and the accent
updates on every page and every button at once.

**Text** — open the relevant `.html` file and edit between the tags. You can do
this directly on GitHub: click the file, then the pencil icon.

**Adding a gallery photo** — upload it, then in `gallery.html` copy one
`<figure class="shot">` block and change the filename, the `data-category` and
the `alt` text. Delete the `data-fallback` attribute on any new photo.
Categories are: `birthdays`, `bridal`, `baby`, `engagements`, `weddings`,
`other`.

**Menu, footer, and the closing call-to-action** are repeated in each HTML file,
so changing a menu item means changing it in all seven. That's the trade-off for
having no build step.

## Notes

- The brand is spelled **Semai** throughout. The domain and email address stay
  `semaieventsdecor.com`, which reads as "semai" + "eventsdecor".
- Page addresses end in `.html` rather than being folders. That's the cost of
  the flat structure, and it makes no practical difference to visitors or to
  search engines.
- Phone number and social links are marked "coming soon", matching the original.
