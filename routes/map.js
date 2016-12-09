const router             = require('express').Router();
const { getLocation } = require('../models/model');
const { authenticate }   = require('../lib/auth');

// REFERENCING ALEX'S SELL.JS IN ROUTES

// CREATE ROUTE TO GRAB ALREADY CREATED PINS (GOOGLE)
router.get('/', authenticate, getLocation, (req,res) => {
  res.render('./map', {
    mapMarkers: res.allDestinations,
  })
});

// CREATE ROUTE TO FILL OUT NEW POSTING FORM (CITY/COUNTRY ALREADY TRAVELED TO, CONNECT TO GOOGLE)

// CREATE ROUTE TO REDIRECT AFTER NEW PIN IS CREATED / USER CAN CLICK LINK TO GO BACK TO HOME

// ROUTE TO EDIT THE PIN/DESCRIPTION YOU HAVE CREATED (WHERE FROM?)

// ROUTE TO DELETE THE PINK YOU MADE (WHERE FROM?)

module.exports = router;
