const router = require('express').Router();
const { authenticate } = require('../lib/auth');
const { getLocations, getListing, saveMapLocation, getAllMarkers } = require('../models/locations');
const { searchListings } = require('../models/search');

router.post('/markers', saveMapLocation, (req,res) => {
   console.log('Made it here');
   res.redirect('/map');
});

router.get('/allListings', getLocations, (req, res) => { // ROUTE TO GRAB ALL CURRENT ACTIVE LISTINGS
  res.json(res.allListings);
});


router.get('/:id', searchListings, getListing, (req, res) => { // ROUTE TO SEE SPECIFIC LISTING BASED ON ITS OBJECT _ID
  res.render('map/item', {
    listing: res.oneListing,
  });
});

router.get('/', authenticate, getLocations, (req,res) => { // ADD getAllMarkers after creating it in model/locations
  console.log('HERE');
  res.render('map/index', {
    mapMarkers: res.allListings,

  })
});

module.exports = router;

