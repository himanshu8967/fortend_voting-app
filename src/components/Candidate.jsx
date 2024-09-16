import React from 'react';
import { FaUser, FaUserEdit, FaTrashAlt, FaVoteYea } from 'react-icons/fa';
import { Form, Link, useSubmit } from 'react-router-dom';

const Candidate = ({ name, party, age, candidateID }) => {
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure you want to delete this candidate?');

    if (proceed) {
      // Submit the delete request with candidateID
      submit(null, { method: 'delete', action: `/candidate/${candidateID}/delete` });
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg transition hover:shadow-2xl transform hover:scale-105 duration-300 ease-in-out p-5 sm:p-6 m-4 max-w-sm sm:max-w-md mx-auto">
      {/* Profile Icon */}
      <div className="flex justify-center">
        <div className="bg-indigo-100 h-28 w-28 sm:h-32 sm:w-32 rounded-full border-4 border-indigo-200 shadow-lg flex items-center justify-center mb-4">
          <FaUser className="text-indigo-600 text-5xl sm:text-6xl" />
        </div>
      </div>

      {/* Candidate Info */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{name}</h2>
        <p className="text-md sm:text-lg text-gray-700 mb-1">{party}</p>
        <p className="text-sm sm:text-md text-gray-500">Age: {age}</p>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-around space-x-3">
        {/* Edit Button */}
        <Link to={`/candidateform/${candidateID}/edit`}>
          <button
            aria-label="Edit candidate"
            className="bg-indigo-500 text-white font-medium px-4 py-2 rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200 ease-in-out flex items-center"
          >
            <FaUserEdit className="mr-2" />
            Edit
          </button>
        </Link>

        {/* Delete Button */}
        <button
          aria-label="Delete candidate"
          onClick={startDeleteHandler} // Invoke delete handler
          className="bg-red-500 text-white font-medium px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-200 ease-in-out flex items-center"
        >
          <FaTrashAlt className="mr-2" />
          Delete
        </button>

        {/* Vote Button */}
        <Form method="post" action={`/candidate/vote/${candidateID}`} >
          <button
            type="submit" // This triggers the form submission
            aria-label="Vote for candidate"
            className="bg-green-500 text-white font-medium px-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-200 ease-in-out flex items-center"
          >
            <FaVoteYea className="mr-2" />
            Vote
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Candidate;
