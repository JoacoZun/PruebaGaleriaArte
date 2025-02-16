const express = require('express');
const router = express.Router();
const { getAllArt, getArtById } = require('../controllers/artController');

router.get('/', getAllArt);
router.get('/:id', getArtById);

module.exports = router;
