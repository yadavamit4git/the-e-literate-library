
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  name: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  description: {
    type: String
  }
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
