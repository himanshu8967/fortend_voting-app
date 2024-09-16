
import React from 'react';
import CandidateCard from './CandidateCard';

// Define the type of props that the component expects
const LiveVotingResults = ({ candidates }) => {
  if (!candidates || candidates.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Live Voting Results</h1>
        <p className="text-center text-gray-500">No results available</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Live Voting Results</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {candidates.map((candidate, index) => (
          <CandidateCard
            key={candidate.id || index} // Use id if available, otherwise use index
            party={candidate.party}
            voteCount={candidate.count}
          />
        ))}
      </div>
    </div>
  );
};



export default LiveVotingResults;
