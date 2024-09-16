import React from 'react';
import CandidateForm from '../components/CandidateForm';
import { getAuthToken } from '../util/auth';
import { json, redirect } from 'react-router-dom';

const CandidateFormPage = () => {
  return (
    <div>
      <CandidateForm method='post' />
    </div>
  );
}

export default CandidateFormPage;



export async function action({ request }) {
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

  const response = await fetch('http://localhost:3000/candidate/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
  });

  console.log(response);

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