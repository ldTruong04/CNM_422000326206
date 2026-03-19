# Simple MVC Node.js + EJS App

This is a minimal Node.js Express app using an MVC-like layout with EJS views. It's scaffolded for easy deployment to AWS Elastic Beanstalk.

## What's included

- `app.js` - Express server setup
- `routes/` - Express routes
- `controllers/` - Controllers (tiny example)
- `views/` - EJS views and partials
- `public/` - Static assets (CSS)
- `package.json` - start script and dependencies
- `Procfile` - optional process file for some deployment setups

## Quick local run

1. Install deps

```bash
cd /path/to/project
npm install
```

2. Run locally

```bash
npm start
# then open http://localhost:3000
```

## Deploy to Elastic Beanstalk (high level)

1. Install and configure the EB CLI: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html

2. Initialize the project (choose Node.js platform and region):

```bash
eb init -p node.js simple-mvc-eb
```

3. Create an environment and deploy:

```bash
eb create simple-mvc-eb-env
eb deploy
```

Elastic Beanstalk will use `package.json` `start` script to start the app. Set the Node engine in `package.json` if you need a specific Node version.

## Notes

- For production, consider adding logging, environment configuration, and health checks.
- You can add a `.ebextensions/` folder for custom EB config if needed.

## Product CRUD

This app includes a small file-backed Product CRUD feature. Data is stored in `data/products.json` inside the project directory.

- List: GET /products
- Create: POST /products (form at /products/new)
- Edit: GET /products/:id/edit and PUT /products/:id (forms use method-override)
- Delete: DELETE /products/:id (forms use method-override)

Flash messages are used to surface success/error notifications in the UI.

## Health check

A minimal health endpoint is available at `GET /health` which returns a JSON {"status":"ok"} and is suitable for platform health checks.
