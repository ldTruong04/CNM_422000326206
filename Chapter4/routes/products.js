const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.index);
router.get('/new', productsController.new);
router.post('/', productsController.create);
router.get('/:id/edit', productsController.edit);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.delete);

module.exports = router;
