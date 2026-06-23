'use client';

import Image from 'next/image';
import { useState } from 'react';

const products = [
  {
    name: 'Dates Powder',
    category: 'Natural Sweetener',
    description: 'No added sugar, perfect for daily healthy sweetness.',
    price: 450,
    image: '/images/dates-powder.png',
    imageClass: 'date',
    emoji: '🌴'
  },
  {
    name: 'Pumpkin Powder',
    category: 'Vegetable Powder',
    description: 'Yellow fine powder for soups, porridge and baby food.',
    price: 390,
    image: '/images/pumpkin-powder.png',
    imageClass: 'pumpkin',
    emoji: '🎃'
  },
  {
    name: 'Banana Powder',
    category: 'Fruit Powder',
    description: 'Easy nutrition for shakes, smoothies and breakfast bowls.',
    price: 420,
    image: '/images/banana-powder.png',
    imageClass: 'banana',
    emoji: '🍌'
  },
  {
    name: 'Apple Powder',
    category: 'Fruit Powder',
    description: 'Clean apple flavor for drinks, baking and family recipes.',
    price: 430,
    image: '/images/apple-powder.png',
    imageClass: 'apple',
    emoji: '🍎'
  },
  {
    name: 'ABC Powder',
    category: 'Apple Beetroot Carrot',
    description: 'Colorful daily nutrition blend for juice and smoothies.',
    price: 520,
    image: '/images/abc-powder.png',
    imageClass: 'abc',
    emoji: '🥕'
  },
  {
    name: 'Makhana Powder',
    category: 'Nutritious Powder',
    description: 'Light and healthy powder for family-friendly meals.',
    price: 480,
    image: '/images/makhana-powder.png',
    imageClass: 'makhana',
    emoji: '⚪'
  }
];

const benefits = [
  {
    icon: '🌿',
    title: 'Natural Ingredients',
    text: 'Made from selected fruits, vegetables and dry fruits.'
  },
  {
    icon: '🧂',
    title: 'No Preservatives',
    text: 'Simple daily nutrition without unnecessary additives.'
  },
  {
    icon: '👶',
    title: 'Family Friendly',
    text: 'Useful for porridge, smoothies, soups and healthy recipes.'
  },
  {
    icon: '📦',
    title: 'Retail Ready',
    text: 'Suitable for wholesale, retail and ecommerce product selling.'
  }
];

const steps = [
  ['01', 'Select', 'Fresh ingredients are carefully selected.'],
  ['02', 'Clean', 'Washed and prepared with hygiene in focus.'],
  ['03', 'Dry', 'Dehydrated to preserve natural quality.'],
  ['04', 'Pack', 'Finely powdered and packed for daily use.']
];

function ProductImage({ product }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className={`product-image ${product.imageClass}`}>
      {!imageFailed && (
        <Image
          src={product.image}
          alt={`Pranam Agro Foods ${product.name}`}
          width={360}
          height={300}
          className="product-img"
          onError={() => setImageFailed(true)}
          priority={false}
        />
      )}
      {imageFailed && <span className="product-fallback">{product.emoji}</span>}
    </div>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState({});
  const [addedProduct, setAddedProduct] = useState('');
  const [heroImageFailed, setHeroImageFailed] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const addToCart = (name) => {
    setCartCount((count) => count + 1);
    setAddedProduct(name);
    setTimeout(() => setAddedProduct(''), 1100);
  };

  const toggleWishlist = (name) => {
    setWishlist((items) => ({ ...items, [name]: !items[name] }));
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="top-strip">
        <p>100% Natural • No Added Sugar • Wholesale & Retail Available</p>
      </div>

      <header className={`site-header ${menuOpen ? 'menu-open' : ''}`}>
        <nav className="navbar container">
          <a href="#" className="brand" aria-label="Pranam Agro Foods home">
            <span className="brand-logo-wrap">
              {!logoFailed ? (
                <Image
                  src="/images/logo.png"
                  alt="Pranam Agro Foods Logo"
                  width={128}
                  height={52}
                  className="brand-logo"
                  priority
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <span className="brand-mark">P</span>
              )}
            </span>
            <span className="brand-text">
              <strong>Pranam</strong>
              <small>Agro Foods</small>
            </span>
          </a>

          <button
            className="nav-toggle"
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className="nav-links">
            <a href="#products" onClick={closeMenu}>Products</a>
            <a href="#why" onClick={closeMenu}>Why Pranam</a>
            <a href="#process" onClick={closeMenu}>Process</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </div>

          <div className="nav-actions">
            <button className="icon-btn" aria-label="Search">⌕</button>
            <button className="icon-btn cart-btn" aria-label="Cart">
              🛒<span>{cartCount}</span>
            </button>
            <a className="btn btn-primary" href="#products" onClick={closeMenu}>Shop Now</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero section-padding">
          <div className="container hero-grid">
            <div className="hero-content">
              <span className="eyebrow">Premium Natural Food Powders</span>
              <h1>Healthy everyday nutrition from fruits, vegetables & dry fruits.</h1>
              <p className="hero-text">
                Discover clean, convenient and family-friendly powders made for smoothies,
                porridges, baby food, baking and daily nutrition.
              </p>

              <div className="hero-actions">
                <a className="btn btn-primary btn-large" href="#products">Explore Products</a>
                <a className="btn btn-outline btn-large" href="#why">Why Choose Us</a>
              </div>

              <div className="trust-row" aria-label="Product highlights">
                <div><strong>0%</strong><span>Added Sugar</span></div>
                <div><strong>100%</strong><span>Natural</span></div>
                <div><strong>7+</strong><span>Products</span></div>
              </div>
            </div>

            <div className="hero-visual" aria-label="Featured Pranam products">
              <div className="blob blob-1"></div>
              <div className="blob blob-2"></div>

              <div className="hero-product-card">
                {!heroImageFailed ? (
                  <Image
                    src="/images/hero-product.png"
                    alt="Pranam Agro Foods featured product jar"
                    width={460}
                    height={520}
                    className="hero-product-img"
                    priority
                    onError={() => setHeroImageFailed(true)}
                  />
                ) : (
                  <div className="jar jar-main">
                    <div className="lid"></div>
                    <div className="jar-body">
                      <span className="label-top">PRANAM</span>
                      <strong>Pumpkin<br />Powder</strong>
                      <small>Fine Natural Powder</small>
                    </div>
                  </div>
                )}
              </div>

              <div className="mini-card mini-card-1">
                <span>🍎</span>
                <p>Apple Powder</p>
              </div>
              <div className="mini-card mini-card-2">
                <span>☕</span>
                <p>Date Seed Coffee</p>
              </div>
            </div>
          </div>
        </section>

        <section className="category-bar">
          <div className="container category-scroll">
            <a href="#products">Fruit Powders</a>
            <a href="#products">Vegetable Powders</a>
            <a href="#products">Baby Friendly</a>
            <a href="#products">Dry Fruit Range</a>
            <a href="#products">Caffeine-free Coffee</a>
          </div>
        </section>

        <section className="section-padding" id="products">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow">Best Sellers</span>
                <h2>Shop by product range</h2>
              </div>
              <p>Clean FMCG-style product cards suitable for ecommerce listing and homepage conversion.</p>
            </div>

            <div className="product-grid">
              {products.map((product) => (
                <article className="product-card" key={product.name}>
                  <button
                    className={`wish ${wishlist[product.name] ? 'active' : ''}`}
                    aria-label={`Add ${product.name} to wishlist`}
                    onClick={() => toggleWishlist(product.name)}
                  >
                    {wishlist[product.name] ? '♥' : '♡'}
                  </button>
                  <ProductImage product={product} />
                  <div className="product-info">
                    <small>{product.category}</small>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="price-row">
                      <strong>Rs. {product.price}</strong>
                      <button className="add-cart" onClick={() => addToCart(product.name)}>
                        {addedProduct === product.name ? 'Added' : 'Add'}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="why section-padding" id="why">
          <div className="container why-grid">
            <div>
              <span className="eyebrow">Why Pranam Agro Foods</span>
              <h2>Clean ingredients made easy for modern families.</h2>
              <p>
                Build trust with clear benefits, simple copy and premium packaging-focused visual language.
              </p>
              <a className="btn btn-outline" href="#contact">Become a Retail Partner</a>
            </div>
            <div className="benefit-grid">
              {benefits.map((benefit) => (
                <div className="benefit-card" key={benefit.title}>
                  <span>{benefit.icon}</span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="process section-padding" id="process">
          <div className="container">
            <div className="section-head compact">
              <span className="eyebrow">Our Process</span>
              <h2>From fresh produce to fine powder</h2>
            </div>
            <div className="steps">
              {steps.map(([number, title, text]) => (
                <div className="step" key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta" id="contact">
          <div className="container cta-box">
            <div>
              <span className="eyebrow light">Wholesale & Retail</span>
              <h2>Want Pranam products for your store?</h2>
              <p>Contact us for product inquiries, bulk orders and ecommerce partnerships.</p>
            </div>
            <div className="cta-actions">
              <a className="btn btn-light" href="tel:+9779843633002">Call: +977-9843633002</a>
              <a className="btn btn-ghost-light" href="mailto:hello@pranamagrofoods.com">Email Us</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <a href="#" className="brand footer-brand">
              <span className="brand-mark">P</span>
              <span>
                <strong>Pranam</strong>
                <small>Agro Foods</small>
              </span>
            </a>
            <p>Natural fruit, vegetable and dry fruit powders for healthy everyday living.</p>
          </div>
          <div>
            <h4>Products</h4>
            <a href="#products">Fruit Powders</a>
            <a href="#products">Vegetable Powders</a>
            <a href="#products">Date Seed Coffee</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#why">About</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <h4>Location</h4>
            <p>Kamalbinayak 10, Bhaktapur, Nepal</p>
          </div>
        </div>
        <div className="footer-bottom container">© 2026 Pranam Agro Foods. All rights reserved.</div>
      </footer>
    </>
  );
}
