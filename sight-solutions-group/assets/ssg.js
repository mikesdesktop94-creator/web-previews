/* ============================================================
   Sight Solutions Group — shared site chrome + behaviour
   Header, mega menu, footer and the required disclosure band are
   rendered from here so every page stays in sync. Swap for
   server-side includes or components when this is built for real.
   ============================================================ */
(function (window, document) {
  "use strict";

  var PHONE_DISPLAY = "(888) 404-8613";
  var PHONE_HREF    = "tel:18884048613";

  /* ---------------------------------------------------------
     Brand mark — open aperture + detached dot, emerald→teal→blue.
     Sourced from ssg.grippycode.com/logo.svg. Gradient ids are
     suffixed per instance so multiple marks can't collide.
     --------------------------------------------------------- */
  function logoMark(id) {
    return '<span class="brand-mark">' +
      '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" ' +
        'role="img" aria-label="Sight Solutions Group">' +
        "<defs>" +
          '<linearGradient id="ssgStroke' + id + '" x1="26" y1="86" x2="78" y2="24" ' +
            'gradientUnits="userSpaceOnUse">' +
            '<stop stop-color="#1fe39a"/><stop offset="0.55" stop-color="#12c7bd"/>' +
            '<stop offset="1" stop-color="#1aa6ea"/>' +
          "</linearGradient>" +
          '<radialGradient id="ssgDot' + id + '" cx="0.4" cy="0.35" r="0.8">' +
            '<stop stop-color="#41edad"/><stop offset="1" stop-color="#12c58f"/>' +
          "</radialGradient>" +
        "</defs>" +
        '<path d="M62 26 H38 A12 12 0 0 0 26 38 V74 A12 12 0 0 0 38 86 H62 A12 12 0 0 0 74 74 V48" ' +
          'stroke="url(#ssgStroke' + id + ')" stroke-width="9" stroke-linecap="round"/>' +
        '<circle cx="74" cy="26" r="9" fill="url(#ssgDot' + id + ')"/>' +
      "</svg></span>";
  }

  /* small inline icon set for the mega menu */
  var ICON = {
    resolution: '<path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/>',
    business:   '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    consult:    '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    education:  '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
    process:    '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    results:    '<path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    about:      '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    faq:        '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 4.2 2.8c-.8.4-1.3 1-1.3 2"/><line x1="12" y1="17" x2="12" y2="17"/>',
    contact:    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    legal:      '<path d="M12 3v18M5 7h14M7 7l-3 7h6zM17 7l3 7h-6z"/>',
    state:      '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>',
    shield:     '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>'
  };

  function ic(name) {
    return '<span class="ic"><svg viewBox="0 0 24 24">' + ICON[name] + "</svg></span>";
  }
  function megaLink(href, title, desc, icon) {
    return '<a class="mega-link" href="' + href + '">' + ic(icon) +
      '<span><span class="t">' + title + '</span><span class="d">' + desc + "</span></span></a>";
  }

  /* ---------------------------------------------------------
     Navigation model
     --------------------------------------------------------- */
  var MENUS = {
    programs: {
      label: "Programs",
      keys: ["programs", "how"],
      links: [
        ["programs.html#resolution",   "Debt Resolution Program", "Our core program for $7,500+ in unsecured debt", "resolution"],
        ["programs.html#business",     "Business Debt Relief",    "For owners carrying MCAs and unsecured lines",   "business"],
        ["programs.html#consultation", "Hardship Consultation",   "A free, no-pressure review of your options",     "consult"],
        ["programs.html#education",    "Financial Education",     "Budgeting, credit, and rebuilding after",        "education"],
        ["how-it-works.html",          "How It Works",            "The full mechanism, including the risks",        "process"],
        ["results.html",               "Results &amp; Fees",      "What we charge and what our numbers mean",       "results"]
      ],
      foot: ["Not sure which fits?", "A free 15-minute call will tell you.", "get-started.html", "Book a consultation"]
    },
    company: {
      label: "Company",
      keys: ["about", "faq", "contact"],
      links: [
        ["about.html",      "About Us",              "Who we are and how we're compensated",     "about"],
        ["faq.html",        "FAQ",                   "Straight answers to the hard questions",   "faq"],
        ["contact.html",    "Contact",               "Every department and how to reach it",     "contact"],
        ["complaints.html", "Complaints &amp; Licensing", "How to escalate — and over our heads", "shield"]
      ],
      foot: ["Talk to a person", PHONE_DISPLAY + " · 7 days a week", "contact.html", "Contact us"]
    },
    legal: {
      label: "Disclosures",
      keys: [],
      links: [
        ["disclosures.html",       "Program Disclosures",  "Fees, credit impact, taxes, and every risk", "legal"],
        ["state-disclosures.html", "State Disclosures",    "Availability, fee caps, and state notices",  "state"],
        ["privacy.html",           "Privacy Policy",       "GLBA, CCPA, Do Not Call, and SMS terms",     "shield"],
        ["terms.html",             "Terms of Use",         "The rules for using this website",           "legal"],
        ["sms-terms.html",         "SMS Terms",            "Text program: frequency, rates, STOP &amp; HELP", "contact"],
        ["accessibility.html",     "Accessibility",        "Our WCAG commitment and how to report",      "about"]
      ],
      foot: ["Read before you enroll", "The disclosures are the honest part.", "disclosures.html", "Program disclosures"]
    }
  };

  /* flat list, used for the mobile menu */
  var FLAT = [
    { key: "how",      href: "how-it-works.html", label: "How It Works" },
    { key: "programs", href: "programs.html",     label: "Programs" },
    { key: "results",  href: "results.html",      label: "Results & Fees" },
    { key: "about",    href: "about.html",        label: "About Us" },
    { key: "faq",      href: "faq.html",          label: "FAQ" },
    { key: "contact",  href: "contact.html",      label: "Contact" }
  ];

  /* ---------------------------------------------------------
     Header
     --------------------------------------------------------- */
  function megaPanel(m) {
    return '<div class="mega">' +
      '<div class="mega-grid">' +
        m.links.map(function (l) { return megaLink(l[0], l[1], l[2], l[3]); }).join("") +
      "</div>" +
      '<div class="mega-foot"><div><div class="t">' + m.foot[0] + '</div>' +
        '<div class="d">' + m.foot[1] + "</div></div>" +
        '<a class="btn btn-primary btn-sm" href="' + m.foot[2] + '">' + m.foot[3] + "</a></div>" +
    "</div>";
  }

  function navItem(id, m, active) {
    var isActive = m.keys.indexOf(active) > -1;
    return '<div class="nav-item" data-menu="' + id + '">' +
      '<button type="button" aria-expanded="false"' + (isActive ? ' style="color:var(--emerald)"' : "") + ">" +
        m.label + '<span class="caret"></span></button>' +
      megaPanel(m) +
    "</div>";
  }

  function header(active) {
    return [
      '<div class="topbar"><div class="wrap">',
        '<div class="topbar-left">',
          '<span><span class="tb-dot">●</span> Free consultation &mdash; no fees until a debt is settled</span>',
          '<a href="state-disclosures.html">Availability by state</a>',
          '<a href="results.html">Results methodology</a>',
        "</div>",
        '<div><a href="' + PHONE_HREF + '">Client support: ' + PHONE_DISPLAY + "</a></div>",
      "</div></div>",

      '<header class="site-header"><div class="wrap nav">',
        '<a class="brand" href="index.html">',
          logoMark("H"),
          '<span class="brand-text"><span class="n">Sight Solutions Group</span>',
          '<span class="t">Debt Resolution</span></span>',
        "</a>",

        '<nav class="nav-links">',
          navItem("programs", MENUS.programs, active),
          '<div class="nav-item"><a href="results.html"' +
            (active === "results" ? ' class="active"' : "") + ">Results &amp; Fees</a></div>",
          navItem("company", MENUS.company, active),
          navItem("legal", MENUS.legal, active),
        "</nav>",

        '<div class="nav-right">',
          '<a class="nav-phone" href="' + PHONE_HREF + '">',
            '<span class="pic"><svg viewBox="0 0 24 24">' + ICON.contact + "</svg></span>",
            "<span><span class=\"lbl\">Speak with a specialist</span>",
            '<span class="num">' + PHONE_DISPLAY + "</span></span>",
          "</a>",
          '<a href="get-started.html" class="btn btn-primary">Free Consultation</a>',
          '<button class="burger" type="button" aria-expanded="false" aria-controls="ssg-mobile-menu" ',
            'aria-label="Open menu"><span></span><span></span><span></span></button>',
        "</div>",
      "</div>",

      '<div class="mobile-menu" id="ssg-mobile-menu"><div class="wrap">',
        FLAT.map(function (n) {
          return '<a class="m-link' + (n.key === active ? " active" : "") + '" href="' + n.href + '">' +
                 n.label + "</a>";
        }).join(""),
        '<div class="m-legal">',
          '<a href="disclosures.html">Program disclosures</a>',
          '<a href="state-disclosures.html">State disclosures</a>',
          '<a href="privacy.html">Privacy policy</a>',
          '<a href="terms.html">Terms of use</a>',
          '<a href="sms-terms.html">SMS terms</a>',
          '<a href="complaints.html">Complaints &amp; licensing</a>',
        "</div>",
        '<div class="m-cta">',
          '<a href="get-started.html" class="btn btn-primary btn-block">Free consultation</a>',
          '<a href="' + PHONE_HREF + '" class="btn btn-outline btn-block">' + PHONE_DISPLAY + "</a>",
        "</div>",
      "</div></div>",
      "</header>"
    ].join("");
  }

  /* ---------------------------------------------------------
     Required disclosure band + footer
     --------------------------------------------------------- */
  function footer() {
    return [
      '<div class="disclaimer-band"><div class="wrap">',
        "<p><strong>Please read carefully.</strong> Sight Solutions Group is not a lender, a law firm, ",
        "a credit repair organization, a bank, a credit counseling agency, or a debt collector. We do ",
        "not provide legal, tax, accounting, bankruptcy, or credit repair advice, and we do not make ",
        "loans or extend credit. Enrolling in a debt resolution program will likely adversely affect ",
        "your creditworthiness, may result in your being subject to collections or legal action by ",
        "creditors, and may increase the outstanding balances of your enrolled accounts due to the ",
        "accrual of fees and interest. Forgiven debt may be treated as taxable income. Not all clients ",
        "complete their program, and not all enrolled debts are settled. Read our full ",
        '<a href="disclosures.html">Program Disclosures</a> before enrolling.</p>',
      "</div></div>",

      '<footer class="site-footer"><div class="wrap">',
        '<div class="f-grid">',

          '<div class="f-brand">',
            '<a class="brand" href="index.html" style="text-decoration:none">',
              logoMark("F"),
              '<span class="brand-text"><span class="n">Sight Solutions Group</span>',
              '<span class="t">Debt Resolution</span></span>',
            "</a>",
            "<p>A consumer debt resolution firm helping households in financial hardship negotiate ",
            "their unsecured balances and reach a resolution they can actually afford.</p>",
            '<div class="f-contact">',
              "<div><strong>" + PHONE_DISPLAY + "</strong> &middot; Mon&ndash;Fri 7a&ndash;9p CT</div>",
              "<div>clientcare@sightsolutionsgroup.com</div>",
              "<div>2200 Ross Avenue, Suite 1800<br>Dallas, TX 75201</div>",
            "</div>",
            /* PLACEHOLDER BADGES — display only once membership is verified */
            '<div class="f-badges">',
              '<span class="f-badge">AFCC Member</span>',
              '<span class="f-badge">IAPDA Certified</span>',
              '<span class="f-badge">BBB Accredited</span>',
              '<span class="f-badge">Bonded &amp; Insured</span>',
            "</div>",
          "</div>",

          "<div><h4>Programs</h4><ul>",
            '<li><a href="programs.html#resolution">Debt Resolution</a></li>',
            '<li><a href="programs.html#business">Business Debt Relief</a></li>',
            '<li><a href="programs.html#consultation">Hardship Consultation</a></li>',
            '<li><a href="programs.html#education">Financial Education</a></li>',
            '<li><a href="results.html">Results &amp; Fees</a></li>',
          "</ul></div>",

          "<div><h4>Company</h4><ul>",
            '<li><a href="about.html">About us</a></li>',
            '<li><a href="how-it-works.html">How it works</a></li>',
            '<li><a href="faq.html">FAQ</a></li>',
            '<li><a href="contact.html">Contact</a></li>',
            '<li><a href="get-started.html">Free consultation</a></li>',
          "</ul></div>",

          "<div><h4>Legal &amp; Disclosures</h4><ul>",
            '<li><a href="disclosures.html">Program disclosures</a></li>',
            '<li><a href="state-disclosures.html">State disclosures</a></li>',
            '<li><a href="privacy.html">Privacy policy</a></li>',
            '<li><a href="privacy.html#dnc">Do not call policy</a></li>',
            '<li><a href="sms-terms.html">SMS terms &amp; conditions</a></li>',
            '<li><a href="privacy.html#ccpa">Do not sell my info</a></li>',
            '<li><a href="terms.html">Terms of use</a></li>',
            '<li><a href="accessibility.html">Accessibility</a></li>',
            '<li><a href="complaints.html">Complaints &amp; licensing</a></li>',
          "</ul></div>",
        "</div>",

        '<div class="f-legal">',
          "<h5>Required disclosures</h5>",

          "<p><strong>No guarantee of results.</strong> Sight Solutions Group does not guarantee that ",
          "your debts will be lowered by a specific amount or percentage, that any particular creditor ",
          "will negotiate, or that you will be free of debt within a specific period of time. We do not ",
          "assume your debts, make monthly payments to creditors, or provide tax, bankruptcy, ",
          "accounting, legal, or credit repair services. Estimates and calculators shown on this site ",
          "are illustrations based on stated assumptions and are not offers, quotes, or predictions of ",
          "your individual outcome.</p>",

          "<p><strong>Fees and the FTC Telemarketing Sales Rule.</strong> Consultations are free. ",
          "Program fees are earned only on a performance basis and generally range from 15% to 25% of ",
          "enrolled debt, subject to state limits. In accordance with 16 C.F.R. &sect; 310.4(a)(5), no ",
          "fee is collected in connection with any individual debt until (i) we have renegotiated, ",
          "settled, reduced, or otherwise altered the terms of that debt; (ii) you have agreed to the ",
          "resulting settlement agreement; and (iii) you have made at least one payment pursuant to ",
          "that agreement. Funds you deposit are held in an FDIC-insured dedicated account maintained ",
          "in your name at an independent, unaffiliated financial institution. You retain ownership of ",
          "those funds and any accrued interest, may withdraw them at any time, and may terminate your ",
          "program at any time without penalty, subject only to fees already earned on settlements you ",
          "approved.</p>",

          "<p><strong>Program risks.</strong> Debt resolution programs generally require that you ",
          "discontinue payments to enrolled creditors. Doing so will likely have a negative impact on ",
          "your credit score and credit report, and enrolled accounts may be reported as delinquent, ",
          "charged off, or settled for less than the full balance. Interest, late fees, and other ",
          "charges may continue to accrue, increasing the amount you owe. Creditors and debt collectors ",
          "retain the right to contact you and to pursue collection activity, including filing suit, ",
          "at any time. We cannot and do not provide legal representation. Debt that is forgiven or ",
          "cancelled may be reported to the Internal Revenue Service as taxable income on Form 1099-C; ",
          "consult an independent tax professional. Debt resolution is not suitable for every consumer. ",
          "Alternatives include continuing to pay creditors directly, nonprofit credit counseling, debt ",
          "consolidation, negotiating on your own behalf at no cost, and bankruptcy. We encourage you ",
          "to compare these alternatives before enrolling.</p>",

          "<p><strong>Eligibility and availability.</strong> Services and program terms are not ",
          "available in all states and are subject to state licensing, bonding, registration, and fee ",
          "limitations. Certain states restrict or prohibit for-profit debt settlement. See our ",
          '<a href="state-disclosures.html">state disclosures</a> for details. Programs typically ',
          "require a minimum of $7,500 in eligible unsecured debt. Secured debts, federal and most ",
          "private student loans, tax obligations, child support, alimony, court fines, and ",
          "judgment-secured accounts are generally not eligible.</p>",

          "<p><strong>Communications.</strong> By providing your telephone number and submitting a form ",
          "on this website, you consent to receive calls and SMS text messages from Sight Solutions ",
          "Group and its service providers at that number, including through an automatic telephone ",
          "dialing system and using artificial or prerecorded voice, even if that number is registered ",
          "on a federal, state, or corporate Do Not Call list. Consent is not a condition of purchasing ",
          "any goods or services. Message and data rates may apply; message frequency varies. Reply ",
          'STOP to opt out, HELP for help. See our <a href="privacy.html">Privacy Policy</a> and ',
          '<a href="privacy.html#dnc">Do Not Call Policy</a>.</p>',

          "<p><strong>Testimonials and figures.</strong> Client statements describe individual ",
          "experiences and are not representative of all clients or a guarantee of future results. ",
          "Aggregate figures reflect historical company performance over the stated period and are ",
          'defined in our <a href="results.html">results methodology</a>. Accreditation and membership ',
          "marks are displayed only where current membership is held.</p>",

        "</div>",

        '<div class="f-bottom">',
          "<div>&copy; 2026 Sight Solutions Group, LLC. All rights reserved.</div>",
          "<nav>",
            '<a href="privacy.html">Privacy</a>',
            '<a href="terms.html">Terms</a>',
            '<a href="disclosures.html">Disclosures</a>',
            '<a href="state-disclosures.html">State notices</a>',
            '<a href="accessibility.html">Accessibility</a>',
          "</nav>",
        "</div>",
      "</div></footer>"
    ].join("");
  }

  /* ---------------------------------------------------------
     Behaviour
     --------------------------------------------------------- */
  function wireMegaMenu() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".nav-item[data-menu]"));
    if (!items.length) return;
    var closeTimer;

    function closeAll(except) {
      items.forEach(function (it) {
        if (it === except) return;
        it.classList.remove("open");
        var b = it.querySelector("button");
        if (b) b.setAttribute("aria-expanded", "false");
      });
    }
    function open(it, isOpen) {
      it.classList.toggle("open", isOpen);
      it.querySelector("button").setAttribute("aria-expanded", String(isOpen));
    }

    items.forEach(function (it) {
      var btn = it.querySelector("button");

      /* hover on pointer devices, with a small close delay so the
         cursor can travel from the trigger down into the panel */
      it.addEventListener("mouseenter", function () {
        if (!window.matchMedia("(hover: hover)").matches) return;
        window.clearTimeout(closeTimer);
        closeAll(it); open(it, true);
      });
      it.addEventListener("mouseleave", function () {
        if (!window.matchMedia("(hover: hover)").matches) return;
        closeTimer = window.setTimeout(function () { open(it, false); }, 180);
      });

      /* click/keyboard always works, including on touch */
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var willOpen = !it.classList.contains("open");
        closeAll(it); open(it, willOpen);
      });
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".nav-item[data-menu]")) closeAll(null);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAll(null);
    });
  }

  function wireMobileMenu() {
    var burger = document.querySelector(".burger");
    var menu   = document.getElementById("ssg-mobile-menu");
    if (!burger || !menu) return;

    function setOpen(open) {
      menu.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    burger.addEventListener("click", function () {
      setOpen(burger.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) setOpen(false);
    });
  }

  function wireConsultForms() {
    Array.prototype.forEach.call(document.querySelectorAll("form[data-consult]"), function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var box = form.querySelector('input[type="checkbox"][data-required]');
        if (box && !box.checked) {
          window.alert("Please review and accept the consent language before submitting.");
          return;
        }
        form.innerHTML =
          '<div style="text-align:center;padding:26px 8px">' +
            '<div style="width:58px;height:58px;border-radius:50%;background:var(--grad-soft);' +
            'border:1px solid rgba(31,227,154,.26);display:grid;place-items:center;margin:0 auto 16px">' +
              '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#1FE39A" ' +
              'stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>' +
            '<h3 style="font-size:22px;margin-bottom:8px">Request received</h3>' +
            '<p style="font-size:15px">A certified debt specialist will contact you within one ' +
            "business day. Nothing is binding until you review and sign a written agreement.</p>" +
            '<p class="tiny" style="margin-top:14px"><em>Demo only &mdash; this mockup does not ' +
            "submit or store any information.</em></p>" +
          "</div>";
      });
    });
  }

  function wireDocNav() {
    var nav = document.querySelector(".doc-nav");
    if (!nav) return;
    var links    = Array.prototype.slice.call(nav.querySelectorAll("a[href^='#']"));
    var sections = links
      .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
      .filter(Boolean);
    if (!sections.length) return;

    /* offsetTop is measured against the nearest positioned ancestor (.wrap is
       position:relative), while scrollY is document-relative — mixing the two
       skews the comparison. Measure from the viewport instead. */
    function sync() {
      var current = sections[0];
      sections.forEach(function (s) {
        if (s.getBoundingClientRect().top <= 150) current = s;
      });
      links.forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("href") === "#" + current.id);
      });
    }
    /* html has scroll-behavior:smooth, so the final scroll event can fire
       before the animation settles — leaving the highlight one section off.
       Re-sync once the scrolling actually stops. */
    var settle;
    function onScroll() {
      sync();
      clearTimeout(settle);
      settle = setTimeout(sync, 140);
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    /* Section positions move when the webfont swaps in or the window resizes.
       Without these the highlight stays stuck on whatever the pre-reflow
       geometry said, which reads as an off-by-one. */
    window.addEventListener("resize", sync);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(sync);

    sync();
  }

  /* Fade sections in as they enter the viewport. Anything above the
     fold, or any browser without IntersectionObserver, shows at once. */
  function wireReveal() {
    var targets = document.querySelectorAll(".sec-head, .card, .p-step, .st, .stat, .table-scroll, .callout, .quote, .pullquote");
    if (!("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

    /* Wait for layout before measuring — at mount time the document has
       not been laid out yet and every element reports top: 0, which
       would skip the whole page as "already visible". */
    requestAnimationFrame(function () {
      var armed = [];
      Array.prototype.forEach.call(targets, function (el, i) {
        if (el.getBoundingClientRect().top < window.innerHeight) return;
        el.setAttribute("data-reveal", "");
        el.style.transitionDelay = (i % 4) * 60 + "ms";
        io.observe(el);
        armed.push(el);
      });

      /* Failsafe: content must never be permanently invisible. If the
         observer never fires — headless renderers, odd embeddings,
         script errors — show everything anyway. A missed animation is
         fine; missing copy is not. */
      setTimeout(function () {
        armed.forEach(function (el) { el.classList.add("in"); });
        io.disconnect();
      }, 2500);
    });
  }

  function stampDates() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-effective]"), function (el) {
      el.textContent = el.getAttribute("data-effective");
    });
  }

  /* ---------------------------------------------------------
     Mount
     --------------------------------------------------------- */
  function mount(activeKey) {
    var h = document.getElementById("ssg-header");
    var f = document.getElementById("ssg-footer");
    if (h) h.innerHTML = header(activeKey);
    if (f) f.innerHTML = footer();
    wireMegaMenu();
    wireMobileMenu();
    wireConsultForms();
    wireDocNav();
    wireReveal();
    stampDates();
  }

  window.SSG = { mount: mount, phone: PHONE_DISPLAY, phoneHref: PHONE_HREF };
})(window, document);
