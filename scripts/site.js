// IgniteDrive Labs — shared vanilla JS (no build step, no framework)

(function () {
  "use strict";

  // Footer copyright year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Mobile nav toggle
  var navOpenBtn = document.querySelector("[data-nav-open]");
  var navCloseBtn = document.querySelector("[data-nav-close]");
  var navPanel = document.querySelector("[data-nav-panel]");
  if (navOpenBtn && navPanel) {
    var closeNav = function () {
      navPanel.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      navOpenBtn.setAttribute("aria-expanded", "false");
    };
    var openNav = function () {
      navPanel.classList.add("is-open");
      document.body.classList.add("nav-open");
      navOpenBtn.setAttribute("aria-expanded", "true");
      var firstLink = navPanel.querySelector("a");
      if (firstLink) firstLink.focus();
    };
    navOpenBtn.addEventListener("click", openNav);
    if (navCloseBtn) navCloseBtn.addEventListener("click", closeNav);
    navPanel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  // Contact form
  var form = document.querySelector("[data-contact-form]");
  if (!form) return;

  var submitBtn = form.querySelector("[data-submit-btn]");
  var errorBox = form.querySelector("[data-form-error]");
  var formPanel = document.querySelector("[data-form-panel]");
  var confirmPanel = document.querySelector("[data-form-confirm]");
  var confirmName = document.querySelector("[data-confirm-name]");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var data = {
      name: form.name.value.trim(),
      company: form.company.value.trim(),
      email: form.email.value.trim(),
      interest: form.interest.value,
      message: form.message.value.trim(),
      _subject: "New IgniteDrive Labs inquiry"
    };

    if (!data.name || !data.email || !data.message) {
      showError("Please fill in your name, email, and message.");
      return;
    }

    hideError();
    submitBtn.disabled = true;
    var originalLabel = submitBtn.textContent;
    submitBtn.textContent = "Sending…";

    fetch("https://formspree.io/f/mdarkrop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(function (res) {
        if (res.ok) {
          var firstName = data.name.split(" ")[0];
          confirmName.textContent = firstName;
          formPanel.style.display = "none";
          confirmPanel.style.display = "block";
        } else {
          return res.json().then(function (body) {
            var msg = (body && body.errors && body.errors[0] && body.errors[0].message) ||
              "Something went wrong. Please try again in a moment.";
            throw new Error(msg);
          });
        }
      })
      .catch(function (err) {
        showError(err.message || "Something went wrong. Please try again in a moment.");
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      });
  });

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.style.display = "block";
  }
  function hideError() {
    errorBox.style.display = "none";
    errorBox.textContent = "";
  }
})();
