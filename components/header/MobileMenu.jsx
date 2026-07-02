import { ArrowUpRight, Search, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle,
} from '@/components/ui/sheet';

const links = [
  ['Products', '#products'],
  ['Why Pranam', '#why'],
  ['Our Process', '#process'],
  ['Contact', '#contact'],
];

export default function MobileMenu({ open, onOpenChange, cartCount, onSearch }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="mobile-menu-sheet">
        <SheetHeader className="mobile-menu-head">
          <span className="mobile-menu-kicker">Pranam Agro Foods</span>
          <SheetTitle>Explore naturally better nutrition.</SheetTitle>
          <SheetDescription>
            Pure fruit, vegetable and dry-fruit powders for the whole family.
          </SheetDescription>
        </SheetHeader>
        <nav className="mobile-menu-links" aria-label="Mobile navigation">
          {links.map(([label, href], index) => (
            <SheetClose asChild key={href}>
              <a href={href}>
                <span>0{index + 1}</span>{label}<ArrowUpRight aria-hidden="true" />
              </a>
            </SheetClose>
          ))}
        </nav>
        <div className="mobile-menu-actions">
          <SheetClose asChild>
            <Button type="button" variant="outline" onClick={onSearch}>
              <Search aria-hidden="true" /> Search products
            </Button>
          </SheetClose>
          <Button variant="outline" asChild>
            <a href="#products" onClick={() => onOpenChange(false)}>
              <ShoppingBag aria-hidden="true" /> View cart <span>{cartCount}</span>
            </a>
          </Button>
        </div>
        <p className="mobile-menu-note">No preservatives · No added sugar</p>
      </SheetContent>
    </Sheet>
  );
}
