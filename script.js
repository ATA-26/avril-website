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

  /* ---- lead forms: submit to Formspree, keep inline success UX ---- */
  document.querySelectorAll("form[data-lead]").forEach(function (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var showSuccess = function () {
        var success = form.parentNode.querySelector(".form-success");
        if (success) {
          var nameField = form.querySelector('[name="name"]');
          var name = (nameField && nameField.value) || "";
          var nameSlot = success.querySelector("[data-name]");
          if (nameSlot) nameSlot.textContent = name ? name.split(" ")[0] : "there";
          success.classList.add("show");
          form.classList.add("hide");
          success.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        form.reset();
      };

      /* No action (e.g. local preview) → fall back to demo success. */
      if (!form.getAttribute("action")) {
        showSuccess();
        return;
      }

      var btn = form.querySelector('[type="submit"]');
      var btnHTML = btn ? btn.innerHTML : "";
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = "Sending…";
      }

      var oldError = form.querySelector(".form-error");
      if (oldError) oldError.remove();

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (res.ok) {
            showSuccess();
          } else {
            throw new Error("submit failed");
          }
        })
        .catch(function () {
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = btnHTML;
          }
          var err = document.createElement("p");
          err.className = "form-error";
          err.setAttribute("role", "alert");
          err.innerHTML =
            'Sorry — something went wrong sending your request. Please call us at <a href="tel:+14256759964">(425) 675-9964</a>.';
          if (btn && btn.parentNode) {
            btn.parentNode.insertBefore(err, btn.nextSibling);
          } else {
            form.appendChild(err);
          }
        });
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
