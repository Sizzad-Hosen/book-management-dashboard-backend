import express from 'express';
import { BookContollers } from './book.controller';

const router = express.Router();


router.post('/create-book',BookContollers.createBookFromDB)

router.get('/',BookContollers.getAllBookFromDB)

router.get('/:id',BookContollers.getSingelBookFromDB)
router.delete('/:id', BookContollers.deleteBookFromDB)
router.put('/:id', BookContollers.updateBookFromDB)

export const BooksRoutes = router;
