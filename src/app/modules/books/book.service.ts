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


export const BookServices = {
    createBookInToDB,
    getSingelBookInToDB,
    getALLBookInTOBD,
    deleteBookInToDB,
    updateBookInToDB
}