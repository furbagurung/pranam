'use client';

import Image from 'next/image';
import {
  Droplets,
  Heart,
  HeartHandshake,
  Leaf,
  PackageCheck,
  PackageOpen,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Sprout,
  Star,
  Store,
  Sun,
  Truck,
} from 'lucide-react';
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
    icon: Leaf,
    title: 'Natural Ingredients',
    text: 'Made from selected fruits, vegetables, and dry fruits.',
  },
  {
    icon: ShieldCheck,
    title: 'No Preservatives',
    text: 'Simple daily nutrition without unnecessary additives.',
  },
  {
    icon: HeartHandshake,
    title: 'Family Friendly',
    text: 'Useful for porridge, smoothies, soups, breakfast bowls, and homemade recipes.',
  },
  {
    icon: Store,
    title: 'Retail Ready',
    text: 'Suitable for wholesale, retail, and ecommerce product selling.',
  },
  {
    icon: PackageCheck,
    title: 'Multiple Pack Sizes',
    text: 'Available in practical sizes for home and retail needs.',
  },
  {
    icon: Sparkles,
    title: 'Carefully Packed',
    text: 'Packed to support freshness, shelf presence, and everyday convenience.',
  },
];

const steps = [
  { number: '01', icon: Sprout, title: 'Select', text: 'Fresh ingredients are carefully selected.' },
  { number: '02', icon: Droplets, title: 'Clean', text: 'Washed and prepared with hygiene in focus.' },
  { number: '03', icon: Sun, title: 'Dry', text: 'Dehydrated to preserve natural quality.' },
  { number: '04', icon: PackageCheck, title: 'Pack', text: 'Finely powdered and packed for daily use.' },
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

function WhyPranamSection() {
  const shouldReduceMotion = useReducedMotion();
  const reveal = shouldReduceMotion
    ? { initial: false }
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.18 },
      };

  return (
    <motion.section className="why-pranam" id="why" {...reveal} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
      <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="why-pranam-grid grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="why-pranam-copy min-w-0">
            <Badge className="why-pranam-badge" variant="outline">
              <Leaf aria-hidden="true" />
              Why Pranam Agro Foods
            </Badge>
            <h2>Clean ingredients made easy for modern families.</h2>
            <p>
              Thoughtfully made fruit, vegetable, and dry fruit products for daily nutrition,
              family use, retail shelves, and ecommerce stores.
            </p>
            <Button className="why-pranam-cta" variant="outline" size="lg" asChild>
              <a href="#contact">
                <Store aria-hidden="true" />
                Become a Retail Partner
              </a>
            </Button>
          </div>

          <div className="why-pranam-benefits grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <motion.div
                  className="h-full"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.34,
                    delay: shouldReduceMotion ? 0 : index * 0.055,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  key={benefit.title}
                >
                  <Card className="why-pranam-card h-full rounded-3xl border border-[#e3dac8] bg-white/95 shadow-[0_0.75rem_2rem_rgba(42,57,45,0.07)]">
                    <CardContent className="why-pranam-card-content flex h-full flex-col items-start p-6">
                      <span className="why-pranam-icon flex size-11 items-center justify-center rounded-2xl bg-[#e8f4ec] text-[#1d6336]">
                        <Icon className="size-5 text-[#1d6336]" aria-hidden="true" />
                      </span>
                      <div className="mt-5 min-w-0">
                        <h3>{benefit.title}</h3>
                        <p>{benefit.text}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ProcessSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className="process-section bg-[#fbf7ee] pt-20 pb-28 sm:pt-24 sm:pb-32 lg:pt-28 lg:pb-36"
      id="process"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="process-section-head mx-auto max-w-3xl text-center">
          <Badge className="process-section-badge mx-auto" variant="outline">OUR PROCESS</Badge>
          <h2 className="mt-4 mb-3 text-center text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.04] text-[#154b2a]">
            From fresh produce to fine powder
          </h2>
          <p className="mx-auto max-w-2xl text-center text-[1.0625rem] leading-7 text-[#59665d]">
            A simple, careful process designed to preserve natural quality, freshness,
            and everyday usability.
          </p>
        </div>

        <div className="process-card-grid mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                className="relative z-[1] h-full"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.32,
                  delay: shouldReduceMotion ? 0 : index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                key={step.number}
              >
                <Card className="process-card h-full min-h-72 rounded-3xl border border-[#e4dac7] bg-white/95 shadow-[0_1rem_2.5rem_rgba(42,57,45,0.09)]">
                  <CardContent className="process-card-content flex h-full flex-col p-8">
                    <div className="process-card-topline flex items-center justify-between gap-4">
                      <span className="process-step-number text-sm font-extrabold tracking-[0.16em] text-[#a87918]">
                        {step.number}
                      </span>
                      <span className="process-icon flex size-12 items-center justify-center rounded-full bg-[#e8f4ec] text-[#17602f]">
                        <Icon className="size-6 text-[#17602f]" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-auto mb-3 text-2xl font-bold text-[#173f2a]">{step.title}</h3>
                    <p className="text-base leading-7 text-[#56635a]">{step.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
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

        <WhyPranamSection />

        <ProcessSection />

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
