import React from 'react';
import ChangePassword from '../components/ChangePAssword';
import { getAuthToken } from '../util/auth';


const ChangePasswordPage = () => {
  return (
    <div>
      <ChangePassword />
    </div>
  );
};

export default ChangePasswordPage;  // Default export



export async function action({ request }) {
  const data = await request.formData();

  const passwordData = {
    currentPassword: data.get('currentPassword'),
    newPassword: data.get('newPassword'),
  };
  console.log("save")
  const token = getAuthToken();

  const response = await fetch('http://localhost:3000/user/profile/password', {
    method: 'PUT',  // Use PUT for update
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(passwordData),
  });

  if (response.status === 401) {
    return response;
  }

  if (!response.ok) {
    return json({ message: 'Internal Server Error. Could not change password. Please try again later.  ' }, { status: 500 });
  }

  if (response.status === 200) {
    return redirect('/');
  }
}

