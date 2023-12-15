// router.js
const express = require('express');
const { getThemes } = require('../services/themes');
const router = express.Router();

// Route for the homepage
router.get('/', getThemes);


module.exports = router;
