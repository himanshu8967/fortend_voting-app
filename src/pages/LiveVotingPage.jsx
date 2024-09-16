import React, { useState, useEffect } from 'react';
import LiveVotingResults from '../components/LiveVotingResults'; // Ensure this path is correct
import { json, redirect } from 'react-router-dom';

// Utility function to get the token (modify according to your storage method)
const getAuthToken = () => {
  return localStorage.getItem('authToken'); // Or however you store/retrieve your token
};

// LiveVotingPage Component
const LiveVotingPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch the voting results
  const fetchVotingResults = async () => {
    try {
      const response = await fetch('http://localhost:3000/candidate/vote/count', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // Include the token in the Authorization header
        },
      });

      if (response.status === 401) {
        // Redirect to login if unauthorized
        window.location.href = '/login';
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to load vote counts');
      }

      const data = await response.json();
      setCandidates(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching vote counts:', err);
      setError('Failed to fetch data');
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchVotingResults();

    // Set up polling every 10 seconds
    const intervalId = setInterval(fetchVotingResults, 10000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Pass the updated candidates data to the LiveVotingResults component */}
      <LiveVotingResults candidates={candidates} />
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};

// Loader function
export async function loader() {
  try {
    // Fetch the vote count data from the server
    const response = await fetch('http://localhost:3000/candidate/vote/count', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Include the token in the Authorization header
      },
    });

    if (response.status === 401) {
      // Redirect to login if unauthorized
      return redirect('/login');
    }

    if (!response.ok) {
      const error = await response.json();
      throw json({ message: error.message || 'Failed to load vote counts' }, { status: response.status });
    }

    // Extract JSON data
    const data = await response.json();

    // Return the data to be used in LiveVotingResults
    return data;

  } catch (error) {
    // Handle other errors such as network errors
    console.error('Error loading vote counts:', error);
    throw json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export default LiveVotingPage;
