import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ProductValidation } from './product.validation';
import { ProductServices } from './product.service';
import { ProductControllers } from './product.controller';




const router = express.Router();

// Create product with validation
router.post('/create-product', validateRequest(ProductValidation.createProductSchema), ProductControllers.createProductHandler);

// Get all products
router.get('/', ProductControllers.getAllProductsHandler);

// // Get product by ID
// router.get('/:id', ProductControllers.getProductHandler);

// // Update product stock (or you can expand to update other fields)
// router.patch('/:id/stock', ProductControllers.updateProductStockHandler);

// // Delete product
// router.delete('/:id', ProductControllers.deleteProductHandler);

export const ProductRoutes = router;
