import React from 'react';
import { FaVoteYea } from 'react-icons/fa';
import votingImage from '../assets/votingImage.jpg'; // Ensure this path is correct

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-r from-gray-100 via-white to-gray-200 min-h-screen pt-6 md:pt-20">
      {/* Main Heading */}
      <h1 className="text-3xl md:text-5xl font-bold text-center text-indigo-700 animate-fade-in mb-3 md:mb-5">
        Welcome to the Indian Voting Portal
      </h1>

      {/* Subheading */}
      <p className="text-base md:text-lg text-gray-700 text-center max-w-2xl mb-4 animate-slide-in">
        Your vote is your voice. Participate in building a stronger, more democratic India.
        Every vote counts!
      </p>

      {/* Image Section - Centered */}
      <div className="flex justify-center items-center w-full md:w-1/2 lg:w-1/3 mb-6">
        <img
          src={votingImage}
          alt="Indian Voting"
          className="rounded-lg shadow-md transition transform hover:scale-105 duration-300 ease-in-out"
          style={{ width: '100%', maxWidth: '400px' }}
        />
      </div>

      {/* Vote Icon with Text */}
      <div className="flex items-center gap-2 animate-bounce">
        <FaVoteYea className="text-indigo-700 text-3xl" />
        <span className="text-lg font-medium text-gray-800">Make your vote count!</span>
      </div>
    </div>
  );
};

export default Home;
