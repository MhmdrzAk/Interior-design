# Interior Design Studio Website (React + Vite)

A Persian (RTL) single-page website for an interior design studio, built with React and Vite. Includes services, a portfolio with filters, the design process, testimonials and a contact form.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Deploy to GitHub Pages (automatic)

1. Create a new GitHub repository and push this project to the `main` branch.
2. Go to **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
3. Every push to `main` will build and publish the site automatically.

Site URL: `https://<your-username>.github.io/<repository-name>/`

## Editing content

- **Services, projects, process steps, testimonials:** `src/data.js`
- **Email and phone:** the `EMAIL` and `PHONE` constants at the top of `src/App.jsx`
- **Colors and fonts:** the CSS variables in `:root` in `src/styles.css`
- **Portfolio photos:** place `project-1.jpg` to `project-6.jpg` in `public/images/`. The number matches the project `id` in `src/data.js`. If a photo is missing, the color gradient is shown instead.

## Build

```bash
npm run build
```

The output is written to the `dist` folder.