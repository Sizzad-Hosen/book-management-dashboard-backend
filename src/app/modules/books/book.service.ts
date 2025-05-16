import { IBook } from "./book.interface"
import BookModel from "./book.model"



const createBookInToDB = async(payload:IBook)=>{
const result = await BookModel.create(payload);

return result;



}
const getSingelBookInToDB= async()=>{



}
const  getALLBookInTOBD = async()=>{
 
    const result = BookModel.find();

  return result;

}
const  deleteBookInToDB= async()=>{



}


export const BookServices = {
    createBookInToDB,
    getSingelBookInToDB,
    getALLBookInTOBD,
    deleteBookInToDB
}