import React from 'react';
import { useLoaderData, redirect, json } from 'react-router-dom';
import Profile from '../components/Profile';
import { getAuthToken } from '../util/auth';

// ProfilePage Component
const ProfilePage = () => {
  // Use the loader data
  const user = useLoaderData();

  return (
    <div>
      {/* Pass the user data to the Profile component as props */}
      <Profile user={user} />
    </div>
  );
};

// Loader function
export async function loader() {
  const token = getAuthToken();

  // If no token, redirect to the login page
  if (!token) {
    return redirect('/login'); // Redirect to login if no token is found
  }

  try {
    // Fetch the profile data from the server
    const response = await fetch('http://localhost:3000/user/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,  // Corrected syntax for Bearer token
      },
    });

    // Handle 401 Unauthorized response
    if (response.status === 401) {
      return redirect('/login');  // Redirect to login if unauthorized
    }

    // Check if the response is not okay
    if (!response.ok) {
      throw json({ message: 'Failed to load profile' }, { status: response.status });
    }

    // Extract JSON data
    const data = await response.json();

    // Return the user data to be used in ProfilePage
    return data.user;

  } catch (error) {
    // Handle other errors such as network errors
    console.error('Error loading profile:', error);
    throw json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export default ProfilePage;
