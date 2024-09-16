import React, { useState } from 'react';
import { useNavigate, Form, Link } from 'react-router-dom';
import { FaKey, FaLock } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    aadharCardNumber: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.aadharCardNumber || !/^\d{12}$/.test(formData.aadharCardNumber))
      newErrors.aadharCardNumber = 'A valid 12-digit Aadhar Card Number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    navigate('/'); // Navigate to a different page or home
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 pt-20">
      <div className="bg-white rounded-lg shadow-lg p-8 sm:p-10 md:p-12 lg:p-14 max-w-md w-full transition-transform transform hover:scale-105 ease-in-out duration-500">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">Login</h2>
        <Form method="post" className="space-y-6">
          {/* Aadhar Card Number */}
          <div className="relative">
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="aadharCardNumber">
              Aadhar Card Number
            </label>
            <div className="flex items-center border rounded-lg bg-gray-100 p-3 transition-all duration-300 ease-in-out focus-within:border-indigo-500 hover:border-indigo-600">
              <FaKey className="text-gray-600 mr-3 transition-transform duration-300 ease-in-out transform hover:scale-110" />
              <input
                type="number"
                id="aadharCardNumber"
                name="aadharCardNumber"
                value={formData.aadharCardNumber}
                onChange={handleChange}
                className="w-full bg-transparent border-none outline-none focus:ring-0 transition-all duration-300 ease-in-out"
                placeholder="Enter your Aadhar Card Number"
                required
              />
            </div>
            {errors.aadharCardNumber && <p className="text-red-600 text-sm mt-1">{errors.aadharCardNumber}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <div className="flex items-center border rounded-lg bg-gray-100 p-3 transition-all duration-300 ease-in-out focus-within:border-indigo-500 hover:border-indigo-600">
              <FaLock className="text-gray-600 mr-3 transition-transform duration-300 ease-in-out transform hover:scale-110" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent border-none outline-none focus:ring-0 transition-all duration-300 ease-in-out"
                placeholder="Enter your password"
                required
              />
            </div>
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300 ease-in-out"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300 ease-in-out"
            >
              Cancel
            </button>
          </div>
        </Form>

        {/* New User Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-lg font-medium">
            New User?{' '}
            <Link
              to="/signup"
              className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-300 ease-in-out relative group"
            >
              SignUp
              {/* Adding underline effect on hover */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-indigo-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
