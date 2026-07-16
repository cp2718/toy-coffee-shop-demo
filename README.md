# Brew Haven ☕

A coffee shop web app built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step.

## Features

- Browse a menu with category filtering (Espresso, Brewed, Cold, Pastries)
- Add items to a cart with quantity controls
- Cart persists across page reloads via `localStorage`
- Slide-out cart drawer with live totals and checkout
- Responsive, accessible UI with toast notifications

## Getting Started

No dependencies or build step required. Serve the folder with any static file server:

```bash
# Python
python3 -m http.server 8000

# Node (npx)
npx serve .
```

Then open http://localhost:8000 in your browser.

> Note: opening `index.html` directly via `file://` won't work because the app uses ES modules, which require an HTTP server.

## Project Structure

```
.
├── index.html              # Entry page
├── assets/
│   └── favicon.svg
└── src/
    ├── css/
    │   └── styles.css      # All styles (design tokens + components)
    └── js/
        ├── app.js          # Entry point
        ├── store.js        # Cart state (pub/sub + localStorage)
        ├── data/
        │   └── menu.js     # Menu data
        ├── ui/
        │   ├── menu.js     # Menu grid & filters
        │   ├── cart.js     # Cart drawer
        │   └── toast.js    # Toast notifications
        └── utils/
            └── format.js   # Currency formatting
```

## Deployment

This is a fully static site — it works out of the box on GitHub Pages, Netlify, Vercel, or any static host.

## License

MIT
