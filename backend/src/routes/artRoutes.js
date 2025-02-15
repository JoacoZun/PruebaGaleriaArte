const express = require('express');
const router = express.Router();
const artController = require('../controllers/artController');

router.get('/', artController.getAll);
router.get('/:id', artController.getById);
router.post('/', artController.create);
router.put('/:id', artController.updateById);
router.delete('/:id', artController.deleteById);

module.exports = router;

