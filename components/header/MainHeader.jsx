import Image from 'next/image';
import { ArrowUpRight, Menu, Search, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const links = [
  ['Products', '#products'],
  ['Why Pranam', '#why'],
  ['Our Process', '#process'],
  ['Contact', '#contact'],
];

export default function MainHeader({ cartCount, onMenuOpen, onSearch }) {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <div className="main-header">
      <div className="container main-header-inner">
        <Button
          className="header-icon-button mobile-menu-trigger"
          variant="outline"
          size="icon-lg"
          type="button"
          aria-label="Open navigation menu"
          onClick={onMenuOpen}
        >
          <Menu aria-hidden="true" />
        </Button>
        <a href="#" className="header-brand" aria-label="Pranam Agro Foods home">
          {!logoFailed ? (
            <Image
              src="/images/logo.png"
              alt="Pranam Agro Foods"
              width={154}
              height={62}
              sizes="(max-width: 40rem) 7rem, 9.25rem"
              className="header-logo"
              priority
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <>
              <span className="header-brand-mark">P</span>
              <span><strong>Pranam</strong><small>Agro Foods</small></span>
            </>
          )}
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <Button
            className="header-icon-button desktop-search-trigger"
            variant="outline"
            size="icon-lg"
            type="button"
            aria-label="Search products"
            onClick={onSearch}
          >
            <Search aria-hidden="true" />
          </Button>
          <Button className="header-icon-button header-cart" variant="outline" size="icon-lg" asChild>
            <a href="#products" aria-label={`Cart with ${cartCount} items`}>
              <ShoppingBag aria-hidden="true" />
              <span aria-hidden="true">{cartCount}</span>
            </a>
          </Button>
          <Button className="header-shop-button" asChild>
            <a href="#products">Shop collection <ArrowUpRight aria-hidden="true" /></a>
          </Button>
        </div>
      </div>
    </div>
  );
}
