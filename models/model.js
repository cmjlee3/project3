const { ObjectID }  = require('mongodb');
const { getDB }     = require('../lib/dbConnect.js');

const dbConnection  = 'mongodb://localhost:27017/map';

function getLocation(req, res, next) {
    getDB().then((db) => {
    db.collection('destinations')
      .find({})
      // userId: { $eq: req.session.userId}
      .toArray((toArrErr, data) => {
        if (toArrErr) return next(toArrErr);
        res.allDestinations = data;
        db.close();
        next();
        return false;
      });
    return false;
  });
  return false;
}

function saveLocation(req, res, next) { // submits ONE listing to the global map from user
  const ID = req.session.userId;
  const user = res.user.username;
  const a = req.body.listing.city;
  const b = req.body.listing.description;

  getDB().then((db) => {
    db.collection('destinations')
      .insert({ sellerId: ID, username: user, city: a, description: b }, (insertErr, result) => {
        if (insertErr) return next(insertErr);
        res.saved = result;
        db.close();
        next();
        return false;
      });
    return false;
  });
  return false;
}

module.exports = {
  getLocation,
  saveLocation
}
