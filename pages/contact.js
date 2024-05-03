// write a full contact us page that includes a webform for the user to fill out and email us that includes tailwind styling

import React from 'react';

  const ContactPage = () => {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Name:</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Email:</label>
            <input type="email" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Message:</label>
            <textarea className="w-full p-2 border border-gray-300 rounded"></textarea>
          </div>
          <button className="w-full p-2 bg-blue-500 text-white rounded">Submit</button>
        </form>
      </div>
    );
  }

export default ContactPage;


