'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import AnnouncementBar from './header/AnnouncementBar';
import CategoryNav from './header/CategoryNav';
import MainHeader from './header/MainHeader';
import MobileMenu from './header/MobileMenu';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function Header({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const openSearch = () => {
    setMenuOpen(false);
    setSearchOpen(true);
  };

  return (
    <>
      <div className="commerce-header">
        <AnnouncementBar />
        <header className="site-header">
          <MainHeader
            cartCount={cartCount}
            onMenuOpen={() => setMenuOpen(true)}
            onSearch={openSearch}
          />
          <CategoryNav />
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                className="header-search-panel"
                initial={{ opacity: 0, y: '-0.5rem' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '-0.375rem' }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <form className="container header-search-form" action="#products">
                  <Search aria-hidden="true" />
                  <label className="sr-only" htmlFor="header-search">Search products</label>
                  <Input
                    ref={searchInputRef}
                    id="header-search"
                    name="search"
                    type="search"
                    placeholder="Search fruit, vegetable and family nutrition..."
                  />
                  <Button type="submit">Search products</Button>
                  <Button
                    className="header-search-close"
                    type="button"
                    variant="ghost"
                    size="icon-lg"
                    aria-label="Close search"
                    onClick={() => setSearchOpen(false)}
                  >
                    <X aria-hidden="true" />
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      </div>
      <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} cartCount={cartCount} onSearch={openSearch} />
    </>
  );
}
