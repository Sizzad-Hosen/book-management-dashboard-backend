import { IProduct } from "./product.interface";
import { Product } from "./product.model";


export const createProduct = async (payload:IProduct) => {

  const product = await Product.create(payload);
  return product;
};

export const getProductById = async (productId: string) => {

  return Product.findById(productId);

};

export const getAllProducts = async () => {

  return Product.find();

};

export const updateProductStock = async (productId: string, payload:IProduct) => {

  return Product.findByIdAndUpdate(productId, payload, { new: true });

};

export const deleteProduct = async (productId: string) => {

  return Product.findByIdAndDelete(productId);

};


export const ProductServices = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductStock,
    deleteProduct
}