const router             = require('express').Router();
const { getLocations, saveLocation } = require('../models/model');
const { authenticate }   = require('../lib/auth');

router.get('/', getLocations, (req, res) => { // ROUTE TO GRAB ALL CURRENT ACTIVE LISTINGS
  res.render('./showmap', {
   mapMarkers: res.allListings,
  });
});

router.get('/allListings', getLocations, (req, res) => { // ROUTE TO GRAB ALL CURRENT ACTIVE LISTINGS
  res.json(res.allDestinations);
});
