import express from 'express';
import { BookContollers } from './book.controller';
import validateRequest from '../../middleware/validateRequest';
import { BooksValidationSchema } from './book.validation';

const router = express.Router();


router.post('/create-book',validateRequest(BooksValidationSchema.CreatebookValidationSchema),BookContollers.createBookFromDB)

router.get('/',BookContollers.getAllBookFromDB)

router.get('/:id',BookContollers.getSingelBookFromDB)
router.delete('/:id', BookContollers.deleteBookFromDB)
router.put('/:id',validateRequest(BooksValidationSchema.UpdatedBookValidationSchema), BookContollers.updateBookFromDB)


export const BooksRoutes = router;
