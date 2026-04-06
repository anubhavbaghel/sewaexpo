(function () {
  var scriptEl = document.currentScript;
  var basePath = scriptEl ? scriptEl.src.substring(0, scriptEl.src.indexOf("static/")) : "";

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
        var pageName = window.location.pathname.indexOf("/registration/") !== -1 ? "Registration" : "Contact";
        var formData = new FormData(form);
        var originalText = submitButton.textContent;

        if (!form.reportValidity()) {
          return;
        }

        event.preventDefault();

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        status.classList.add("hidden");

        var subjectValue = formData.get("subject");
        if (!subjectValue || subjectValue === "" || subjectValue === "Select Subject") {
          subjectValue = "SEWA Expo " + pageName + " Enquiry";
        }

        formData.set("subject", subjectValue);

        fetch(basePath + "send-mail.php", {
          method: "POST",
          body: formData
        })
          .then(function (response) {
            if (!response.ok) {
              return response.text().then(function (text) {
                var msg = "Server error (HTTP " + response.status + ")";
                try {
                  var data = JSON.parse(text);
                  msg = data.message || msg;
                } catch (e) {
                  if (text && text.length < 200) msg = text;
                }
                throw new Error(msg);
              });
            }
            return response.json();
          })
          .then(function (data) {
            status.classList.remove("hidden");
            if (data.success) {
              status.className = "mt-6 p-6 rounded-xl border-2 border-green-200 bg-green-50 text-center";
              status.innerHTML = "<div class='flex flex-col items-center gap-3'><svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='#16a34a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'></path><polyline points='22 4 12 14.01 9 11.01'></polyline></svg><p class='text-lg font-bold text-green-800'>Thank You!</p><p class='text-sm text-green-700'>" + data.message + "</p><p class='text-xs text-green-600 mt-1'>We will get back to you shortly.</p></div>";
              form.reset();
            } else {
              status.className = "mt-6 p-6 rounded-xl border-2 border-red-200 bg-red-50 text-center";
              status.innerHTML = "<div class='flex flex-col items-center gap-3'><svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='#dc2626' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'></circle><line x1='15' y1='9' x2='9' y2='15'></line><line x1='9' y1='9' x2='15' y2='15'></line></svg><p class='text-lg font-bold text-red-800'>Oops!</p><p class='text-sm text-red-700'>" + (data.message || "Something went wrong.") + "</p></div>";
            }
          })
          .catch(function (error) {
            status.classList.remove("hidden");
            status.className = "mt-6 p-6 rounded-xl border-2 border-red-200 bg-red-50 text-center";
            var errorMsg = error && error.message ? error.message : "";
            if (errorMsg.indexOf("404") !== -1) {
              status.innerHTML = "<div class='flex flex-col items-center gap-3'><svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='#dc2626' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'></circle><line x1='12' y1='8' x2='12' y2='12'></line><line x1='12' y1='16' x2='12.01' y2='16'></line></svg><p class='text-lg font-bold text-red-800'>Form Not Found</p><p class='text-sm text-red-700'>The server could not find the form handler. Please contact us directly.</p></div>";
            } else if (errorMsg.indexOf("CAPTCHA") !== -1) {
              status.innerHTML = "<div class='flex flex-col items-center gap-3'><svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='#dc2626' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'></circle><line x1='12' y1='8' x2='12' y2='12'></line><line x1='12' y1='16' x2='12.01' y2='16'></line></svg><p class='text-lg font-bold text-red-800'>CAPTCHA Error</p><p class='text-sm text-red-700'>Please complete the verification and try again.</p></div>";
            } else {
              status.innerHTML = "<div class='flex flex-col items-center gap-3'><svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='#dc2626' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'></circle><line x1='12' y1='8' x2='12' y2='12'></line><line x1='12' y1='16' x2='12.01' y2='16'></line></svg><p class='text-lg font-bold text-red-800'>Submission Failed</p><p class='text-sm text-red-700'>" + (errorMsg || "An unexpected error occurred. Please try again or contact us directly.") + "</p></div>";
            }
            console.error("Form submission error:", error);
          })
          .finally(function () {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
          });
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
