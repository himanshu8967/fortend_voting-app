import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CandidateList from '../components/CandidateList';
import { getAuthToken } from '../util/auth';

const CandidateListPage = () => {
  const candidates = useLoaderData(); // Get the candidate data from the loader

  return (
    <div>
      <CandidateList candidates={candidates} />
    </div>
  );
};

export default CandidateListPage;

// Loader function for fetching candidate list
export async function loader() {
  const token = getAuthToken(); // Function to retrieve the auth token (you should implement this)

  // If no token, redirect to the login page
  if (!token) {
    return redirect('/login'); // Redirect to login if no token is found
  }

  try {
    // Fetch the candidate data from the server
    const response = await fetch('http://localhost:3000/candidate', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,  // Include token for authentication
      },
    });

    // Handle 401 Unauthorized response
    if (response.status === 401) {
      return redirect('/login');  // Redirect to login if unauthorized
    }

    // If the response is not okay, handle the error
    if (!response.ok) {
      throw json({ message: 'Failed to load candidates' }, { status: response.status });
    }

    // Parse and return the JSON data
    const data = await response.json();
    
    // Assuming the response contains a list of candidates
    return data;
    console.log(data);

  } catch (error) {
    // Handle network or other errors
    console.error('Error loading candidates:', error);
    throw json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
