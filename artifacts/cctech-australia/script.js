(function () {
  "use strict";

  /* ===================== NAV SCROLL ===================== */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 20) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ===================== MOBILE MENU ===================== */
  var burger = document.getElementById("navBurger");
  var mobileMenu = document.getElementById("mobileMenu");
  var mobileClose = document.getElementById("mobileClose");

  function openMenu() {
    mobileMenu.classList.add("open");
    mobileMenu.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  burger.addEventListener("click", openMenu);
  mobileClose.addEventListener("click", closeMenu);
  mobileMenu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });

  /* ===================== REVEAL ON SCROLL ===================== */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in");
    });
  }

  /* ===================== CARECLIQ TABS ===================== */
  var tabBtns = document.querySelectorAll("#csTabs .tab-btn");
  var tabPanels = document.querySelectorAll("#csTabs .tab-panel");
  tabBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = btn.getAttribute("data-tab");
      tabBtns.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle("active", active);
        b.setAttribute("aria-selected", active ? "true" : "false");
      });
      tabPanels.forEach(function (p) {
        var match = p.getAttribute("data-panel") === target;
        p.classList.toggle("active", match);
        if (match) {
          p.hidden = false;
        } else {
          p.hidden = true;
        }
      });
    });
  });

  /* ===================== TAX CALCULATOR ===================== */
  var calcForm = document.getElementById("calcForm");
  if (calcForm) {
    var state = { worktype: null, income: null, lodges: null, gst: null };

    var steps = calcForm.querySelectorAll(".calc-step");
    var cpSteps = document.querySelectorAll(".cp-step");

    function showStep(n) {
      steps.forEach(function (s) {
        var match = Number(s.getAttribute("data-step")) === n;
        s.classList.toggle("active", match);
        s.hidden = !match;
      });
      cpSteps.forEach(function (c) {
        c.classList.toggle("active", Number(c.getAttribute("data-cp")) <= n);
      });
    }

    /* radio steps (1 & 2) */
    calcForm.querySelectorAll('input[type="radio"]').forEach(function (radio) {
      radio.addEventListener("change", function () {
        state[radio.name] = radio.value;
        var stepEl = radio.closest(".calc-step");
        var nextBtn = stepEl.querySelector(".calc-next");
        if (nextBtn) nextBtn.disabled = false;
      });
    });

    /* toggle questions (step 3) */
    document.querySelectorAll(".toggle-group").forEach(function (group) {
      var key = group.getAttribute("data-toggle");
      group.querySelectorAll(".toggle-opt").forEach(function (opt) {
        opt.addEventListener("click", function () {
          group.querySelectorAll(".toggle-opt").forEach(function (o) {
            o.classList.remove("active");
          });
          opt.classList.add("active");
          state[key] = opt.getAttribute("data-val");
          if (state.lodges && state.gst) {
            var nb = document.querySelector('.calc-step[data-step="3"] .calc-next');
            if (nb) nb.disabled = false;
          }
        });
      });
    });

    /* nav buttons */
    calcForm.querySelectorAll(".calc-next").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next = Number(btn.getAttribute("data-next"));
        if (next === 4) {
          renderResults();
        }
        showStep(next);
      });
    });
    calcForm.querySelectorAll(".calc-back").forEach(function (btn) {
      btn.addEventListener("click", function () {
        showStep(Number(btn.getAttribute("data-back")));
      });
    });
    var restart = calcForm.querySelector(".calc-restart");
    if (restart) {
      restart.addEventListener("click", function () {
        state = { worktype: null, income: null, lodges: null, gst: null };
        calcForm.reset();
        calcForm.querySelectorAll(".toggle-opt").forEach(function (o) {
          o.classList.remove("active");
        });
        calcForm.querySelectorAll(".calc-next").forEach(function (b) {
          b.disabled = true;
        });
        showStep(1);
      });
    }

    /* income band midpoints (AUD) for indicative estimate */
    var bandData = {
      band1: { label: "Under $18,200", mid: 12000 },
      band2: { label: "$18,201 – $45,000", mid: 31600 },
      band3: { label: "$45,001 – $75,000", mid: 60000 },
      band4: { label: "$75,001 – $120,000", mid: 97500 },
      band5: { label: "Over $120,000", mid: 150000 }
    };

    /* ATO 2024-25 resident rates (approx) */
    function incomeTax(income) {
      var tax = 0;
      if (income <= 18200) tax = 0;
      else if (income <= 45000) tax = (income - 18200) * 0.16;
      else if (income <= 135000) tax = 4288 + (income - 45000) * 0.30;
      else if (income <= 190000) tax = 31288 + (income - 135000) * 0.37;
      else tax = 51638 + (income - 190000) * 0.45;
      return tax;
    }
    function medicareLevy(income) {
      // simplified: 2% above the lower threshold, phased in
      if (income <= 26000) return 0;
      if (income < 32500) return (income - 26000) * 0.10; // 10% shade-in
      return income * 0.02;
    }

    function fmt(n) {
      return "$" + Math.round(n).toLocaleString("en-AU");
    }

    function renderResults() {
      var box = document.getElementById("calcResults");
      var band = bandData[state.income] || bandData.band1;
      var income = band.mid;

      var tax = incomeTax(income);
      var medicare = medicareLevy(income);
      var totalTax = tax + medicare;

      /* Income tax row */
      var taxNote =
        state.lodges === "no" && totalTax > 0
          ? "You indicated you don't currently lodge a return — this may be accruing as an undeclared liability."
          : "Estimated for the " + band.label + " band, including Medicare Levy.";

      var rows = "";
      rows +=
        '<div class="result-row">' +
        '<span class="result-icon">💰</span>' +
        "<div><strong>Income Tax</strong>" +
        '<p>Likely exposure: <span class="result-val">~' +
        fmt(totalTax) +
        "</span> per year</p>" +
        "<p>" + taxNote + "</p></div></div>";

      /* GST row — only relevant for contractors / businesses, not wage earners */
      var gstRow;
      if (state.worktype === "employee") {
        gstRow =
          '<div class="result-row result-ok">' +
          '<span class="result-icon">🧾</span>' +
          "<div><strong>GST</strong>" +
          "<p>✅ As a wage or salary earner, GST registration generally does not apply to your employment income.</p></div></div>";
      } else if (state.income === "band4" || state.income === "band5") {
        var gstUnregistered = state.gst === "no";
        gstRow =
          '<div class="result-row result-warn">' +
          '<span class="result-icon">🧾</span>' +
          "<div><strong>GST</strong>" +
          "<p>⚠️ You may need to register for GST — your income is above the $75,000 threshold." +
          (gstUnregistered ? " You indicated you are not registered." : "") +
          "</p></div></div>";
      } else if (state.income === "band3") {
        gstRow =
          '<div class="result-row result-warn">' +
          '<span class="result-icon">🧾</span>' +
          "<div><strong>GST</strong>" +
          "<p>⚠️ You are approaching the $75,000 GST registration threshold. Monitor your gross income closely.</p></div></div>";
      } else {
        gstRow =
          '<div class="result-row result-ok">' +
          '<span class="result-icon">🧾</span>' +
          "<div><strong>GST</strong>" +
          "<p>✅ Below the $75,000 threshold — GST registration is not currently required.</p></div></div>";
      }
      rows += gstRow;

      /* Super row */
      var superRow;
      if (state.worktype === "employee") {
        superRow =
          '<div class="result-row result-warn">' +
          '<span class="result-icon">🏦</span>' +
          "<div><strong>Superannuation</strong>" +
          "<p>⚠️ Your employer may owe you super. Employees (and many casuals) are entitled to the Superannuation Guarantee — check your contributions.</p></div></div>";
      } else if (state.worktype === "contractor") {
        superRow =
          '<div class="result-row result-warn">' +
          '<span class="result-icon">🏦</span>' +
          "<div><strong>Superannuation</strong>" +
          "<p>⚠️ Your employer may owe you super. Even with an ABN, if you're paid mainly for your labour you may be deemed an employee for super purposes.</p></div></div>";
      } else {
        superRow =
          '<div class="result-row result-warn">' +
          '<span class="result-icon">🏦</span>' +
          "<div><strong>Superannuation</strong>" +
          "<p>⚠️ As a business hiring workers, you may have a Superannuation Guarantee obligation — including for some ABN contractors paid for their labour.</p></div></div>";
      }
      rows += superRow;

      /* Risk level */
      var risk = 0;
      if (state.lodges === "no") risk += 2;
      if (state.worktype !== "employee" && state.gst === "no" && (state.income === "band4" || state.income === "band5")) risk += 2;
      if (state.worktype === "contractor") risk += 1;
      if (state.worktype === "business") risk += 1;
      if (state.income === "band5") risk += 1;

      var riskClass, riskLabel;
      if (risk >= 4) {
        riskClass = "risk-high";
        riskLabel = "HIGH";
      } else if (risk >= 2) {
        riskClass = "risk-medium";
        riskLabel = "MEDIUM";
      } else {
        riskClass = "risk-low";
        riskLabel = "LOW";
      }
      rows +=
        '<div class="result-row">' +
        '<span class="result-icon">📊</span>' +
        "<div><strong>ATO Risk Level</strong>" +
        "<p>Based on your lodgement, GST, and working arrangement.</p></div>" +
        '<span class="risk-badge ' + riskClass + '">' + riskLabel + "</span></div>";

      box.innerHTML = rows;
    }
  }

  /* ===================== WAITLIST FORM ===================== */
  var waitlistForm = document.getElementById("waitlistForm");
  var formSuccess = document.getElementById("formSuccess");
  if (waitlistForm) {
    waitlistForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!waitlistForm.checkValidity()) {
        waitlistForm.reportValidity();
        return;
      }
      waitlistForm.hidden = true;
      formSuccess.hidden = false;
      formSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
})();
