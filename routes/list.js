const router = require('express').Router();
const { authenticate } = require('../lib/auth');

const { saveLocation,
        deleteListing,
        getListing,
        editListing } = require('../models/locations');

router.get('/', authenticate, (req, res) => { // ROUTE TO FILL OUT NEW POSTING FORM
  res.render('list/index', {
    user: res.user,
  });
});

router.post('/submit', authenticate, saveLocation, (req, res) => { // ROUTE TO CREATE A NEW LOCATION POSTING
  res.render('list/newPosting');
});

router.get('/continue', (req, res) => { // REDIRECT AFTER SUBMITTING POSTING
  res.redirect('/map');
});

router.get('/edit/:id', getListing, (req, res) => { // ROUTE TO GRAB YOUR LOCATION
  res.render('list/edit', {
    oneListing: res.oneListing,
  });
});

router.put('/editfinished/:id', editListing, (req, res) => { // ROUTE TO EDIT YOUR LOCATION
  res.redirect('/users/profile');
});

router.delete('/delete/:id', deleteListing, (req, res) => { // ROUTE TO DELETE YOUR LOCATION
  res.redirect('/users/profile');
});

module.exports = router;
