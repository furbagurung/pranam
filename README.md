# Pranam Static E-Commerce Site

Pranam is a Vercel-ready static e-commerce website for dried fruits, dates powder, and dates coffee. It uses plain HTML, CSS, and jQuery only.

## Project Structure

```text
pranam/
├── index.html
├── products.html
├── about.html
├── contact.html
├── css/
│   ├── style.css
│   ├── components.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── navigation.js
│   └── products.js
├── images/
├── assets/
├── partials/
│   ├── header.html
│   └── footer.html
├── vercel.json
├── README.md
└── .gitignore
```

## Pages

- `index.html` - Home page with hero, featured products, and brand value cards.
- `products.html` - Filterable product listing for dried fruits, dates powder, and dates coffee.
- `about.html` - Brand story and product focus.
- `contact.html` - Static contact page and inquiry form layout.

## Local Preview

The shared header and footer are loaded with jQuery's `.load()` method, so preview the site through a local static server instead of opening files with `file://`.

One simple option is:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. Create a new Vercel project from the repository.
3. Select the `Other` preset.
4. Leave the build command empty.
5. Use the project root as the output directory.
6. Deploy.

The `vercel.json` file enables clean URLs and disables trailing slashes.
