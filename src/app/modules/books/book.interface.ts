import { Document } from "mongoose";

export interface IBook extends Document {

  title: string;
  author: string;
  isbn?: string;
  genre?: string;
  publisher?: string;
  series?: string;
  language?: string;
  format?: "hardcover" | "paperback" | "ebook";
  pageCount?: number;
  releaseDate?: Date;
  price: number;
  quantity: number;
  image:string;
  createdAt: Date;
  updatedAt: Date;
  
}
