import React from 'react';
import Candidate from './Candidate'; // Adjust the import path as needed

const CandidateList = ({ candidates }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 flex flex-col items-center mt-10 pt-14">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-white mb-8 text-center shadow-md px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-400 rounded-lg">
        Candidate List
      </h1>
      
      {/* Flexbox Layout for Candidates */}
      <div className="flex flex-wrap justify-center gap-8">
        {candidates.length > 0 ? (
          candidates.map(candidate => (
            <Candidate
              key={candidate.id}
              name={candidate.name}
              party={candidate.party}
              age={candidate.age}
              candidateID={candidate.id}
            />
          ))
        ) : (
          <p className="text-center text-gray-200 w-full text-xl">No candidates available</p>
        )}
      </div>
    </div>
  );
};

export default CandidateList;
