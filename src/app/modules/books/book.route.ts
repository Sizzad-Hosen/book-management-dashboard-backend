import express from 'express';
import { BookContollers } from './book.controller';
import validateRequest from '../../middleware/validateRequest';
import { BookValidationSchemas } from './book.validation';


const router = express.Router();


router.post('/create-book',
    validateRequest(BookValidationSchemas.CreateBookValidationSchema),
    BookContollers.createBookFromDB)

router.get('/search', BookContollers.searchBooksHandler);


router.get('/',BookContollers.getAllBookFromDB)

router.get('/:id',BookContollers.getSingelBookFromDB)
router.delete('/:id', BookContollers.deleteBookFromDB)
router.put('/:id',validateRequest(BookValidationSchemas.UpdatedBookValidationSchema), BookContollers.updateBookFromDB)


export const BooksRoutes = router;
