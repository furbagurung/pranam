function initNavigation() {
  var currentPage = window.location.pathname.split("/").pop() || "index.html";

  // Active navigation highlighting based on the current page filename.
  $(".nav-links a").each(function () {
    var $link = $(this);
    var linkPage = $link.data("page");

    if (linkPage === currentPage) {
      $link.addClass("is-active").attr("aria-current", "page");
    }
  });
}

// Delegated mobile navigation toggle for dynamically loaded header markup.
$(document).on("click", ".nav-toggle", function () {
  var $toggle = $(this);
  var $links = $("#" + $toggle.attr("aria-controls"));
  var isOpen = !$links.hasClass("is-open");

  $links.toggleClass("is-open", isOpen);
  $toggle.toggleClass("is-open", isOpen).attr("aria-expanded", String(isOpen));
});

// Close the mobile menu after selecting a navigation link.
$(document).on("click", ".nav-links a", function () {
  $(".nav-links").removeClass("is-open");
  $(".nav-toggle").removeClass("is-open").attr("aria-expanded", "false");
});
