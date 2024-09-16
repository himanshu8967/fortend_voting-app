import React, { useState } from 'react';
import { Form, useActionData, useNavigation } from 'react-router-dom';
import { FaLock, FaKey } from 'react-icons/fa';

const ChangePassword = () => {
  const [errors, setErrors] = useState({});
  const actionData = useActionData();  // Server-side errors
  const navigation = useNavigation();  // Form submission state
  const isSubmitting = navigation.state === 'submitting';

  const handleValidation = (e) => {
    e.preventDefault();
    const currentPassword = e.target.currentPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;
  
    let validationErrors = {};
  
    if (!currentPassword) {
      validationErrors.currentPassword = 'Current password is required.';
    }
  
    if (newPassword.length < 6) {
      validationErrors.newPassword = 'New password must be at least 6 characters long.';
    }
  
    if (newPassword !== confirmPassword) {
      validationErrors.confirmPassword = 'New password and confirm password do not match.';
    }
  
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      e.target.submit();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 pt-20">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-6 md:p-8 lg:p-11 max-w-md w-full transition-transform transform hover:scale-105 ease-in-out duration-500">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-800 mb-4">Change Password</h2>

        {/* Display server-side errors */}
        {(actionData?.message || Object.keys(errors).length > 0) && (
          <ul className="mb-4 text-red-500">
            {actionData?.message && <li>{actionData.message}</li>}
            {Object.values(errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}

        {/* Password Change Form */}
        <Form method="post" action="/change-password" className="space-y-4" onSubmit={handleValidation}>

          <div>
            <label className=" text-gray-700 font-semibold mb-2 flex items-center">
              <FaLock className="text-indigo-500 mr-2" />
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your current password"
              required
              autoComplete='current-password'
            />
          </div>

          <div>
            <label className=" text-gray-700 font-semibold mb-2 flex items-center">
              <FaKey className="text-indigo-500 mr-2" />
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a new password"
              required
              autoComplete='new-password'
            />
          </div>

          <div>
            <label className=" text-gray-700 font-semibold mb-2 flex items-center">
              <FaKey className="text-indigo-500 mr-2" />
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your new password"
              required
              autoComplete='new-password'
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : 'Change Password'}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
