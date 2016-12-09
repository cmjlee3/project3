// This is the index controller. It handles all three of the routes located in the index controller.

const express    = require('express');

const homeRouter = express.Router();

// This is the route that serves your '/' homepage
homeRouter.get('/', (req, res) => {
  res.render('./home');
});

// This route serves your `/login` form
homeRouter.get('/login', (req, res) => {
  res.render('./login');
});

// This route serves your `/signup` form
homeRouter.get('/signup', (req, res) => {
  res.render('./signup');
});


module.exports = homeRouter;
