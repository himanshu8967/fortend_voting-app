import React, { useState } from 'react';
import { useNavigate, Form, useActionData, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaKey } from 'react-icons/fa';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    mobile: '',
    address: '',
    aadharCardNumber: '',
    password: '',
    role: 'voter'
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();
  const data = useActionData();

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.age || formData.age < 18) newErrors.age = 'Age must be 18 or older';
    if (!formData.email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email))
      newErrors.email = 'A valid email is required';
    if (!formData.mobile || !/^\+\d{1,3}\d{10}$/.test(formData.mobile))
      newErrors.mobile = 'Phone number must start with a country code and be followed by 10 digits';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.aadharCardNumber || !/^\d{12}$/.test(formData.aadharCardNumber))
      newErrors.aadharCardNumber = 'A valid 12-digit Aadhar Card Number is required';
    if (!formData.password || formData.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters long';
    // Remove role from validation if no specific validation is needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (touched[name]) validate();
  };

  const handleBlur = (e) => {
    setTouched({
      ...touched,
      [e.target.name]: true
    });
    validate();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', formData);
      navigate('/thankyou');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      age: '',
      email: '',
      mobile: '',
      address: '',
      aadharCardNumber: '',
      password: '',
      role: 'voter'
    });
    setErrors({});
    setTouched({});
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 py-20 mt-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 sm:p-8 md:p-10 lg:p-12 transition-transform transform hover:scale-105 ease-in-out duration-500">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-800 mb-5">Signup</h2>
        <Form method='post' className="space-y-5">
          {data && data.errors && (
            <ul className="mb-4">
              {Object.values(data.errors).map((err, index) => (
                <li key={index} className="text-red-600">{err}</li>
              ))}
            </ul>
          )}

          {/* Name */}
          <div className="relative">
            <label className="block text-gray-800 font-semibold mb-1" htmlFor="name">Name</label>
            <div className="flex items-center border rounded-lg bg-gray-200 p-2 focus-within:border-indigo-500 hover:border-indigo-600">
              <FaUser className="text-gray-600 mr-2" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full bg-transparent border-none outline-none focus:ring-0 ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Enter your name"
                required
              />
            </div>
            {touched.name && errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Age */}
          <div className="relative">
            <label className="block text-gray-800 font-semibold mb-1" htmlFor="age">Age</label>
            <div className="flex items-center border rounded-lg bg-gray-200 p-2 focus-within:border-indigo-500 hover:border-indigo-600">
              <FaUser className="text-gray-600 mr-2" />
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full bg-transparent border-none outline-none focus:ring-0 ${errors.age ? 'border-red-500' : ''}`}
                placeholder="Enter your age"
                required
              />
            </div>
            {touched.age && errors.age && <p className="text-red-600 text-sm mt-1">{errors.age}</p>}
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-gray-800 font-semibold mb-1" htmlFor="email">Email</label>
            <div className="flex items-center border rounded-lg bg-gray-200 p-2 focus-within:border-indigo-500 hover:border-indigo-600">
              <FaEnvelope className="text-gray-600 mr-2" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full bg-transparent border-none outline-none focus:ring-0 ${errors.email ? 'border-red-500' : ''}`}
                placeholder="Enter your email"
                required
              />
            </div>
            {touched.email && errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Mobile */}
          <div className="relative">
            <label className="block text-gray-800 font-semibold mb-1" htmlFor="mobile">Mobile Number</label>
            <div className="flex items-center border rounded-lg bg-gray-200 p-2 focus-within:border-indigo-500 hover:border-indigo-600">
              <FaPhone className="text-gray-600 mr-2" />
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full bg-transparent border-none outline-none focus:ring-0 ${errors.mobile ? 'border-red-500' : ''}`}
                placeholder="Enter your mobile number"
                required
              />
            </div>
            {touched.mobile && errors.mobile && <p className="text-red-600 text-sm mt-1">{errors.mobile}</p>}
          </div>

          {/* Address */}
          <div className="relative">
            <label className="block text-gray-800 font-semibold mb-1" htmlFor="address">Address</label>
            <div className="flex items-center border rounded-lg bg-gray-200 p-2 focus-within:border-indigo-500 hover:border-indigo-600">
              <FaMapMarkerAlt className="text-gray-600 mr-2" />
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full bg-transparent border-none outline-none focus:ring-0 ${errors.address ? 'border-red-500' : ''}`}
                placeholder="Enter your address"
                required
              />
            </div>
            {touched.address && errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
          </div>

          {/* Aadhar Card Number */}
          <div className="relative">
            <label className="block text-gray-800 font-semibold mb-1" htmlFor="aadharCardNumber">Aadhar Card Number</label>
            <div className="flex items-center border rounded-lg bg-gray-200 p-2 focus-within:border-indigo-500 hover:border-indigo-600">
              <FaKey className="text-gray-600 mr-2" />
              <input
                type="text"
                id="aadharCardNumber"
                name="aadharCardNumber"
                value={formData.aadharCardNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full bg-transparent border-none outline-none focus:ring-0 ${errors.aadharCardNumber ? 'border-red-500' : ''}`}
                placeholder="Enter your Aadhar Card Number"
                required
              />
            </div>
            {touched.aadharCardNumber && errors.aadharCardNumber && <p className="text-red-600 text-sm mt-1">{errors.aadharCardNumber}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-800 font-semibold mb-1" htmlFor="password">Password</label>
            <div className="flex items-center border rounded-lg bg-gray-200 p-2 focus-within:border-indigo-500 hover:border-indigo-600">
              <FaKey className="text-gray-600 mr-2" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full bg-transparent border-none outline-none focus:ring-0 ${errors.password ? 'border-red-500' : ''}`}
                placeholder="Enter your password"
                required
              />
            </div>
            {touched.password && errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Role */}
          <div className="relative">
            <label className="block text-gray-800 font-semibold mb-1" htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full bg-gray-200 border rounded-lg p-2 focus:border-indigo-500 ${errors.role ? 'border-red-500' : ''}`}
            >
              <option value="voter">Voter</option>
              <option value="admin">Admin</option>
            </select>
            {touched.role && errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-600"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
          </div>

          <p className="mt-4 text-center text-gray-700">
            Already have an account? <Link to="/login" className="text-indigo-500 hover:text-indigo-600">Login</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
