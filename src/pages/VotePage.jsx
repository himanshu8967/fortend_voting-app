import { json, redirect } from 'react-router-dom';
import { getAuthToken } from '../util/auth';

export async function action({ params }) {
  const { candidateID } = params; // Destructure candidateID from params
  const token = getAuthToken();

  try {
    const response = await fetch(`http://localhost:3000/candidate/vote/${candidateID}`, { // Ensure URL matches backend route
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // Add token for authorization
        'Content-Type': 'application/json', // Specify JSON content type
      },
    });

    if (response.ok) {
      // Redirect to the candidatelist page upon successful voting
      return redirect('/candidatelist');
    } else {
      // Handle errors returned from the server
      const contentType = response.headers.get('Content-Type');
      let errorMessage = 'An unknown error occurred';

      if (contentType && contentType.includes('application/json')) {
        // Parse JSON error message if available
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } else {
        // Handle HTML or other unexpected content types
        const errorText = await response.text();
        errorMessage = `Error: ${errorText}`;
      }

      // Return error message and status code
      return json({ message: errorMessage }, { status: response.status });
    }
  } catch (error) {
    // Log error and return internal server error message
    console.error('Error voting:', error);
    return json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
