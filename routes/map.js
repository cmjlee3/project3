const router = require('express').Router();
const { authenticate } = require('../lib/auth');
const { getLocations, getListing, saveMapLocation, getAllMarkers, deleteMarker } = require('../models/locations');
const { searchListings } = require('../models/search');

// router.get('/test', getAllMarkers, (req,res) => { // ADD getAllMarkers after creating it in model/locations
//   console.log('HERE');
//   // res.render('map/index', {
//   //   allMapMarkers: res.allMarkers || [],
//   // })
//   res.json({markers: res.allMarkers || []});
// });

router.get('/', authenticate, getLocations, getAllMarkers, (req,res) => { // ADD getAllMarkers after creating it in model/locations
  // console.log('HERE');
  res.render('map/index', {
   mapMarkers: res.allListings || [],
   allMapMarkers: res.allMarkers || []
  })
});

router.post('/markers', saveMapLocation, (req,res) => {
   // console.log('Made it here');
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

router.delete('/delete/:id', deleteMarker,(req, res) => {res.json({message: 'we did it!'});

});




module.exports = router;

