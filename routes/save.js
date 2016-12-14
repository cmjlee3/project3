const router = require('express').Router();
const { authenticate } = require('../lib/auth');
const { saveLocToUser,
        saveUserToLoc,
        deleteLocation } = require('../models/save');

router.post('/', authenticate, saveLocToUser, saveUserToLoc, (req, res) => { // ROUTE TO SAVE LOCATIONS TO BOTH USER AND USER TO LOCATIONS IN MONGO
  res.redirect('/users/profile');
});

router.delete('/delete/:id', deleteLocation, (req, res) => { // ROUTE TO DELETE YOUR LOCATION
  res.redirect('/users/profile');
});

module.exports = router;
