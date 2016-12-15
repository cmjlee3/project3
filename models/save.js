const { ObjectID } = require('mongodb');
const { getDB } = require('../lib/dbConnect.js');

function saveLocToUser(req, res, next) { // saves a LOC TO USER

  getDB().then((db) => {
    db.collection('users')
      .update({ _id: ObjectID(req.session.userId) }, { $push: { favoriteListings: req.body.listing._id } }, (insertErr, result) => {
        if (insertErr) return next(insertErr);
        res.update = result;
        db.close();
        next();
        return false;
      });
    return false;
  });
  return false;
}

function saveUserToLoc(req, res, next) { // saves a USER TO LOC
  getDB().then((db) => {
    db.collection('listings')
      .update({ _id: ObjectID(req.body.listing._id) }, { $push: { favoriteUsers: res.user.username } }, (insertErr, result) => {
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

function deleteLocation(req, res, next) { //DELETES LOCATION FROM TRACKED PLACES
  getDB().then((db) => {
    db.collection('users')
      .update({ _id: ObjectID(req.session.userId) }, { $pull: { favoriteListings: req.params.id } }, (removeErr, result) => {
        if (removeErr) return next(removeErr);
        res.removed = result;
        db.close();
        next();
        return false;
      });
    return false;
  });
  return false;
}

function getMyLocations(req, res, next) { // find listings USER has indicated interest in.
  getDB().then((db) => {
    db.collection('users')
      .find({ _id: ObjectID(req.session.userId) })
      .toArray((toArrErr, data) => {
        if (toArrErr) return next(toArrErr);
        res.favorites = data;
        db.close();
        next();
        return false;
      });
    return false;
  });
  return false;
}

module.exports = { saveLocToUser, saveUserToLoc, deleteLocation, getMyLocations };
