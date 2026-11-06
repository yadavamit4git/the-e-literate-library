
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();

    setError('');

    if (!name || !email || !password) {
      setError('Please fill all fields');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        'http://localhost:5000/api/signup',
        {
          name,
          email,
          password
        }
      );

      console.log('Signup Response:', response.data);

      setName('');
      setEmail('');
      setPassword('');

      setIsSubmitted(true);

    } catch (error) {
      console.log('Signup Error:', error);

      setError(
        error.response?.data?.message ||
        error.message ||
        'Something went wrong!'
      );

    } finally {
      setLoading(false);
    }
  };

  // Close Popup
  const closePopup = () => {
    setIsSubmitted(false);
    setError('');
  };

  return (
    <>
      <div
        className="text-bold flex h-screen items-center justify-center mr-20 ml-20"
        style={{
          backgroundImage: `url('https://i.fbcd.co/products/resized/resized-750-500/a-beautiful-background-for-the-worlds-book-day-4-962198fbbc65904d3d2fb6eefa5fcc23636761b27ac0fe618b00aa4862fa1731.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="w-[600px] p-6 rounded-lg">
          <div className="modal-box bg-slate-500 text-white flex flex-col items-center">

            <form onSubmit={handleSignup}>

              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg">Sign up</h3>

              <div className="mt-4 space-y-2">

                <span>Name</span>
                <br />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your first name"
                  className="w-80 px-3 py-1 text-black rounded-md outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <br />

                <span>Email</span>
                <br />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-80 px-3 py-1 text-black rounded-md outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <br />

                <span>Password</span>
                <br />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-80 px-3 py-1 text-black rounded-md outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

              </div>

              <div className="flex gap-20 items-center mt-16">

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-red-400 text-white rounded-md px-3 py-1 hover:bg-red-800 duration-200 disabled:opacity-50"
                >
                  {loading ? 'Please wait...' : 'Signup'}
                </button>

                <p>
                  Have an account?{' '}
                  <Link
                    to="/"
                    className="underline text-yellow-200 cursor-pointer"
                  >
                    Home
                  </Link>
                </p>

              </div>

            </form>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {isSubmitted && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50"
          onClick={closePopup}
        >
          <div
            className="bg-white p-8 rounded-lg text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-bold text-lg text-green-500">
              Signup Successful!
            </h2>

            <p>Your account has been created successfully.</p>

            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {error && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50"
          onClick={closePopup}
        >
          <div
            className="bg-white p-8 rounded-lg text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-bold text-lg text-red-500">
              Signup Failed!
            </h2>

            <p className="text-red-600">{error}</p>

            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </>
  );
}

export default Signup;