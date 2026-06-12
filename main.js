(function () {
  const THEME_KEY = "personalSiteNightTheme";
  const nightBtn = document.querySelector("#theme-night-toggle");

  function applyNightTheme(on) {
    document.body.classList.toggle("theme-nyan", on);
    if (nightBtn) {
      nightBtn.setAttribute("aria-pressed", on ? "true" : "false");
      nightBtn.setAttribute(
        "aria-label",
        on ? "Switch to default day theme" : "Switch to balloon night theme"
      );
    }
    try {
      if (on) localStorage.setItem(THEME_KEY, "nyan");
      else localStorage.removeItem(THEME_KEY);
    } catch (_) {}
  }

  if (nightBtn) {
    try {
      if (localStorage.getItem(THEME_KEY) === "nyan") applyNightTheme(true);
    } catch (_) {}
    nightBtn.addEventListener("click", function () {
      applyNightTheme(!document.body.classList.contains("theme-nyan"));
    });
  }

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    nav.querySelectorAll("button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function showEmailCopyToast(message) {
    var prev = document.querySelector(".email-copy-toast");
    if (prev) prev.remove();
    var toast = document.createElement("div");
    toast.className = "email-copy-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(function () {
      toast.classList.add("email-copy-toast--visible");
    });
    window.setTimeout(function () {
      toast.classList.remove("email-copy-toast--visible");
      window.setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 250);
    }, 2400);
  }

  document.querySelectorAll("[data-copy-email]").forEach(function (btn) {
    var defaultLabel = btn.getAttribute("aria-label") || "Copy email address";
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy-email") || "";
      function setLabel(msg) {
        btn.setAttribute("aria-label", msg);
        window.setTimeout(function () {
          btn.setAttribute("aria-label", defaultLabel);
        }, 2500);
      }
      function onSuccess() {
        setLabel("Email address copied to clipboard");
        showEmailCopyToast("Email address copied");
      }
      function onFail() {
        setLabel("Could not copy email");
        showEmailCopyToast("Could not copy — try again");
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () {
            onSuccess();
          },
          function () {
            onFail();
          }
        );
      } else {
        try {
          var ta = document.createElement("textarea");
          ta.value = text;
          ta.setAttribute("readonly", "");
          ta.style.position = "fixed";
          ta.style.left = "-9999px";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
          onSuccess();
        } catch (e) {
          onFail();
        }
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();
