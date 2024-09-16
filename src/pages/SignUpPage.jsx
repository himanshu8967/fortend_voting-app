import React from 'react';
import Signup from '../components/Signup';
import { json, redirect } from 'react-router-dom';

const SignUpPage = () => {
  return (
    <div>
      <Signup />
    </div>
  );
};

export default SignUpPage;

export async function action({ request }) {
  const data = await request.formData();

  const userData = {
    name: data.get('name'),
    age: data.get('age'),
    email: data.get('email'),
    mobile: data.get('mobile'),
    address: data.get('address'),
    aadharCardNumber: data.get('aadharCardNumber'),
    password: data.get('password'),
    role: data.get('role'),
  };

  try {
    const response = await fetch('http://localhost:3000/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.status === 400 ) {
      return response;
    }
  
    if (!response.ok) {
      throw json({ message: 'Could not sign up.' }, { status: 500 });
    }

    const resData = await response.json();
    const token = resData.token;

    localStorage.setItem('token', token);

    return redirect('/');
  } catch (err) {
    return json({ message: err.message }, { status: 500 });
  }
}