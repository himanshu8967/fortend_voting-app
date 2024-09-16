import React from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaUserTag } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';

// Define the Profile component
const Profile = ({ user }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 pt-20">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-103" style={{ maxHeight: 'calc(100vh - 2rem)' }}>
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-3 text-center relative">
          <FaUser className="text-5xl mx-auto mb-2 animate-pulse" />
          <h1 className="text-2xl font-extrabold mb-1">{user.name}</h1>
          <p className="text-base font-semibold">Age: {user.age}</p>
        </div>
        <div className="p-3 space-y-3">
          {[
            { icon: FaEnvelope, label: 'Email', value: user.email },
            { icon: FaPhone, label: 'Mobile', value: user.mobile },
            { icon: FaMapMarkerAlt, label: 'Address', value: user.address },
            { icon: FaIdCard, label: 'Aadhar Card Number', value: user.aadharCardNumber },
            { icon: FaUserTag, label: 'Role', value: user.role }
          ].map((item, index) => (
            <div key={index} className="flex items-center text-gray-800 hover:bg-gray-100 p-2 rounded-md transition-transform duration-200 transform hover:scale-103">
              <item.icon className="text-indigo-600 mr-3 text-xl" aria-hidden="true" />
              <div>
                <span className="font-semibold text-sm">{item.label}:</span>
                <span className="ml-1 text-sm">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 text-center space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-3">
            <Form action='/logout' method='post'>
              <button
                type="submit"
                className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-red-600 hover:shadow-2xl transition-all duration-200 transform hover:scale-103 w-full sm:w-auto"
                aria-label="Logout"
              >
                Logout
              </button>
            </Form>
            <Link to='/change-password'>
              <button className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-2xl transition-all duration-200 transform hover:scale-103 w-full sm:w-auto">
                Change Password
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Profile;
