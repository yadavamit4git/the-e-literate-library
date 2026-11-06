import React from 'react';
import { useNavigate } from 'react-router-dom';

function Banner() {
  const navigate = useNavigate();

  return (
    <>
      <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 flex md:flex-row my-20'>
        <div className='w-1/2'>
          <div className='space-y-12'>
            <h1 className='text-4xl font-bold'>
              Hello, welcome here to learn something <span className='text-red-500'>new everyday....</span>
            </h1>
            <p className='text-xl'>
              A bookstore is a retail store that sells books, and is also known as a bookshop. Some bookstores may also sell other items, such as CDs or coffee.
            </p>
            <br />
          </div>
          <button
            className="btn mt-6 btn-secondary hover:bg-red-500 hover:text-white transition-all duration-300"
            onClick={() => navigate('/course')}
          >
            More Books
          </button>
        </div>
        <div className='w-1/2'>
          <img
            className="w-65 h-80 ml-32 mt-5 mb-5 rounded-3xl transform hover:translate-x-8 transition-all duration-500 ease-in-out"
            src="Banner.jpeg"
            alt="Banner"
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
