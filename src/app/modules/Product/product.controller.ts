import { Request, Response, NextFunction } from 'express';
import { ProductServices } from './product.service';
import sendResponse from '../../utilits/sendResponse';
import httpStatus from 'http-status';


export const createProductHandler = async (req: Request, res: Response, next: NextFunction) => {


    const product = await ProductServices.createProduct(req.body);

 
sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message:  'Product created successfully',
  data: product
})


 
};

export const getProductHandler = async (req: Request, res: Response, next: NextFunction) => {

    const product = await ProductServices.getProductById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

 

 sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message:  'Product retried successfully',
  data: product
})


 
};

export const getAllProductsHandler = async (_req: Request, res: Response, next: NextFunction) => {

    const products = await ProductServices.getAllProducts();
    res.status(200).json({
      success: true,
      data: products,
    });
 
    sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message:  'Product all retried successfully',
  data: products

})


};

export const updateProductStockHandler = async (req: Request, res: Response, next: NextFunction) => {

    const { stock } = req.body;

    const product = await ProductServices.updateProductStock(req.params.id, stock);

    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });


    sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message:  'Product updated successfully',
  data: product

    })
 
};

export const deleteProductHandler = async (req: Request, res: Response, next: NextFunction) => {

    const product = await ProductServices.deleteProduct(req.params.id);

    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

 
 sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message:  'Product all retried successfully',
  data: product
    })

};


export const ProductControllers = {
    createProductHandler,
    getAllProductsHandler,
    getProductHandler,
    deleteProductHandler,
    updateProductStockHandler
}