$(function () {
  let cartCount = 0;

  $('.nav-toggle').on('click', function () {
    $('.site-header').toggleClass('menu-open');
  });

  $('.wish').on('click', function () {
    $(this).toggleClass('active');
    $(this).text($(this).hasClass('active') ? '♥' : '♡');
  });

  $('.add-cart').on('click', function () {
    cartCount += 1;
    $('.cart-btn span').text(cartCount);

    const productName = $(this).closest('.product-card').data('name');
    $(this).text('Added');

    setTimeout(() => {
      $(this).text('Add');
    }, 1100);

    console.log(productName + ' added to cart');
  });

  $('.nav-links a, .category-scroll a').on('click', function () {
    $('.site-header').removeClass('menu-open');
  });
});
