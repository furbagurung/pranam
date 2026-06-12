$(document).ready(function () {
  // Load shared page sections before initializing navigation state.
  $("#header").load("partials/header.html", function () {
    initNavigation();
  });

  $("#footer").load("partials/footer.html");

  // Smooth scrolling for valid same-page anchor links.
  $(document).on("click", 'a[href^="#"]', function (event) {
    var targetSelector = $(this).attr("href");
    var $target = $(targetSelector);

    if (!$target.length) {
      return;
    }

    event.preventDefault();

    $("html, body").animate({
      scrollTop: $target.offset().top
    }, 600);
  });

  initProductFilters();
});
