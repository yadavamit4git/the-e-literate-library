import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ setIsLoggedIn }) {
  // State for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(''); // Track errors
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });
      console.log(response.data);

      // Store the token in local storage
      localStorage.setItem('token', response.data.token);

      // Update login status
      setIsLoggedIn(true);

      // Display login success message
      toast.success('Login Successfully!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Clear the state variables
      setEmail('');
      setPassword('');

      // Close the modal after 2 seconds
      setTimeout(() => {
        setIsModalOpen(false);
        navigate('/'); // Redirect to home page or any other page
      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
      toast.error('Login Failed!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setError('');
  };

  return (
    <div>
      <ToastContainer />
      {/* Button to open the modal */}
      <button onClick={() => setIsModalOpen(true)}>
        <div className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer">
          Login
        </div>
      </button>

      {isModalOpen && (
        <dialog id="my_modal_3" className="modal" open>
          <div className="modal-box">
            <form method="dialog" onSubmit={handleSubmit}>
              <button 
                type="button" 
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" 
                onClick={closeModal} // Close modal on click
              >
                ✕
              </button>
              <h3 className="font-bold text-lg">Login!</h3>
              <div className='mt-4 space-y-2'>
                <span>Email</span>
                <br />
                <input
                  type="email"
                  placeholder='enter your email'
                  name='email'
                  className='w-80 px-3 py-1 order rounded-md outline-none'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <span>Password</span>
                <br />
                <input
                  type="password"
                  placeholder='enter your password'
                  name='password'
                  className='w-80 px-3 py-1 order rounded-md outline-none'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='flex justify-around mt-4'>
                <button className='bg-red-400 text-white rounded-md px-3 py-1 hover:bg-red-800 duration-200'>
                  Login
                </button>
                <p>
                  Not registered? {""}
                  <Link to="/signup" className='text-yellow-600'>
                    Signup
                  </Link>{""}
                </p>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default Login;