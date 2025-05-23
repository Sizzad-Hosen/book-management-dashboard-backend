import { IBook } from "./book.interface"
import BookModel from "./book.model"



const createBookInToDB = async(payload:IBook)=>{
const result = await BookModel.create(payload);

return result;



}

const getSingelBookInToDB= async(id:string)=>{

  const result = BookModel.findById(id);
  return result;


}


const  getALLBookInTOBD = async()=>{
 
    const result =await BookModel.find();

  return result;

}
const  deleteBookInToDB= async(id:string)=>{
const result = await BookModel.findById(id)
return result

}

const updateBookInToDB = async(id:string,payload:IBook)=>{

  const result = await BookModel.updateOne({payload,id});

  return result;
}



export const searchBooks = async (filters: {

  title?: string;
  author?: string;
  minPrice?: number;
  maxPrice?: number;

}) => {

  const query: any = {};

  if (filters.title) {
    query.title = { $regex: filters.title, $options: 'i' }; // case-insensitive search
  }

  if (filters.author) {
    query.author = { $regex: filters.author, $options: 'i' };
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    query.price = {};
    if (filters.minPrice !== undefined) {
      query.price.$gte = filters.minPrice;
    }
    if (filters.maxPrice !== undefined) {
      query.price.$lte = filters.maxPrice;
    }
  }

  return await BookModel.find(query);
};


export const BookServices = {
    createBookInToDB,
    getSingelBookInToDB,
    getALLBookInTOBD,
    deleteBookInToDB,
    updateBookInToDB,
    searchBooks
}