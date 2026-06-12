function initProductFilters() {
  var $filterButtons = $(".filter-button");
  var $products = $("#product-list .product-card");

  if (!$filterButtons.length || !$products.length) {
    return;
  }

  $filterButtons.on("click", function () {
    var $button = $(this);
    var selectedCategory = $button.data("filter");

    $filterButtons.removeClass("is-active").attr("aria-pressed", "false");
    $button.addClass("is-active").attr("aria-pressed", "true");

    $products.each(function () {
      var $product = $(this);
      var productCategory = $product.data("category");
      var shouldShow = selectedCategory === "all" || productCategory === selectedCategory;

      $product.toggleClass("is-hidden", !shouldShow);
    });
  });

  $filterButtons.filter('[data-filter="all"]').attr("aria-pressed", "true");
}
