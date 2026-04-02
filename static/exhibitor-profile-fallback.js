(function () {
  var exhibitorData = {
    "Wellness Plus": {
      category: "Health & Wellness",
      booth: "A1",
      description:
        "Comprehensive health solutions for active seniors including fitness programs, health monitoring, and wellness coaching.",
      contact: "contact@wellnessplus.com",
      phone: "+91 98765 43210"
    },
    "Tech4Silver": {
      category: "Technology & Smart Solutions",
      booth: "B2",
      description:
        "Smart home technology designed for seniors with voice control, safety features, and easy-to-use interfaces.",
      contact: "info@tech4silver.com",
      phone: "+91 98765 43211"
    },
    "Golden Years Communities": {
      category: "Community Living & Real Estate",
      booth: "C3",
      description:
        "Premium senior living communities with modern amenities, healthcare facilities, and vibrant social life.",
      contact: "hello@goldenyears.com",
      phone: "+91 98765 43212"
    },
    "FinSecure Services": {
      category: "Finance & Legal",
      booth: "D4",
      description:
        "Financial planning and legal services specializing in retirement planning, estate management, and tax optimization.",
      contact: "support@finsecure.com",
      phone: "+91 98765 43213"
    },
    "Nutrition Hub": {
      category: "Food & Nutrition",
      booth: "E5",
      description:
        "Specialized nutrition programs tailored for seniors with dietary consultations and meal planning services.",
      contact: "care@nutritionhub.com",
      phone: "+91 98765 43214"
    },
    "Adventure Awaits": {
      category: "Lifestyle, Leisure & Travel",
      booth: "F6",
      description:
        "Curated travel experiences for seenagers with senior-friendly itineraries and comfortable accommodations.",
      contact: "travel@adventureawaits.com",
      phone: "+91 98765 43215"
    },
    "SilverCare Medical": {
      category: "Health & Wellness",
      booth: "A2",
      description:
        "Specialized medical care and home healthcare services for seniors with 24/7 support.",
      contact: "care@silvercare.com",
      phone: "+91 98765 43216"
    },
    "SmartSenior Tech": {
      category: "Technology & Smart Solutions",
      booth: "B3",
      description:
        "Wearable health devices and emergency response systems designed for senior safety.",
      contact: "info@smartsenior.com",
      phone: "+91 98765 43217"
    }
  };

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

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function websiteFromName(name) {
    return "https://www." + name.toLowerCase().replace(/\s+/g, "") + ".com";
  }

  function cardDataFromButton(button) {
    var card = button.closest(".group") || button.parentElement;
    var title;
    var name;
    var known;
    var descriptionNode;
    var mailLink;
    var phoneLink;

    if (!card) {
      return null;
    }

    title = card.querySelector("h3");
    if (!title) {
      return null;
    }

    name = normalizeText(title.textContent);
    known = exhibitorData[name] || {};
    descriptionNode = Array.prototype.find.call(card.querySelectorAll("p"), function (node) {
      var text = normalizeText(node.textContent);
      return (
        text &&
        text.indexOf("Booth") === -1 &&
        text.indexOf("@") === -1 &&
        text.indexOf("+91") === -1 &&
        text.indexOf("FEATURED") === -1 &&
        text.indexOf("Call") === -1
      );
    });
    mailLink = card.querySelector('a[href^="mailto:"]');
    phoneLink = card.querySelector('a[href^="tel:"]');

    return {
      name: name,
      category: known.category || "Exhibitor",
      booth: known.booth || "",
      description: known.description || (descriptionNode ? normalizeText(descriptionNode.textContent) : ""),
      contact: known.contact || (mailLink ? mailLink.getAttribute("href").replace(/^mailto:/, "") : ""),
      phone: known.phone || (phoneLink ? phoneLink.getAttribute("href").replace(/^tel:/, "") : "")
    };
  }

  function buildModal(data) {
    var website = websiteFromName(data.name);

    return (
      '<div id="exhibitor-modal-fallback" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] overflow-y-auto">' +
      '  <div class="min-h-full flex items-center justify-center p-4 py-8">' +
      '    <div class="bg-white rounded-2xl max-w-4xl w-full shadow-2xl relative">' +
      '      <div class="sticky top-0 bg-gradient-to-r from-[#1A4D3E] to-[#2C5F52] text-white p-6 flex items-start justify-between z-10">' +
      '        <div class="flex gap-4 items-start flex-1">' +
      '          <div class="w-20 h-20 bg-white rounded-xl flex items-center justify-center text-3xl font-bold text-[#1A4D3E] flex-shrink-0">' +
      escapeHtml(data.name.charAt(0)) +
      "</div>" +
      '          <div class="flex-1">' +
      '            <h2 class="text-2xl md:text-3xl font-bold mb-2">' +
      escapeHtml(data.name) +
      "</h2>" +
      '            <p class="text-white/80 text-sm">Booth ' +
      escapeHtml(data.booth) +
      " | " +
      escapeHtml(data.category) +
      "</p>" +
      "          </div>" +
      "        </div>" +
      '        <button type="button" data-close-exhibitor-modal class="text-white hover:bg-white/20 rounded-full p-2 transition-colors" aria-label="Close exhibitor details">' +
      '          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>' +
      "        </button>" +
      "      </div>" +
      '      <div class="p-6 md:p-8">' +
      '        <div class="mb-8">' +
      '          <div class="grid grid-cols-3 gap-4">' +
      '            <div class="col-span-3 md:col-span-2 h-64 bg-gradient-to-br from-[#1A4D3E]/10 to-[#D4A574]/10 rounded-xl overflow-hidden relative">' +
      '              <img src="../../active-seniors-in-wellness-setting.jpg" alt="Company showcase" class="w-full h-full object-cover" />' +
      '              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>' +
      "            </div>" +
      '            <div class="hidden md:grid grid-rows-2 gap-4">' +
      '              <div class="h-30 bg-gradient-to-br from-[#E67E3B]/10 to-[#D4A574]/10 rounded-xl overflow-hidden"><img src="../../senior-adults-active-lifestyle.jpg" alt="Exhibitor showcase" class="w-full h-full object-cover" /></div>' +
      '              <div class="h-30 bg-gradient-to-br from-[#D4A574]/10 to-[#1A4D3E]/10 rounded-xl overflow-hidden"><img src="../../seniors-doing-yoga-and-activities.jpg" alt="Exhibitor activity" class="w-full h-full object-cover" /></div>' +
      "            </div>" +
      "          </div>" +
      "        </div>" +
      '        <div class="mb-8">' +
      '          <h3 class="text-xl font-bold text-[#1A4D3E] mb-4">About Company</h3>' +
      '          <p class="text-[#1A4D3E]/70 leading-relaxed mb-4">' +
      escapeHtml(data.description) +
      "</p>" +
      '          <p class="text-[#1A4D3E]/70 leading-relaxed">We are committed to providing innovative solutions tailored specifically for the 50+ demographic. Our team focuses on practical, trusted support designed to enrich health, wellness, and active living.</p>' +
      "        </div>" +
      '        <div class="mb-8">' +
      '          <h3 class="text-xl font-bold text-[#1A4D3E] mb-4">Products & Services</h3>' +
      '          <div class="grid md:grid-cols-2 gap-3">' +
      '            <div class="flex items-center gap-2 bg-[#1A4D3E]/5 rounded-lg p-3"><div class="w-2 h-2 bg-[#D4A574] rounded-full"></div><span class="text-[#1A4D3E] font-medium text-sm">Premium Service Package</span></div>' +
      '            <div class="flex items-center gap-2 bg-[#1A4D3E]/5 rounded-lg p-3"><div class="w-2 h-2 bg-[#D4A574] rounded-full"></div><span class="text-[#1A4D3E] font-medium text-sm">Consultation Services</span></div>' +
      '            <div class="flex items-center gap-2 bg-[#1A4D3E]/5 rounded-lg p-3"><div class="w-2 h-2 bg-[#D4A574] rounded-full"></div><span class="text-[#1A4D3E] font-medium text-sm">Custom Solutions</span></div>' +
      '            <div class="flex items-center gap-2 bg-[#1A4D3E]/5 rounded-lg p-3"><div class="w-2 h-2 bg-[#D4A574] rounded-full"></div><span class="text-[#1A4D3E] font-medium text-sm">Support & Maintenance</span></div>' +
      "          </div>" +
      "        </div>" +
      '        <div class="mb-8">' +
      '          <h3 class="text-xl font-bold text-[#1A4D3E] mb-4">Contact Information</h3>' +
      '          <div class="grid md:grid-cols-2 gap-4">' +
      '            <a href="mailto:' +
      escapeHtml(data.contact) +
      '" class="flex items-center gap-3 bg-[#1A4D3E]/5 rounded-lg p-4 hover:bg-[#1A4D3E]/10 transition-colors group">' +
      '              <div class="w-10 h-10 bg-[#1A4D3E] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg></div>' +
      '              <div><p class="text-xs text-[#1A4D3E]/60 font-medium">Email</p><p class="text-[#1A4D3E] font-semibold text-sm">' +
      escapeHtml(data.contact) +
      "</p></div>" +
      "            </a>" +
      '            <a href="tel:' +
      escapeHtml(data.phone) +
      '" class="flex items-center gap-3 bg-[#1A4D3E]/5 rounded-lg p-4 hover:bg-[#1A4D3E]/10 transition-colors group">' +
      '              <div class="w-10 h-10 bg-[#E67E3B] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div>' +
      '              <div><p class="text-xs text-[#1A4D3E]/60 font-medium">Phone</p><p class="text-[#1A4D3E] font-semibold text-sm">' +
      escapeHtml(data.phone) +
      "</p></div>" +
      "            </a>" +
      '            <a href="' +
      escapeHtml(website) +
      '" target="_blank" rel="noreferrer" class="flex items-center gap-3 bg-[#1A4D3E]/5 rounded-lg p-4 hover:bg-[#1A4D3E]/10 transition-colors group">' +
      '              <div class="w-10 h-10 bg-[#D4A574] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg></div>' +
      '              <div><p class="text-xs text-[#1A4D3E]/60 font-medium">Website</p><p class="text-[#1A4D3E] font-semibold text-sm">' +
      escapeHtml(website.replace(/^https?:\/\//, "")) +
      "</p></div>" +
      "            </a>" +
      '            <div class="flex items-center gap-3 bg-[#1A4D3E]/5 rounded-lg p-4">' +
      '              <div class="w-10 h-10 bg-[#2C5F52] rounded-lg flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg></div>' +
      '              <div><p class="text-xs text-[#1A4D3E]/60 font-medium">Booth Location</p><p class="text-[#1A4D3E] font-semibold text-sm">Hall A, Booth ' +
      escapeHtml(data.booth) +
      "</p></div>" +
      "            </div>" +
      "          </div>" +
      "        </div>" +
      '        <div class="bg-gradient-to-r from-[#1A4D3E]/5 to-[#D4A574]/5 rounded-xl p-6 border border-[#1A4D3E]/10">' +
      '          <p class="text-center text-[#1A4D3E]/70 mb-4">Visit us at <span class="font-bold text-[#1A4D3E]">Booth ' +
      escapeHtml(data.booth) +
      "</span> during the expo</p>" +
      '          <div class="flex flex-col sm:flex-row gap-3">' +
      '            <a href="mailto:' +
      escapeHtml(data.contact) +
      '" class="flex-1 bg-[#1A4D3E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#D4A574] transition-colors flex items-center justify-center gap-2 cursor-pointer">Contact Exhibitor</a>' +
      '            <a href="tel:' +
      escapeHtml(data.phone) +
      '" class="flex-1 border-2 border-[#1A4D3E] text-[#1A4D3E] px-6 py-3 rounded-lg font-semibold hover:bg-[#1A4D3E] hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer">Call Now</a>' +
      "          </div>" +
      "        </div>" +
      "      </div>" +
      "    </div>" +
      "  </div>" +
      "</div>"
    );
  }

  ready(function () {
    var observer;
    var cards = [];
    var categoryButtons = [];
    var activeModal = null;
    var lastFocusedButton = null;
    var activeCategory = "All";
    var activeQuery = "";
    var filterPanel = null;
    var filterSummary = null;
    var emptyState = null;
    var totalRegular = 0;
    var searchInput = document.querySelector('input[placeholder*="Search by name"]');
    var controlsRow = searchInput && searchInput.closest(".mb-8");
    var filterButton = null;
    var gridToggleButton = null;
    var listToggleButton = null;
    var featuredTitle = Array.prototype.find.call(document.querySelectorAll("h2"), function (node) {
      return normalizeText(node.textContent) === "Featured Exhibitors";
    });
    var allTitle = Array.prototype.find.call(document.querySelectorAll("h2"), function (node) {
      return normalizeText(node.textContent) === "All Exhibitors";
    });
    var featuredSection = featuredTitle && featuredTitle.closest(".mb-12");
    var allHeadingBlock = allTitle && allTitle.parentElement;
    var allSummary = allHeadingBlock && allHeadingBlock.querySelector("p");
    var regularGrid = allHeadingBlock ? allHeadingBlock.nextElementSibling : null;

    function buttonLabel(button) {
      return normalizeText(button && button.textContent);
    }

    function ensureDirectoryStyles() {
      var style;

      if (document.getElementById("exhibitor-directory-styles")) {
        return;
      }

      style = document.createElement("style");
      style.id = "exhibitor-directory-styles";
      style.textContent =
        "body.exhibitor-list-view [data-exhibitor-grid]{grid-template-columns:minmax(0,1fr)!important;}" +
        "[data-exhibitor-empty-state][hidden]{display:none!important;}";
      document.head.appendChild(style);
    }

    function closeModal() {
      if (!activeModal) {
        return;
      }

      activeModal.remove();
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);

      if (lastFocusedButton) {
        lastFocusedButton.focus();
      }

      activeModal = null;
    }

    function onKeyDown(event) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    function openFromButton(button, event) {
      var data;
      var closeButton;

      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      data = cardDataFromButton(button);
      if (!data) {
        return;
      }

      closeModal();
      lastFocusedButton = button;
      document.body.insertAdjacentHTML("beforeend", buildModal(data));
      activeModal = document.getElementById("exhibitor-modal-fallback");

      if (!activeModal) {
        return;
      }

      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", onKeyDown);

      activeModal.addEventListener("click", function (overlayEvent) {
        if (overlayEvent.target === activeModal) {
          closeModal();
        }
      });

      closeButton = activeModal.querySelector("[data-close-exhibitor-modal]");
      if (closeButton) {
        closeButton.addEventListener("click", closeModal);
        closeButton.focus();
      }
    }

    function bindButtons() {
      Array.prototype.forEach.call(document.querySelectorAll("button"), function (button) {
        var label = buttonLabel(button);

        if (label.indexOf("View Details") === -1 && label.indexOf("Full Profile") === -1) {
          return;
        }

        button.type = "button";

        if (button.dataset.exhibitorFallbackBound === "true") {
          return;
        }

        button.dataset.exhibitorFallbackBound = "true";
        button.addEventListener("click", function (event) {
          openFromButton(button, event);
        });
      });
    }

    function collectCards() {
      var seen = [];

      cards = [];

      Array.prototype.forEach.call(document.querySelectorAll("button"), function (button) {
        var label = buttonLabel(button);
        var card;
        var data;
        var grid;

        if (label.indexOf("View Details") === -1 && label.indexOf("Full Profile") === -1) {
          return;
        }

        card = button.closest(".group");
        if (!card || seen.indexOf(card) !== -1) {
          return;
        }

        data = cardDataFromButton(button);
        if (!data) {
          return;
        }

        grid = card.closest(".grid");
        seen.push(card);

        if (grid) {
          grid.setAttribute("data-exhibitor-grid", "true");
        }

        card.setAttribute("data-exhibitor-card", "true");
        card.dataset.exhibitorSearch = normalizeText(
          [data.name, data.category, data.description, data.booth, data.contact, data.phone].join(" ")
        ).toLowerCase();

        cards.push({
          button: button,
          card: card,
          data: data,
          featured: label.indexOf("Full Profile") !== -1
        });
      });

      totalRegular = cards.filter(function (entry) {
        return !entry.featured;
      }).length;
    }

    function renderViewButtons() {
      var listActive = document.body.classList.contains("exhibitor-list-view");

      if (gridToggleButton) {
        gridToggleButton.classList.toggle("bg-[#1A4D3E]", !listActive);
        gridToggleButton.classList.toggle("text-white", !listActive);
        gridToggleButton.classList.toggle("text-[#1A4D3E]", listActive);
        gridToggleButton.classList.toggle("hover:bg-gray-50", listActive);
      }

      if (listToggleButton) {
        listToggleButton.classList.toggle("bg-[#1A4D3E]", listActive);
        listToggleButton.classList.toggle("text-white", listActive);
        listToggleButton.classList.toggle("text-[#1A4D3E]", !listActive);
        listToggleButton.classList.toggle("hover:bg-gray-50", !listActive);
      }
    }

    function renderDirectory() {
      var visibleTotal = 0;
      var visibleFeatured = 0;
      var visibleRegular = 0;

      cards.forEach(function (entry) {
        var matchesCategory =
          activeCategory === "All" || normalizeText(entry.data.category) === normalizeText(activeCategory);
        var matchesSearch =
          !activeQuery || entry.card.dataset.exhibitorSearch.indexOf(activeQuery) !== -1;
        var visible = matchesCategory && matchesSearch;

        entry.card.hidden = !visible;

        if (!visible) {
          return;
        }

        visibleTotal += 1;
        if (entry.featured) {
          visibleFeatured += 1;
        } else {
          visibleRegular += 1;
        }
      });

      if (featuredSection) {
        featuredSection.hidden = visibleFeatured === 0;
      }

      if (allSummary) {
        allSummary.innerHTML =
          "Showing <strong>" + visibleRegular + "</strong> of <strong>" + totalRegular + "</strong> exhibitors";
      }

      if (filterSummary) {
        if (activeCategory === "All" && !activeQuery) {
          filterSummary.classList.add("hidden");
        } else {
          filterSummary.classList.remove("hidden");
          filterSummary.textContent =
            "Showing " +
            visibleTotal +
            " result" +
            (visibleTotal === 1 ? "" : "s") +
            (activeCategory !== "All" ? " in " + activeCategory : "") +
            (activeQuery ? ' for "' + activeQuery + '"' : "");
        }
      }

      if (emptyState) {
        emptyState.hidden = visibleTotal !== 0;
      }

      categoryButtons.forEach(function (button) {
        var active = button.dataset.categoryValue === activeCategory;
        button.classList.toggle("bg-[#1A4D3E]", active);
        button.classList.toggle("border-[#1A4D3E]", active);
        button.classList.toggle("text-white", active);
      });
    }

    function ensureFilterUi() {
      var categories;

      if (!controlsRow || filterPanel) {
        return;
      }

      filterButton = Array.prototype.find.call(controlsRow.querySelectorAll("button"), function (button) {
        return buttonLabel(button).indexOf("Filters") !== -1;
      });

      gridToggleButton = controlsRow.querySelector("button svg.lucide-grid3x3")
        ? controlsRow.querySelector("button svg.lucide-grid3x3").closest("button")
        : null;
      listToggleButton = controlsRow.querySelector("button svg.lucide-list")
        ? controlsRow.querySelector("button svg.lucide-list").closest("button")
        : null;

      categories = ["All"].concat(
        cards
          .map(function (entry) {
            return entry.data.category;
          })
          .filter(function (value, index, list) {
            return list.indexOf(value) === index;
          })
      );

      filterPanel = document.createElement("div");
      filterPanel.className = "hidden mt-4 flex flex-wrap gap-2";
      filterPanel.setAttribute("data-exhibitor-filter-panel", "true");

      filterSummary = document.createElement("p");
      filterSummary.className = "hidden mt-3 text-sm text-[#1A4D3E]/70";

      categories.forEach(function (category) {
        var chip = document.createElement("button");
        chip.type = "button";
        chip.textContent = category;
        chip.className =
          "rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#1A4D3E] transition-colors hover:border-[#D4A574] hover:text-[#D4A574]";
        chip.dataset.categoryValue = category;
        chip.addEventListener("click", function () {
          activeCategory = category;
          renderDirectory();
        });
        filterPanel.appendChild(chip);
        categoryButtons.push(chip);
      });

      controlsRow.insertAdjacentElement("afterend", filterPanel);
      filterPanel.insertAdjacentElement("afterend", filterSummary);

      if (filterButton) {
        filterButton.type = "button";
        filterButton.addEventListener("click", function () {
          filterPanel.classList.toggle("hidden");
        });
      }

      if (gridToggleButton) {
        gridToggleButton.type = "button";
        gridToggleButton.addEventListener("click", function () {
          document.body.classList.remove("exhibitor-list-view");
          renderViewButtons();
        });
      }

      if (listToggleButton) {
        listToggleButton.type = "button";
        listToggleButton.addEventListener("click", function () {
          document.body.classList.add("exhibitor-list-view");
          renderViewButtons();
        });
      }

      if (searchInput) {
        searchInput.addEventListener("input", function () {
          activeQuery = normalizeText(searchInput.value).toLowerCase();
          renderDirectory();
        });
      }
    }

    function ensureEmptyState() {
      if (emptyState || !allHeadingBlock || !regularGrid) {
        return;
      }

      emptyState = document.createElement("div");
      emptyState.hidden = true;
      emptyState.className =
        "rounded-2xl border border-dashed border-[#1A4D3E]/20 bg-white/80 px-6 py-10 text-center text-[#1A4D3E]";
      emptyState.setAttribute("data-exhibitor-empty-state", "true");
      emptyState.innerHTML =
        '<h3 class="text-xl font-bold mb-2">No exhibitors match your search</h3><p class="text-sm text-[#1A4D3E]/70">Try another keyword or switch back to all categories.</p>';

      allHeadingBlock.parentElement.insertBefore(emptyState, regularGrid);
    }

    if (
      !Array.prototype.some.call(document.querySelectorAll("button"), function (button) {
        var label = buttonLabel(button);
        return label.indexOf("View Details") !== -1 || label.indexOf("Full Profile") !== -1;
      })
    ) {
      return;
    }

    ensureDirectoryStyles();
    bindButtons();
    collectCards();
    ensureFilterUi();
    ensureEmptyState();
    renderViewButtons();
    renderDirectory();

    document.addEventListener(
      "click",
      function (event) {
        var target = event.target;
        var button;
        var label;

        if (!target || typeof target.closest !== "function") {
          return;
        }

        button = target.closest("button");
        if (!button) {
          return;
        }

        label = buttonLabel(button);
        if (label.indexOf("View Details") === -1 && label.indexOf("Full Profile") === -1) {
          return;
        }

        openFromButton(button, event);
      },
      true
    );

    observer = new MutationObserver(function () {
      bindButtons();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
})();
