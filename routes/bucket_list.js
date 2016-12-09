const router = require('express').Router();
const { } = require('../models/model');

router.get('/', (req,res) => {
  res.render('./bucket_list')
});

module.exports = router;
