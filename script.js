/* Avril Solutions — site interactions */
(function () {
  "use strict";

  /* ---- mobile nav toggle ---- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("in");
    });
  }

  /* ---- lead form: front-end success state ----
     NOTE: this is a static demo handler. To capture real leads,
     point the form's action at a service (Formspree, your CRM/webhook)
     or wire it to email/SMS. See the notes shared with this build. */
  document.querySelectorAll("form[data-lead]").forEach(function (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var success = form.parentNode.querySelector(".form-success");
      if (success) {
        var name = (form.querySelector('[name="name"]') || {}).value || "";
        success.querySelector("[data-name]") &&
          (success.querySelector("[data-name]").textContent = name
            ? name.split(" ")[0]
            : "there");
        success.classList.add("show");
        form.classList.add("hide");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
    });
  });

  /* ---- floating "talk to a real person" widget ---- */
  var talkToggle = document.getElementById("talkToggle");
  var talkPanel = document.getElementById("talkPanel");
  var talkClose = document.getElementById("talkClose");
  if (talkToggle && talkPanel) {
    var setTalk = function (open) {
      talkPanel.hidden = !open;
      talkToggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    talkToggle.addEventListener("click", function (ev) {
      ev.stopPropagation();
      setTalk(talkPanel.hidden);
    });
    if (talkClose) {
      talkClose.addEventListener("click", function () {
        setTalk(false);
      });
    }
    document.addEventListener("click", function (ev) {
      if (!talkPanel.hidden && !ev.target.closest(".talk-fab")) {
        setTalk(false);
      }
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && !talkPanel.hidden) {
        setTalk(false);
      }
    });
  }
})();
