import mongoose, { Schema } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema: Schema<IBook> = new Schema(
  {

    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    isbn: {
      type: String,
      unique: true,
      sparse: true,
    },
    genre: {
      type: String,
    },
    publisher: {
      type: String,
    },
    series: {
      type: String,
    },
    language: {
      type: String,
    },
    format: {
      type: String,
      enum: ["hardcover", "paperback", "ebook"],
    },
    pageCount: {
      type: Number,
    },
    releaseDate: {
      type: Date,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image:{
      type:String,
       required: true,
     
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true, // auto-manages createdAt & updatedAt
  }
);

const BookModel = mongoose.model<IBook>("Book", bookSchema);

export default BookModel;
