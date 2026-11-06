
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [books, setBooks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');

  const initialForm = {
    name: '',
    title: '',
    author: '',
    price: '',
    category: '',
    image: '',
    description: ''
  };

  const [bookForm, setBookForm] = useState(initialForm);

  // JWT Authentication
  const getAuthConfig = () => {
    const token = localStorage.getItem('token');

    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  // Image URL
  const getImageUrl = (image) => {
    if (!image) return '';

    if (image.startsWith('http') || image.startsWith('data:')) {
      return image;
    }

    if (image.startsWith('/')) {
      return `http://localhost:5000${image}`;
    }

    return `http://localhost:5000/uploads/${image}`;
  };

  // Fetch Books
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/books'
      );

      setBooks(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching books:', error);
      setMessage('Unable to load books');
    }
  };

  // Form Change
  const handleFormChange = (e) => {
    setBookForm({
      ...bookForm,
      [e.target.name]: e.target.value
    });
  };

  // Add Book
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/books',
        bookForm,
        getAuthConfig()
      );

      setBooks(prev => [...prev, response.data]);
      setBookForm(initialForm);
      setMessage('Book added successfully!');
    } catch (error) {
      console.error('Error adding book:', error);
      setMessage(
        error.response?.data?.message || 'Error adding book'
      );
    }
  };

  // Edit Book
  const handleEdit = (book) => {
    setEditing(book._id);

    setBookForm({
      name: book.name || '',
      title: book.title || '',
      author: book.author || '',
      price: book.price || '',
      category: book.category || '',
      image: book.image || '',
      description: book.description || ''
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Update Book
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/books/${editing}`,
        bookForm,
        getAuthConfig()
      );

      setBooks(prev =>
        prev.map(book =>
          book._id === editing ? response.data : book
        )
      );

      setBookForm(initialForm);
      setEditing(null);
      setMessage('Book updated successfully!');
    } catch (error) {
      console.error('Error updating book:', error);
      setMessage(
        error.response?.data?.message || 'Error updating book'
      );
    }
  };

  // Cancel Edit
  const cancelEdit = () => {
    setEditing(null);
    setBookForm(initialForm);
  };

  // Delete Book
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this book?'
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/books/${id}`,
        getAuthConfig()
      );

      setBooks(prev => prev.filter(book => book._id !== id));
      setMessage('Book deleted successfully!');
    } catch (error) {
      console.error('Error deleting book:', error);
      setMessage(
        error.response?.data?.message || 'Error deleting book'
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 pt-28">

      {/* Responsive Grid CSS */}
      <style>{`
        .admin-book-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          align-items: stretch;
        }

        .admin-book-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-width: 0;
        }

        .admin-book-description {
          overflow-wrap: anywhere;
          flex-grow: 1;
        }

        @media (max-width: 900px) {
          .admin-book-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 600px) {
          .admin-book-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Book Management Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your books, inventory and details.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-gray-500">Total Books</p>
            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              {books.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-gray-500">Dashboard Status</p>
            <h2 className="text-xl font-bold text-green-600 mt-2">
              Active
            </h2>
          </div>

        </div>

        {/* Message */}
        {message && (
          <div className="mb-5 p-3 bg-blue-100 text-blue-700 rounded-lg">
            {message}

            <button
              onClick={() => setMessage('')}
              className="float-right font-bold"
            >
              X
            </button>
          </div>
        )}

        {/* Add / Update Form */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">

          <h2 className="text-xl font-bold text-slate-800 mb-6">
            {editing ? 'Update Book Details' : 'Add New Book'}
          </h2>

          <form onSubmit={editing ? handleUpdate : handleAdd}>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={bookForm.name}
                  onChange={handleFormChange}
                  placeholder="Enter name"
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Book Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={bookForm.title}
                  onChange={handleFormChange}
                  placeholder="Enter book title"
                  required
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={bookForm.author}
                  onChange={handleFormChange}
                  placeholder="Enter author"
                  required
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={bookForm.price}
                  onChange={handleFormChange}
                  placeholder="Enter price"
                  required
                  min="0"
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={bookForm.category}
                  onChange={handleFormChange}
                  placeholder="Enter category"
                  required
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={bookForm.image}
                  onChange={handleFormChange}
                  placeholder="Enter image URL"
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-semibold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={bookForm.description}
                  onChange={handleFormChange}
                  placeholder="Enter book description"
                  rows="4"
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

            </div>

            <div className="flex flex-wrap gap-3 mt-6">

              <button
                type="submit"
                className="bg-blue-600 text-white px-7 py-3 rounded-lg hover:bg-blue-700 font-semibold"
              >
                {editing ? 'Update Book' : 'Add Book'}
              </button>

              {editing && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="bg-gray-500 text-white px-7 py-3 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}

            </div>
          </form>
        </div>

        {/* All Books */}
        <div className="bg-white rounded-xl shadow-sm border p-6">

          <h2 className="text-xl font-bold text-slate-800 mb-6">
            All Books
          </h2>

          <div className="admin-book-grid">

            {books.length > 0 ? (

              books.map((book) => (

                <div
                  key={book._id}
                  className="admin-book-card border rounded-xl p-4 shadow-sm hover:shadow-lg transition"
                >

                  {book.image ? (
                    <img
                      src={getImageUrl(book.image)}
                      alt={book.title}
                      className="w-full h-56 object-contain bg-gray-50 rounded-lg mb-4"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          'https://placehold.co/300x400?text=Book+Image';
                      }}
                    />
                  ) : (
                    <div className="w-full h-56 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                      No Image
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-slate-800">
                    {book.title}
                  </h3>

                  <p className="text-gray-600 mt-1">
                    Author: {book.author}
                  </p>

                  <p className="text-gray-600">
                    Category: {book.category}
                  </p>

                  <p className="text-blue-600 font-bold mt-2">
                    ₹{book.price}
                  </p>

                  <p className="text-gray-500 text-sm mt-2 admin-book-description">
                    {book.description}
                  </p>

                  <div className="flex gap-2 mt-4">

                    <button
                      onClick={() => handleEdit(book)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(book._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))

            ) : (

              <p className="text-gray-500">
                No books available.
              </p>

            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default Admin;
