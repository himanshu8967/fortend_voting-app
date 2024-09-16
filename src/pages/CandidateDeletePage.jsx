import { json, redirect } from 'react-router-dom';
import { getAuthToken } from '../util/auth'; // Assuming this function fetches the token

export async function action({ params, request }) {
  const candidateID = params.candidateID; // Extract candidateID from params
  const token = getAuthToken(); // Fetch the token

  // Send DELETE request to delete the candidate by ID
  const response = await fetch(`http://localhost:3000/candidate/${candidateID}`, {
    method: 'DELETE', // Use DELETE method
    headers: {
      Authorization: `Bearer ${token}`, // Include token in the Authorization header
    },
  });

  // Check if the response is not ok
  if (!response.ok) {
    if (response.status === 403) {
      return json({ message: 'You are not authorized to delete this candidate.' }, { status: 403 });
    }
    if (response.status === 404) {
      return json({ message: 'Candidate not found.' }, { status: 404 });
    }
    return json({ message: 'Failed to delete candidate.' }, { status: 500 });
  }

  // Redirect to candidate list after successful deletion
  return redirect('/candidatelist');
}
