const router = require('express').Router();
const { authenticate } = require('../lib/auth');
const { getLocations, getListing, saveMapLocation } = require('../models/locations');
const { searchListings } = require('../models/search');

router.get('/', authenticate, getLocations, (req,res) => {
  res.render('map/index', {
    mapMarkers: res.allListings,
  })
});

router.get('/allListings', getLocations, (req, res) => { // ROUTE TO GRAB ALL CURRENT ACTIVE LISTINGS
  res.json(res.allListings);
});

router.post('/submit', authenticate, saveMapLocation, (req,res) => {
   res.render('map/test');
});

router.get('/:id', searchListings, getListing, (req, res) => { // ROUTE TO SEE SPECIFIC LISTING BASED ON ITS OBJECT _ID
  res.render('map/item', {
    listing: res.oneListing,
  });
});

module.exports = router;

