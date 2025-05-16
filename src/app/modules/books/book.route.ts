import express from 'express';
import { BookContollers } from './book.controller';

const router = express.Router();


router.post('/create-book',BookContollers.createBookFromDB)

router.get('/',BookContollers.getAllBookFromDB)



export const BooksRoutes = router;
