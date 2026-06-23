# Pranam Agro Foods Next.js Homepage

Modern ecommerce-style homepage converted from normal HTML/CSS/jQuery to Next.js App Router.

## How to run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Image setup

Add your images inside:

```text
public/images/
```

Use these exact filenames:

```text
logo.png
hero-product.png
dates-powder.png
pumpkin-powder.png
banana-powder.png
apple-powder.png
abc-powder.png
makhana-powder.png
```

In Next.js, images inside `public` are referenced from the root path, for example:

```jsx
<Image src="/images/banana-powder.png" alt="Pranam Agro Foods Banana Powder" width={360} height={300} />
```

## Build for production

```bash
npm run build
npm start
```

## Deploy to Vercel

Push this folder to GitHub and import the repository in Vercel. Vercel detects Next.js automatically.

## Notes

- jQuery has been replaced with React state for menu, cart count and wishlist.
- Product data is stored inside `components/HomePage.jsx`.
- Styling is in `app/globals.css`.
