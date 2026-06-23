import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata = {
  title: 'Pranam Agro Foods | Natural Powder Products',
  description:
    'Modern ecommerce homepage for Pranam Agro Foods natural fruit, vegetable and dry fruit powders.',
  keywords: [
    'Pranam Agro Foods',
    'Dates Powder',
    'Pumpkin Powder',
    'Banana Powder',
    'Natural Food Powders Nepal'
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
