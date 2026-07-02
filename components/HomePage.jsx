'use client';

import Image from 'next/image';
import { Heart, PackageOpen, Truck } from 'lucide-react';
import { useState } from 'react';
import Header from './Header';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { products } from '@/data/products';

/*
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
*/

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
    <div className={`catalog-product-image catalog-tone-${product.tone}`}>
      {!imageFailed && (
        <Image
          src={product.image}
          alt={`Pranam Agro Foods ${product.name}`}
          width={360}
          height={300}
          sizes="(max-width: 40rem) calc(100vw - 3.5rem), (max-width: 64rem) calc(50vw - 3rem), 17rem"
          className="h-full w-full object-contain drop-shadow-[0_1.25rem_1.5rem_rgba(32,54,35,0.14)]"
          onError={() => setImageFailed(true)}
          priority={false}
        />
      )}
      {imageFailed && (
        <div className="catalog-image-fallback" role="img" aria-label={`${product.name} image coming soon`}>
          <PackageOpen aria-hidden="true" />
          <span>{product.name}</span>
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState({});
  const [selectedVariants, setSelectedVariants] = useState({});
  const [addedProduct, setAddedProduct] = useState('');
  const [heroImageFailed, setHeroImageFailed] = useState(false);

  const addToCart = (product) => {
    const variant = selectedVariants[product.id] ?? product.variants[0];
    setCartCount((count) => count + 1);
    setAddedProduct(`${product.id}-${variant.weight}`);
    setTimeout(() => setAddedProduct(''), 1100);
  };

  const toggleWishlist = (name) => {
    setWishlist((items) => ({ ...items, [name]: !items[name] }));
  };

  return (
    <>
      <Header cartCount={cartCount} />
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

            <div className="catalog-grid grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => {
                const selectedVariant = selectedVariants[product.id] ?? product.variants[0];
                const addedKey = `${product.id}-${selectedVariant.weight}`;

                return (
                  <Card className="catalog-card" key={product.id}>
                    <Button
                      className="catalog-wishlist"
                      variant="outline"
                      size="icon-lg"
                      type="button"
                      aria-label={`${wishlist[product.id] ? 'Remove' : 'Add'} ${product.name} ${wishlist[product.id] ? 'from' : 'to'} wishlist`}
                      aria-pressed={Boolean(wishlist[product.id])}
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <Heart className={wishlist[product.id] ? 'fill-current' : ''} aria-hidden="true" />
                    </Button>

                    <ProductImage product={product} />

                    <CardContent className="flex flex-1 flex-col px-5">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <Badge className="catalog-category-badge" variant="secondary">
                          {product.category}
                        </Badge>
                        {product.note && (
                          <Badge className="catalog-delivery-badge" variant="outline">
                            <Truck aria-hidden="true" />
                            {product.note}
                          </Badge>
                        )}
                      </div>

                      <h3 className="font-heading text-[clamp(1.25rem,2vw,1.5rem)] font-semibold leading-tight text-[#173f2a]">
                        {product.name}
                      </h3>
                      <p className="mt-2 min-h-[4.5rem] text-base leading-6 text-[#626b64]">
                        {product.description}
                      </p>

                      <div className="mt-5">
                        <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#81765e]">
                          Available quantities
                        </span>
                        <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={`Select ${product.name} quantity`}>
                          {product.variants.map((variant) => {
                            const isSelected = selectedVariant.weight === variant.weight;

                            return (
                              <Button
                                className="catalog-variant-button"
                                variant={isSelected ? 'default' : 'outline'}
                                size="sm"
                                type="button"
                                aria-pressed={isSelected}
                                key={variant.weight}
                                onClick={() => setSelectedVariants((current) => ({
                                  ...current,
                                  [product.id]: variant,
                                }))}
                              >
                                {variant.weight}
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="catalog-card-footer">
                      <div>
                        <span>{selectedVariant === product.variants[0] ? 'Starts at' : selectedVariant.weight}</span>
                        <strong>Rs. {selectedVariant.price.toLocaleString('en-IN')}</strong>
                      </div>
                      <Button className="catalog-add-button" type="button" onClick={() => addToCart(product)}>
                        {addedProduct === addedKey ? 'Added' : 'Add'}
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
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
