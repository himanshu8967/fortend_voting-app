import React from 'react';
import { FaVoteYea } from 'react-icons/fa'; // Optional: icon for the card

const CandidateCard = ({ party, voteCount }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
            <div className="flex items-center space-x-4">
                <FaVoteYea className="text-blue-500 text-2xl" aria-hidden="true" /> {/* Optional: Icon */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">{party}</h2>
                    <p className="text-lg text-green-600">Votes: {voteCount}</p>
                </div>
            </div>
        </div>
    );
};


export default CandidateCard;
