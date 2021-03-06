const router = require('express').Router();
const { authenticate } = require('../lib/auth');
const { getLocations } = require('../models/locations');

router.get('/', authenticate, getLocations, (req, res) => { // PAGE AFTER LOGIN.
  res.render('decide/index', {
    user: res.user,
    results: res.results || [],
    favorites: res.favorites || [],
  });
});

module.exports = router;

