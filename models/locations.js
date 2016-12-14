const { ObjectID } = require('mongodb');
const { getDB } = require('../lib/dbConnect.js');

function getLocations(req, res, next) { // finds ALL listings on the global map regardless of user
  getDB().then((db) => {
    db.collection('listings')
      .find({})
      // userId: { $eq: req.session.userId}
      .toArray((toArrErr, data) => {
        if (toArrErr) return next(toArrErr);
        // console.log(data);
        res.allListings = data;
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
  const c = req.body.listing.accuracy;
  const e = res.user.tel;
  const f = res.user.email;
  const g = req.body.listing.description;
  const i = req.body.listing.price;
  const j = req.body.listing.category;
  const k = req.body.listing.location;
  const l = [];

  getDB().then((db) => {
    db.collection('listings')
      .insert({ sellerId: ID, username: user, accuracy: c, tel: e, email: f, description: g, price: i, category: j, location: k, favoriteUsers: l }, (insertErr, result) => {
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

function getMyListings(req, res, next) { // finds ALL listings self user has created
  getDB().then((db) => {
    db.collection('listings')
      .find({ sellerId: req.session.userId })
      .toArray((toArrErr, data) => {
        if (toArrErr) return next(toArrErr);
        res.myListings = data;
        db.close();
        next();
        return false;
      });
    return false;
  });
  return false;
}

function editListing(req, res, next) {
  getDB().then((db) => {
    db.collection('listings')
      .findAndModify({ _id: ObjectID(req.params.id) }, [] /* sort */,
      { $set: req.body.oneListing }, { new: true }, (updateError, doc) => {
        if (updateError) return next(updateError);

        // return the data
        res.updated = doc;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}

function getListing(req, res, next) { // get ONE listing based on the object's _id
  getDB().then((db) => {
    db.collection('listings')
      .findOne({ _id: ObjectID(req.params.id) }, (findErr, data) => {
        if (findErr) return next(findErr);

        // return the data
        res.oneListing = data;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}


// Delete method doesn't change because we are deleting objects from the database
// based on that object's unique _id - you do not need to specify which user as
// the _id is sufficient enough
function deleteListing(req, res, next) {
  getDB().then((db) => {
    db.collection('listings')
      .findAndRemove({ _id: ObjectID(req.params.id) }, (removeErr, result) => {
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

function saveMapLocation(req, res, next) { // submits ONE listing to the global map from user
  console.log('MADE IT TO MODEL');

  const ID = req.session.userId;
  const place = req.body;


  getDB().then((db) => {
    db.collection('markers')
      .insert({ sellerId: ID, place: place }, (insertErr, result) => {
        if (insertErr) return next(insertErr);
        res.locationsaved = result;
        db.close();
        next();
        return false;
      });
    return false;
  });
  return false;
}

function getAllMarkers(req, res, next) {
  console.log('is it hitting?????')// finds ALL listings on the global map regardless of user
  getDB().then((db) => {
    db.collection('markers')
      .find({})
      // userId: { $eq: req.session.userId}
      .toArray((toArrErr, data) => {
        if (toArrErr) return next(toArrErr);
        console.log('**********', data);
        res.allMarkers = data;
        db.close();
        next();
        return false;
      });
    return false;
  });
  return false;
}

function deleteMarker(req, res, next) {
  getDB().then((db) => {
    db.collection('markers')
      .findAndRemove({ _id: ObjectID(req.params.id) }, (removeErr, result) => {
        if (removeErr) return next(removeErr);
        res.deletedMarker = result;
        db.close();
        next();
        return false;
      });
    return false;
  });
  return false;
}


module.exports = { getLocations, saveLocation, deleteListing, getMyListings, editListing, getListing, saveMapLocation, getAllMarkers, deleteMarker };
