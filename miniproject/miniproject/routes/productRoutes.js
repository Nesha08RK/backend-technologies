const express = require('express');
const { getProducts, getProductById } = require('../controllers/productController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product listing and details APIs
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags: [Products]
 *     summary: Get all products
 *     description: Fetch all products from the e-commerce platform
 *     responses:
 *       200:
 *         description: Products fetched successfully
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Get product by ID
 *     description: Fetch a single product using its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *       404:
 *         description: Product not found
 */
router.get('/:id', getProductById);

module.exports = router;
