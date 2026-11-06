import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookDetails();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleBookNow = () => {
    alert(`Booked ${quantity} copies of ${book.title}`);
  };

  const totalPrice = book.price * quantity;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 mt-16">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">{book.title}</h1>
        <div className="flex flex-col md:flex-row">
          <img className="w-64 h-96 object-cover rounded-md mx-auto md:mx-0" src={book.image} alt={book.title} />
          <div className="md:ml-8 mt-4 md:mt-0">
            <p className="text-xl mb-4"><strong>Author:</strong> {book.author}</p>
            <p className="text-xl mb-4"><strong>Category:</strong> {book.category}</p>
            <p className="text-xl mb-4"><strong>Price:</strong> ₹{book.price}</p>
            <div className="mb-4">
              <label className="block text-xl mb-2" htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-20 p-2 border rounded-md outline-none"
                min="1"
              />
            </div>
            <p className="text-xl mb-4"><strong>Total Price:</strong> ₹{totalPrice}</p>
            <button
              onClick={handleBookNow}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 duration-300"
            >
              Book Now
            </button>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">About this Book</h2>
          <p className="text-lg">{book.description}</p>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;