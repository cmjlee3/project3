const router             = require('express').Router();
const { getLocations, saveLocation, getListing, editListing, deleteListing, saveFavToUser } = require('../models/model');
const { authenticate }   = require('../lib/auth');


router.get('/', authenticate, getLocations, (req,res) => {
  res.render('./map', {
    mapMarkers: res.allListings,
  })
});

router.post('/submit', authenticate, saveLocation, (req,res) => {
   res.render('./test');

});

router.get('/continue', getLocations, (req, res) => { // ROUTE TO GRAB ALL CURRENT ACTIVE LISTINGS
  res.render('./showmap', {
   mapMarkers: res.allListings,
  });
});

// router.get('/:id', searchListings, getListing, (req, res) => { // ROUTE TO SEE SPECIFIC LISTING BASED ON ITS OBJECT _ID
//   res.render('./home', {
//     listing: res.oneListing,
//   });
// });

router.get('/edit/:id', getListing, (req, res) => { // ROUTE TO GRAB YOUR LISTING THAT YOU ARE SELLING
  res.render('./testedit', {
    oneListing: res.oneListing,
  });
});

router.put('/editfinished/:id', editListing, (req, res) => { // ROUTE TO EDIT YOUR LISTING THAT YOU ARE SELLING
  res.redirect('/test2');
});

router.delete('/delete/:id', deleteListing, (req, res) => { // ROUTE TO DELETE YOUR LISTING THAT YOU ARE SELLING
  res.redirect('/test2');
});
// CREATE ROUTE TO REDIRECT AFTER NEW PIN IS CREATED / USER CAN CLICK LINK TO GO BACK TO HOME

// ROUTE TO EDIT THE PIN/DESCRIPTION YOU HAVE CREATED (WHERE FROM?)

// ROUTE TO DELETE THE PINK YOU MADE (WHERE FROM?)

module.exports = router;
