import React from 'react';
import Login from '../components/Login';
import { json, redirect } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;

export async function action({ request }) {
  const data = await request.formData();

  const userData = {
    aadharCardNumber: data.get('aadharCardNumber'),
    password: data.get('password'),
  };

  const response = await fetch('http://localhost:3000/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (response.status === 400) {
    return response;
  }

  if (!response.ok) {
    return json({ message: 'Could not login.' }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem('token', token);

  return redirect('/');
}
