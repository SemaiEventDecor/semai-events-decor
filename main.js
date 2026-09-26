/* =============================================================
   Semai Events & Decor — site scripts
   No frameworks, no build step, no dependencies.
   ============================================================= */

/* -------------------------------------------------------------
   1. WHERE THE CONTACT FORM SENDS
   -------------------------------------------------------------
   Leave FORM_ENDPOINT as "" and the form opens the visitor's mail
   app with everything pre-filled — works immediately, no signup.

   For inquiries to land in your inbox without the visitor needing
   a mail app, create a free form at https://formspree.io, then
   paste the endpoint it gives you between the quotes below:

     const FORM_ENDPOINT = "https://formspree.io/f/xxxxxxxx";
   ------------------------------------------------------------- */
const FORM_ENDPOINT = "";
const CONTACT_EMAIL = "info@semaieventsdecor.com";

/* --- Mobile navigation -------------------------------------- */
(function nav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("primary-nav");
  if (!toggle || !menu) return;

  const isMobile = () => window.matchMedia("(max-width: 899px)").matches;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    menu.hidden = !open;
  };

  const sync = () => setOpen(!isMobile());
  sync();
  window.addEventListener("resize", sync);

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMobile() && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });
})();

/* --- Image fallback ------------------------------------------
   Photos load from your own /assets folder. Until you drop the
   files in there, any image with a data-fallback attribute
   quietly falls back to the copy still hosted on Lovable, so the
   site never shows a broken image.
   ------------------------------------------------------------- */
(function imageFallback() {
  document.querySelectorAll("img[data-fallback]").forEach((img) => {
    img.addEventListener("error", function handle() {
      img.removeEventListener("error", handle);
      img.src = img.dataset.fallback;
    });
    if (img.complete && img.naturalWidth === 0) img.src = img.dataset.fallback;
  });
})();

/* --- Gallery: category filter + lightbox --------------------- */
(function gallery() {
  const grid = document.querySelector(".grid-gallery");
  if (!grid) return;

  const shots = Array.from(grid.querySelectorAll(".shot"));
  const filters = Array.from(document.querySelectorAll(".filter"));

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      const want = btn.dataset.filter;
      filters.forEach((f) => f.setAttribute("aria-pressed", String(f === btn)));
      shots.forEach((shot) => {
        shot.hidden = want !== "all" && shot.dataset.category !== want;
      });
    });
  });

  /* Lightbox */
  const box = document.querySelector(".lightbox");
  if (!box) return;
  const boxImg = box.querySelector("img");
  const boxCap = box.querySelector("figcaption");
  const closeBtn = box.querySelector(".lightbox__close");
  let lastFocused = null;

  const open = (shot) => {
    const img = shot.querySelector("img");
    lastFocused = shot;
    boxImg.src = img.currentSrc || img.src;
    boxImg.alt = img.alt;
    boxCap.textContent = img.alt;
    box.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  };

  const close = () => {
    box.hidden = true;
    boxImg.removeAttribute("src");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  };

  shots.forEach((shot) => {
    shot.addEventListener("click", () => open(shot));
    shot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(shot);
      }
    });
  });
  closeBtn.addEventListener("click", close);
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !box.hidden) close();
  });
})();

/* --- Contact form -------------------------------------------- */
(function contactForm() {
  const form = document.getElementById("quote-form");
  if (!form) return;

  const status = form.querySelector(".form__status");
  const submit = form.querySelector('button[type="submit"]');

  const say = (message, kind) => {
    status.textContent = message;
    status.className = "form__status form__status--" + kind;
    status.hidden = false;
  };

  const readable = (data) => {
    const services = data.getAll("services");
    const lines = [
      ["Name", [data.get("firstName"), data.get("lastName")].filter(Boolean).join(" ")],
      ["Email", data.get("email")],
      ["Phone", data.get("phone")],
      ["Event type", data.get("eventType")],
      ["Event date", data.get("eventDate")],
      ["Location", data.get("eventLocation")],
      ["Guest count", data.get("guestCount")],
      ["Services", services.join(", ")],
      ["Budget", data.get("budget")],
      ["Vision", data.get("message")],
    ];
    return lines
      .filter(([, v]) => v && String(v).trim())
      .map(([k, v]) => k + ": " + v)
      .join("\n");
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    /* No endpoint configured: hand off to the visitor's mail app. */
    if (!FORM_ENDPOINT) {
      const subject = "Event inquiry — " + (data.get("eventType") || "Celebration");
      const href =
        "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(readable(data));
      window.location.href = href;
      say("Your email app is opening with your details filled in. Press send and we'll be in touch.", "ok");
      return;
    }

    submit.disabled = true;
    const original = submit.textContent;
    submit.textContent = "Sending…";

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      say("Thank you — your inquiry is on its way. We usually reply within two business days.", "ok");
    } catch (err) {
      say("That didn't send. Email us directly at " + CONTACT_EMAIL + " and we'll pick it up from there.", "err");
    } finally {
      submit.disabled = false;
      submit.textContent = original;
    }
  });
})();

/* --- Current year in the footer ------------------------------ */
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

/* =============================================================
   YOUR REVIEWS
   -------------------------------------------------------------
   Add real client reviews between the square brackets below.
   While the list is empty the whole band stays hidden, so the
   site never shows placeholder text.

   Copy this shape for each one, comma between them:

     { text: "They made our day beautiful.", name: "Sarah M.",
       event: "Bridal shower, Ottawa" },

   "event" is optional. Keep quotes short enough to read at a
   glance - roughly 30 words works best. Add as many as you like;
   past eight the dots become a "3 / 12" counter instead.
   ============================================================= */
const REVIEWS = [
];

(function reviewsBand() {
  const band = document.getElementById("reviews");
  if (!band || !REVIEWS.length) return;

  const quote = band.querySelector(".review__text");
  const who = band.querySelector(".review__who");
  const dots = band.querySelector(".review__dots");
  const count = band.querySelector(".review__count");
  const prev = band.querySelector(".review__arrow--prev");
  const next = band.querySelector(".review__arrow--next");
  const many = REVIEWS.length > 1;
  const useDots = many && REVIEWS.length <= 8;
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let i = 0, timer = null;

  const paint = (n) => {
    const r = REVIEWS[n];
    quote.textContent = "\u201C" + r.text + "\u201D";
    who.textContent = [r.name, r.event].filter(Boolean).join(" \u00B7 ");
    if (useDots) dots.querySelectorAll("button").forEach((b, k) =>
      b.setAttribute("aria-selected", String(k === n)));
    if (count && !count.hidden) count.textContent = (n + 1) + " / " + REVIEWS.length;
  };

  const go = (n) => {
    n = (n + REVIEWS.length) % REVIEWS.length;
    if (n === i) return;
    i = n;
    if (still) return paint(i);
    band.classList.add("is-fading");
    setTimeout(() => { paint(i); band.classList.remove("is-fading"); }, 400);
  };

  const start = () => { if (!still && many && !timer) timer = setInterval(() => go(i + 1), 6500); };
  const stop = () => { clearInterval(timer); timer = null; };
  const step = (d) => { stop(); go(i + d); start(); };

  // A single review needs no controls at all
  if (!many) { prev.hidden = true; next.hidden = true; }
  prev.addEventListener("click", () => step(-1));
  next.addEventListener("click", () => step(1));

  if (useDots) {
    REVIEWS.forEach((r, n) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Show review " + (n + 1) + " of " + REVIEWS.length);
      b.addEventListener("click", () => { stop(); go(n); start(); });
      dots.appendChild(b);
    });
  } else if (many && count) {
    count.hidden = false;
  }

  // Arrow keys when the band has focus
  band.addEventListener("keydown", (e) => {
    if (!many) return;
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
  });

  // Swipe on touch screens
  let sx = null, sy = null;
  band.addEventListener("touchstart", (e) => {
    sx = e.touches[0].clientX; sy = e.touches[0].clientY; stop();
  }, { passive: true });
  band.addEventListener("touchend", (e) => {
    if (sx === null) { start(); return; }
    const dx = e.changedTouches[0].clientX - sx;
    const dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(i + (dx < 0 ? 1 : -1));
    sx = sy = null; start();
  }, { passive: true });

  band.addEventListener("mouseenter", stop);
  band.addEventListener("mouseleave", start);
  band.addEventListener("focusin", stop);
  band.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());

  paint(0);
  band.hidden = false;
  start();
})();
