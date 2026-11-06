
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Freebook() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/books');
        setBooks(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.log('Error fetching books:', error);
      }
    };

    getBooks();
  }, []);

  const handleBookNow = (item) => {
    navigate(`/bookdetails/${item._id}`);
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

  return (
    <>
      <div className="w-[90%] max-w-7xl mx-auto py-10">

        <h2 className="text-2xl font-bold text-center mb-8">
          Explore Our Books
        </h2>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {books.length > 0 ? (
            books.slice(0, 6).map((item) => (

              <div
                key={item._id}
                className="border rounded-xl p-5 shadow-md hover:shadow-xl transition duration-300 flex flex-col items-center"
              >

                {/* Book Image */}
                <img
                  src={getImageUrl(item.image)}
                  alt={item.title}
                  className="w-full h-64 object-contain bg-gray-50 rounded-lg"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      'https://placehold.co/300x400?text=Book+Image';
                  }}
                />

                {/* Book Details */}
                <h2 className="text-xl font-bold mt-4 text-center">
                  {item.title}
                </h2>

                <p className="mt-2 text-gray-600 text-center">
                  {item.description}
                </p>

                <p className="mt-3 font-semibold text-gray-700">
                  Price: ₹{item.price}
                </p>

                {/* Order Button */}
                <button
                  onClick={() => handleBookNow(item)}
                  className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 duration-300"
                >
                  Order
                </button>

              </div>

            ))
          ) : (
            <p className="text-center col-span-full">
              No books available.
            </p>
          )}

        </div>

      </div>
    </>
  );
}

export default Freebook;
