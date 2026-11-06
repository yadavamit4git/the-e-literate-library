import express from 'express';

import {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  getBookById
} from '../controller/bookcontroller.js';

import {
  verifyToken,
  verifyAdmin
} from '../middleware/authmiddleware.js';

const router = express.Router();

// Public: All books can be viewed
router.get('/books', getBooks);
router.get('/books/:id', getBookById);

// Admin only: Book management
router.post('/books', verifyToken, verifyAdmin, addBook);
router.put('/books/:id', verifyToken, verifyAdmin, updateBook);
router.delete('/books/:id', verifyToken, verifyAdmin, deleteBook);

export default router;