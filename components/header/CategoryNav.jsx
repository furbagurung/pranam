import { ChevronDown, Sparkles } from 'lucide-react';

const categories = [
  'Fruit Powders',
  'Vegetable Powders',
  'Baby & Family',
  'Dry Fruit Range',
  'Natural Sweeteners',
  'Date Seed Coffee',
];

export default function CategoryNav() {
  return (
    <div className="category-nav">
      <div className="container category-nav-inner">
        <a className="category-nav-featured" href="#products">
          <Sparkles aria-hidden="true" />
          Shop all products
          <ChevronDown aria-hidden="true" />
        </a>
        <nav aria-label="Product categories">
          {categories.map((category) => (
            <a href="#products" key={category}>{category}</a>
          ))}
        </nav>
        <a className="category-nav-partner" href="#contact">Wholesale enquiries</a>
      </div>
    </div>
  );
}
