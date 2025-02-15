const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../middlewares/authMiddleware');
const { getAll, getById, create, updateById, deleteById } = require('../controllers/artController');
const { getAllUsers, getUserById, updateUserById, deleteUserById } = require('../controllers/userController');
const { getAllOrders, getOrder, updateOrder } = require('../controllers/orderController');

router.use(authenticateToken, requireAdmin);

// Rutas de usuarios
router.get('/users/', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUserById);
router.delete('/users/:id', deleteUserById);

// Rutas de obras de arte
router.get('/ks/', getAll);
router.get('/artworks/:id', getById);
router.post('/artworks/', create);
router.put('/artworks/:id', updateById);
router.delete('/artworks/:id', deleteById);

// Rutas de órdenes
router.get('/orders/', getAllOrders);
router.get('/orders/:id', getOrder);
router.put('/orders/:id', updateOrder);

module.exports = router;

