'use client';

import Image from 'next/image';
import { Heart, PackageOpen, ShoppingCart, Star, Truck } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import Header from './Header';
import HeroSlider from './HeroSlider';
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

const productFilters = [
  { label: 'All', value: 'all' },
  { label: 'Powders', value: 'powders' },
  { label: 'Fruit Chips', value: 'chips' },
  { label: 'Dry Fruit Range', value: 'dry-fruit' },
];

function matchesProductFilter(product, filter) {
  if (filter === 'all') return true;
  if (filter === 'powders') return product.category.toLowerCase().includes('powder');
  if (filter === 'chips') return product.category.toLowerCase().includes('chips');

  return product.category.toLowerCase().includes('dry fruit');
}

function ProductImage({ product }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className={`catalog-product-image ${imageFailed ? 'catalog-image-missing' : `catalog-tone-${product.tone}`}`}>
      {!imageFailed && (
        <Image
          src={product.image}
          alt={`Pranam Agro Foods ${product.name}`}
          fill
          sizes="(max-width: 39.999rem) calc(100vw - 3rem), (max-width: 63.999rem) calc(50vw - 2.5rem), (max-width: 79.999rem) calc(33vw - 2rem), 20rem"
          className="object-contain p-5 drop-shadow-[0_1rem_1.25rem_rgba(32,54,35,0.13)] sm:p-6"
          onError={() => setImageFailed(true)}
        />
      )}
      {imageFailed && (
        <div className="catalog-image-fallback" role="img" aria-label={`${product.name} image coming soon`}>
          <PackageOpen aria-hidden="true" />
          <span>Image coming soon</span>
        </div>
      )}
    </div>
  );
}

function ProductCard({ product, isWishlisted, onAddToCart, onToggleWishlist, addedProduct }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const shouldReduceMotion = useReducedMotion();
  const addedKey = `${product.id}-${selectedVariant.weight}`;

  return (
    <motion.div
      className="h-full min-w-0"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="catalog-card h-full rounded-3xl">
        <div className="catalog-media-wrap">
          <Button
            className="catalog-wishlist"
            variant="outline"
            size="icon-lg"
            type="button"
            aria-label={`${isWishlisted ? 'Remove' : 'Add'} ${product.name} ${isWishlisted ? 'from' : 'to'} wishlist`}
            aria-pressed={isWishlisted}
            onClick={() => onToggleWishlist(product.id)}
          >
            <Heart className={isWishlisted ? 'fill-current' : ''} aria-hidden="true" />
          </Button>

          <ProductImage product={product} />
        </div>

        <CardContent className="catalog-card-content">
          <div className="catalog-badge-row">
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

          <h3 className="catalog-product-name">{product.name}</h3>
          <p className="catalog-product-description">{product.description}</p>

          <div className="catalog-rating" aria-label="Rated 4.9 out of 5">
            <div aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => (
                <Star className="fill-current" key={index} />
              ))}
            </div>
            <strong>4.9</strong>
            <span>Customer favourite</span>
          </div>

          <div className="catalog-variant-group">
            <span className="catalog-variant-label">Choose weight</span>
            <div className="catalog-variants" role="group" aria-label={`Select ${product.name} weight`}>
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
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant.weight}
                  </Button>
                );
              })}
            </div>
          </div>
        </CardContent>

        <CardFooter className="catalog-card-footer">
          <div className="catalog-price">
            <span>{selectedVariant === product.variants[0] ? 'Starts at' : selectedVariant.weight}</span>
            <strong aria-live="polite">Rs. {selectedVariant.price.toLocaleString('en-IN')}</strong>
          </div>
          <Button className="catalog-add-button" type="button" onClick={() => onAddToCart(product, selectedVariant)}>
            <ShoppingCart aria-hidden="true" />
            {addedProduct === addedKey ? 'Added' : 'Add to cart'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default function HomePage() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState({});
  const [addedProduct, setAddedProduct] = useState('');
  const [productFilter, setProductFilter] = useState('all');

  const addToCart = (product, variant) => {
    setCartCount((count) => count + 1);
    setAddedProduct(`${product.id}-${variant.weight}`);
    setTimeout(() => setAddedProduct(''), 1100);
  };

  const toggleWishlist = (name) => {
    setWishlist((items) => ({ ...items, [name]: !items[name] }));
  };

  const visibleProducts = products.filter((product) => matchesProductFilter(product, productFilter));

  return (
    <>
      <Header cartCount={cartCount} />
      <main>
        <HeroSlider />

        <section className="category-bar">
          <div className="container category-scroll">
            <a href="#products">Fruit Powders</a>
            <a href="#products">Vegetable Powders</a>
            <a href="#products">Baby Friendly</a>
            <a href="#products">Dry Fruit Range</a>
            <a href="#products">Caffeine-free Coffee</a>
          </div>
        </section>

        <section className="catalog-section section-padding" id="products">
          <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-8">
            <div className="catalog-section-head">
              <div>
                <Badge className="catalog-kicker" variant="outline">Best sellers</Badge>
                <h2>Shop by product range</h2>
              </div>
              <p>Wholesome pantry essentials, thoughtfully made from fruits and vegetables for everyday family nutrition.</p>
            </div>

            <div className="catalog-filters" aria-label="Filter products">
              {productFilters.map((filter) => (
                <Button
                  className="catalog-filter-button"
                  variant={productFilter === filter.value ? 'default' : 'outline'}
                  type="button"
                  aria-pressed={productFilter === filter.value}
                  key={filter.value}
                  onClick={() => setProductFilter(filter.value)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>

            {visibleProducts.length > 0 ? (
              <div className="catalog-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visibleProducts.map((product) => (
                  <ProductCard
                    product={product}
                    isWishlisted={Boolean(wishlist[product.id])}
                    onAddToCart={addToCart}
                    onToggleWishlist={toggleWishlist}
                    addedProduct={addedProduct}
                    key={product.id}
                  />
                ))}
              </div>
            ) : (
              <div className="catalog-empty" role="status">
                <PackageOpen aria-hidden="true" />
                <h3>More pantry favourites are coming soon.</h3>
                <p>Explore our powders and fruit chips while we prepare the dry fruit range.</p>
                <Button type="button" variant="outline" onClick={() => setProductFilter('all')}>View all products</Button>
              </div>
            )}
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
