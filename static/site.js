(function () {
  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  }

  function normalizeText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function createMobileLink(link) {
    var item = link.cloneNode(true);
    item.className =
      "block rounded-lg px-3 py-3 text-sm font-medium text-[#1A4D3E] hover:bg-[#1A4D3E]/5 hover:text-[#D4A574] transition-colors duration-300";
    return item;
  }

  function initMobileMenu() {
    var header = document.querySelector("header");
    var nav = header && header.querySelector("nav");
    var navRow = nav && nav.querySelector("div");
    var menuButton;
    var desktopNav;
    var desktopActions;
    var mobilePanel;

    if (!navRow) {
      return;
    }

    menuButton = Array.prototype.find.call(navRow.children, function (child) {
      return child.tagName === "BUTTON";
    });

    desktopNav = Array.prototype.find.call(navRow.children, function (child) {
      return child.tagName === "DIV" && child.className.indexOf("items-center gap-8") !== -1;
    });

    desktopActions = Array.prototype.find.call(navRow.children, function (child) {
      return child.tagName === "DIV" && child.className.indexOf("gap-3") !== -1;
    });

    if (!menuButton || !desktopNav || menuButton.dataset.siteMenuBound === "true") {
      return;
    }

    menuButton.dataset.siteMenuBound = "true";
    menuButton.type = "button";
    menuButton.setAttribute("aria-label", "Toggle navigation menu");
    menuButton.setAttribute("aria-expanded", "false");

    mobilePanel = document.createElement("div");
    mobilePanel.className = "hidden md:hidden max-w-7xl mx-auto border-t border-gray-200 bg-white px-4 pb-4";
    mobilePanel.setAttribute("data-site-mobile-panel", "true");

    Array.prototype.forEach.call(desktopNav.children, function (child) {
      var label;

      if (child.tagName === "A") {
        mobilePanel.appendChild(createMobileLink(child));
        return;
      }

      if (child.tagName !== "DIV") {
        return;
      }

      label = normalizeText(child.querySelector("button") && child.querySelector("button").textContent).replace(
        /\s*▼$/,
        ""
      );

      var dropdownLinks = [];
      Array.prototype.forEach.call(child.querySelectorAll("a"), function (link) {
        dropdownLinks.push(createMobileLink(link));
      });

      if (label) {
        var toggleRow = document.createElement("button");
        toggleRow.type = "button";
        toggleRow.className = "w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-[#1A4D3E] hover:bg-[#1A4D3E]/5 transition-colors duration-300";
        toggleRow.setAttribute("aria-expanded", "false");

        var labelText = document.createElement("span");
        labelText.className = "text-sm font-sans tracking-wide font-medium";
        labelText.textContent = label;

        var chevron = document.createElement("span");
        chevron.className = "text-xs transition-transform duration-300";
        chevron.textContent = "\u25BC";

        toggleRow.appendChild(labelText);
        toggleRow.appendChild(chevron);
        mobilePanel.appendChild(toggleRow);

        var dropdownContainer = document.createElement("div");
        dropdownContainer.className = "hidden pl-4";

        dropdownLinks.forEach(function (link) {
          dropdownContainer.appendChild(link);
        });

        mobilePanel.appendChild(dropdownContainer);

        toggleRow.addEventListener("click", function () {
          var isOpen = !dropdownContainer.classList.contains("hidden");
          dropdownContainer.classList.toggle("hidden");
          chevron.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
          toggleRow.setAttribute("aria-expanded", !isOpen ? "true" : "false");
        });
      } else {
        dropdownLinks.forEach(function (link) {
          mobilePanel.appendChild(link);
        });
      }
    });

    if (desktopActions) {
      Array.prototype.forEach.call(desktopActions.querySelectorAll("a"), function (link) {
        var action = link.cloneNode(true);
        var button = action.querySelector("button");

        action.className = "block mt-3";

        if (button) {
          button.type = "button";
          button.className =
            "w-full border-2 border-[#1A4D3E] text-[#1A4D3E] px-6 py-3 rounded-lg text-sm font-sans font-medium tracking-wide hover:bg-[#1A4D3E] hover:text-white transition-colors duration-300 cursor-pointer";
        }

        mobilePanel.appendChild(action);
      });
    }

    nav.appendChild(mobilePanel);

    function setOpenState(isOpen) {
      mobilePanel.classList.toggle("hidden", !isOpen);
      menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }

    menuButton.addEventListener("click", function () {
      setOpenState(mobilePanel.classList.contains("hidden"));
    });

    mobilePanel.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setOpenState(false);
      }
    });

    document.addEventListener("click", function (event) {
      if (mobilePanel.classList.contains("hidden")) {
        return;
      }

      if (nav.contains(event.target)) {
        return;
      }

      setOpenState(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) {
        setOpenState(false);
      }
    });
  }

  function initSmoothScroll() {
    var header = document.querySelector("header");

    Array.prototype.forEach.call(document.querySelectorAll('a[href^="#"]'), function (anchor) {
      var href = anchor.getAttribute("href") || "";

      if (href === "#") {
        return;
      }

      anchor.addEventListener("click", function (event) {
        var targetId = href.slice(1);
        var target = targetId ? document.getElementById(targetId) : null;
        var headerOffset;
        var targetTop;

        if (!target) {
          return;
        }

        event.preventDefault();
        headerOffset = header ? header.offsetHeight : 0;
        targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset - 16;

        window.scrollTo({
          top: Math.max(targetTop, 0),
          behavior: "smooth"
        });
      });
    });
  }

  function initPlaceholderLinks() {
    Array.prototype.forEach.call(document.querySelectorAll('a[href="#"]'), function (link) {
      link.dataset.placeholderLink = "true";
      link.setAttribute("aria-disabled", "true");
      link.setAttribute("title", "Link coming soon");
      link.addEventListener("click", function (event) {
        event.preventDefault();
      });
    });
  }

  function initStaticForms() {
    Array.prototype.forEach.call(document.querySelectorAll("form"), function (form) {
      var submitButton;
      var status;

      if (form.dataset.staticFormBound === "true") {
        return;
      }

      submitButton = form.querySelector('button[type="submit"], button:not([type]), input[type="submit"]');
      if (!submitButton || form.getAttribute("action")) {
        return;
      }

      form.dataset.staticFormBound = "true";
      status = document.createElement("div");
      status.className =
        "hidden mt-4 rounded-lg border border-[#1A4D3E]/15 bg-[#1A4D3E]/5 px-4 py-3 text-sm leading-relaxed text-[#1A4D3E]";
      status.setAttribute("data-form-status", "true");

      if (submitButton.parentElement) {
        submitButton.parentElement.insertAdjacentElement("afterend", status);
      } else {
        form.appendChild(status);
      }

      form.addEventListener("submit", function (event) {
        var subject;
        var lines = [];
        var pageName = window.location.pathname.indexOf("/registration/") !== -1 ? "Registration" : "Contact";
        var mailtoLink;

        if (!form.reportValidity()) {
          return;
        }

        event.preventDefault();

        Array.prototype.forEach.call(form.elements, function (field) {
          var label;
          var value;

          if (!field || field.disabled || !("value" in field)) {
            return;
          }

          if (field.type === "submit" || field.type === "button" || field.type === "fieldset") {
            return;
          }

          if ((field.type === "checkbox" || field.type === "radio") && !field.checked) {
            return;
          }

          value = normalizeText(field.value);
          if (!value) {
            return;
          }

          label =
            normalizeText(
              field.closest("div") &&
                field.closest("div").querySelector("label") &&
                field.closest("div").querySelector("label").textContent
            ) ||
            normalizeText(field.getAttribute("aria-label")) ||
            normalizeText(field.placeholder) ||
            normalizeText(field.name) ||
            normalizeText(field.id) ||
            "Field";

          lines.push(label.replace(/\*+$/, "").trim() + ": " + value);
        });

        subject = "SEWA Expo " + pageName + " enquiry";
        mailtoLink =
          "mailto:sewaexpo50plus@gmail.com?subject=" +
          encodeURIComponent(subject) +
          "&body=" +
          encodeURIComponent(lines.join("\n"));

        status.classList.remove("hidden");
        status.innerHTML =
          "<strong>Details captured.</strong> This static build is ready for deployment, but the form is not connected to a backend yet. " +
          'You can use <a class="font-semibold underline underline-offset-4" href="' +
          mailtoLink +
          '">this email draft</a> or wire the form to your server/API later.';

        form.reset();
      });
    });
  }

  ready(function () {
    initMobileMenu();
    initSmoothScroll();
    initPlaceholderLinks();
    initStaticForms();
  });
})();
