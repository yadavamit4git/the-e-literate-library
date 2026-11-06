
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Courses() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/books');
        setBooks(res.data);
        setFilteredBooks(res.data);
      } catch (error) {
        console.log('Error fetching books:', error);
      }
    };

    getBooks();
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const filterBooks = (query, category) => {
    let filtered = books.filter((item) => {
      const title = (item.title || '').toLowerCase();
      return title.includes(query.toLowerCase());
    });

    if (category) {
      filtered = filtered.filter((item) =>
        (item.category || '').toLowerCase().includes(category.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    filterBooks(value, categoryFilter);
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategoryFilter(value);
    filterBooks(searchQuery, value);
  };

  const handleSortLowToHigh = () => {
    setFilteredBooks([...filteredBooks].sort(
      (a, b) => Number(a.price) - Number(b.price)
    ));
  };

  const handleSortHighToLow = () => {
    setFilteredBooks([...filteredBooks].sort(
      (a, b) => Number(b.price) - Number(a.price)
    ));
  };

  const handleBookNow = (item) => {
    if (isLoggedIn) {
      navigate(`/bookdetails/${item._id}`);
    } else {
      setShowModal(true);
    }
  };

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

  return (
    <>
      <div className="w-[90%] mx-auto">

        {/* Heading */}
        <div className="min-h-[350px] flex flex-col items-center justify-center text-center pt-20">
          <h1 className="text-2xl font-semibold">
            We are delighted to have you{' '}
            <span className="text-red-500">Here!</span>
          </h1>

          <p className="mt-6 max-w-3xl">
            An order book is an electronic list of buy and sell orders for a
            security or other instrument organized by price level. Order books
            are used by almost every exchange for various assets.
          </p>
        </div>

        {/* Search */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            className="p-3 border rounded-md outline-none w-full sm:w-1/2"
            placeholder="Search by title"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Sorting and Category */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">

          <div className="flex gap-3">
            <button
              onClick={handleSortLowToHigh}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
            >
              Low to High
            </button>

            <button
              onClick={handleSortHighToLow}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
            >
              High to Low
            </button>
          </div>

          <select
            onChange={handleCategoryChange}
            value={categoryFilter}
            className="p-2 border rounded-md outline-none"
          >
            <option value="">All Categories</option>
            <option value="Sci Fci">Sci Fci</option>
            <option value="Historical">Historical</option>
            <option value="Horror">Horror</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Mystery">Mystery</option>
            <option value="Biography">Biography</option>
          </select>

        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">

          {filteredBooks.length > 0 ? (
            filteredBooks.map((item) => (
              <div
                key={item._id}
                className="w-full max-w-sm border p-5 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col items-center"
                onClick={() => handleBookNow(item)}
              >

                <img
                  className="w-44 h-64 object-cover rounded-md"
                  src={getImageUrl(item.image)}
                  alt={item.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://placehold.co/300x400?text=Book+Image';
                  }}
                />

                <h2 className="text-xl font-bold mt-4 text-center">
                  {item.title}
                </h2>

                <p className="mt-2 text-center text-gray-600">
                  {item.description}
                </p>

                <p className="mt-3 font-semibold text-gray-700">
                  Price: ₹ {item.price}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookNow(item);
                  }}
                  className="mt-4 bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-700"
                >
                  Book Now
                </button>

              </div>
            ))
          ) : (
            <p className="text-center col-span-full">
              No books found.
            </p>
          )}

        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-10 mb-8">
          <Link to="/">
            <button className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-700">
              Back
            </button>
          </Link>
        </div>

      </div>

      {/* Login Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

          <div className="bg-white p-6 rounded-lg shadow-lg mx-4">
            <h2 className="text-2xl font-bold mb-4">
              Please Login First
            </h2>

            <p className="mb-4">
              You need to be logged in to book a course.
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Close
              </button>

              <Link to="/login">
                <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700">
                  Login
                </button>
              </Link>

            </div>
          </div>

        </div>
      )}

    </>
  );
}

export default Courses;
