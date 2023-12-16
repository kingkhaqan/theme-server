// router.js
const express = require('express');
const { getBusinessByName, getBusinessById, getSections, updateBusinessSettings } = require('../services/businesses');
const router = express.Router();

// Route for the homepage
router.get('/:name', getBusinessByName);
router.put('/:name', updateBusinessSettings);

// router.get('/:id/sections', getSections);
// router.get('/:id', getBusinessById);




module.exports = router;
