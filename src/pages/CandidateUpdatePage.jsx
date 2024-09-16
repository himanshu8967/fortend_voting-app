import React from 'react';
import CandidateForm from '../components/CandidateForm';
import { getAuthToken } from '../util/auth';
import { json, redirect } from 'react-router-dom';

const CandidateUpdatePage = () => {
  return (
    <div>
      <CandidateForm method='put' />
    </div>
  );
}

export default CandidateUpdatePage;

export async function action({ request, params }) {
  const data = await request.formData();

  const userData = {
    name: data.get('name'),
    age: data.get('age'),
    party: data.get('party'),
  };

  console.log(userData);

  const token = getAuthToken();
  if (!token) {
    return json({ message: 'Unauthorized. Please log in again.' }, { status: 401 });
  }

  // Get the candidate ID from the params (assuming it's passed in the route)
  const candidateID = params.candidateID;
  console.log(candidateID)

  if (!candidateID) {
    return json({ message: 'Candidate ID is missing.' }, { status: 400 });
  }

  // Construct the URL for updating the candidate
  const url = `http://localhost:3000/candidate/${candidateID}`;

  const response = await fetch(url, {
    method: 'PUT', // Use PUT for updating candidate
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });



  if (response.status === 403) {
    return json({ message: 'Forbidden. You do not have permission to access this resource.' }, { status: 403 });
  }

  if (!response.ok) {
    return json({ message: 'Internal Server Error.' }, { status: 500 });
  }

  if (response.status === 200) {
    return redirect('/candidatelist');
  }

  // Handle any unexpected statuses
  return json({ message: 'Unexpected Error.' }, { status: 500 });
}
