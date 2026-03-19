const path = require('path');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 3000;

// Routers
const productsRouter = require('./routes/products');

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Security and logging
app.use(helmet());
app.use(morgan('dev'));

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Session + flash for user messages
app.use(session({ secret: process.env.SESSION_SECRET || 'change-me', resave: false, saveUninitialized: false }));
app.use(flash());

// Expose flash and current path to views
app.use((req, res, next) => {
  res.locals.flash = req.flash();
  res.locals.currentPath = req.path;
  next();
});

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// Redirect root to products list
app.get('/', (req, res) => res.redirect('/products'));
app.use('/products', productsRouter);

// Health check for platforms
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// 404
app.use((req, res) => {
  res.status(404).render('404', { title: 'Not Found' });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
