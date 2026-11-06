
import React from 'react';
import { FaBook } from "react-icons/fa6";

function AboutUs() {
  return (
   <>
   <div className='flex justify-between mt-24 w-[88%] m-auto mb-11'>
    
    <div>
        <img className='w-[800px] rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg' src="https://png.pngtree.com/thumb_back/fh260/background/20230519/pngtree-more-than-a-dozen-old-books-are-sitting-on-a-wooden-image_2578104.jpg" alt="" />
    </div>
    <div className='w-9/12 ml-10 '>
        <h1 className='text-2xl text-center'><span className='text-red-600 font-bold'>Welcome to The E-Literate Librery</span></h1> <br />
        A book is a medium for recording information in the form of writing or images.  Modern books are typically in codex format, composed of many pages that are bound together and protected by a cover; they were preceded by several earlier formats, including the scroll and the tablet. The book publishing process is the series of steps involved in their creation and dissemination.
    </div>
   </div>
   <div className='flex justify-between mt-24 w-[88%] m-auto mb-11'>
    <div className='w-8/12 ml-7 '>
        <h1 className='text-2xl text-center'><span className='text-red-600 font-bold'>Welcome to The E-Literate Librery</span></h1> <br />
        Knowledge is power, and libraries have tons of that. We also have tons of free and premium images of books so that you can foster reading habits. Get these assets and create beautiful compositions that will be recorded in the annals of history.  
    </div>
    <div>
        <img className='w-[800px] rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg' src="https://thumbs.dreamstime.com/b/old-books-wooden-table-library-vintage-style-ai-generated-content-design-background-instagram-facebook-wall-323974717.jpg" alt="" />
    </div>
   </div>

<div className='flex gap-10 ml-12 mb-10'>
<div className="max-w-sm p-6 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-lg gap-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
<FaBook  className='text-4xl ' />
    <a href="#">
        <h5 className="text-center mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">24/7</h5>
    </a>
    <p className="mb-3 font-bold text-gray-500 dark:text-gray-400">We provide Book 24/7 hours. You can visit us anytime you want. We are always here for you. You can buy and read the book anytime you want.</p>
</div>
<div className="max-w-sm p-6 flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-lg items-center gap-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
<FaBook  className='text-4xl '/>
    <a href="#">
        <h5 className="text-center mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Free Course book</h5>
    </a>
    <p className="mb-5 font-bold text-gray-500 dark:text-gray-400">Here some books are free of cost. You can read and purchase it without paying any charge.</p>
</div>

<div className="max-w-sm p-6 flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-lg items-center gap-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
<FaBook  className='text-4xl '/>
    <a href="#">
        <h5 className="text-center mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Free Delivery</h5>
    </a>
    <p className="mb-3 font-bold text-gray-500 dark:text-gray-400">We provide free delivery system at our bookshop. There are no charges when you purchase online books.</p>
</div>
</div>
   </>
    
  );
}

export default AboutUs;