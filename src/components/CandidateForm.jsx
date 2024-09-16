import React, { useState } from 'react';
import { Form, useNavigation, useActionData, Link } from 'react-router-dom';

const CandidateForm = ({ candidate, method }) => {
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    party: false,
    age: false,
  });
  const [errors, setErrors] = useState({});
  const actionData = useActionData(); // To handle errors from the server-side action
  const navigation = useNavigation(); // To track form submission state

  const isSubmitting = navigation.state === 'submitting';

  // Handle field blur event (when a user touches a field)
  const handleBlur = (e) => {
    setTouchedFields({
      ...touchedFields,
      [e.target.name]: true, // Mark the field as touched
    });
  };

  // Client-side validation function
  const validateForm = (formData) => {
    let validationErrors = {};

    const name = formData.get('name');
    const party = formData.get('party');
    const age = formData.get('age');

    // Validate only touched fields
    if (!name && touchedFields.name) validationErrors.name = 'Name is required.';
    if (!party && touchedFields.party) validationErrors.party = 'Party is required.';
    if ((!age || isNaN(age) || age < 18) && touchedFields.age) validationErrors.age = 'Valid age (18+) is required.';

    return validationErrors;
  };

  const handleSubmit = (event) => {
    const formData = new FormData(event.target);
    const validationErrors = validateForm(formData);

    setErrors(validationErrors);

    // If there are errors, prevent form submission
    if (Object.keys(validationErrors).length > 0) {
      event.preventDefault();
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 pt-20">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10 lg:p-12 transition-transform transform hover:scale-105 ease-in-out duration-500">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-800 mb-4">
          {candidate ? 'Edit Candidate' : 'Add Candidate'}
        </h2>

        {/* Display server-side or client-side validation errors */}
        {(actionData?.message || Object.keys(errors).length > 0) && (
          <ul className="mb-4 text-red-500">
            {actionData?.message && <li>{actionData.message}</li>}
            {Object.values(errors).map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}

        <Form
          method={method} // Use method prop here
          action={candidate ? `/candidate/${candidate.id}/update` : '/candidateform'}
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          {/* Name Field */}
          <div>
            <label htmlFor="candidateName" className="block text-gray-700 font-semibold mb-1">Name</label>
            <input
              type="text"
              id="candidateName"
              name="name"
              required
              className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter candidate name"
              onBlur={handleBlur}
              defaultValue={candidate ? candidate.name : ''}
            />
            {errors.name && touchedFields.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Party Field */}
          <div>
            <label htmlFor="candidateParty" className="block text-gray-700 font-semibold mb-1">Party</label>
            <input
              type="text"
              id="candidateParty"
              name="party"
              className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.party ? 'border-red-500' : ''}`}
              placeholder="Enter candidate's party"
              onBlur={handleBlur}
              defaultValue={candidate ? candidate.party : ''}
            />
            {errors.party && touchedFields.party && <p className="text-red-500 text-sm">{errors.party}</p>}
          </div>

          {/* Age Field */}
          <div>
            <label htmlFor="candidateAge" className="block text-gray-700 font-semibold mb-1">Age</label>
            <input
              type="number"
              id="candidateAge"
              name="age"
              className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.age ? 'border-red-500' : ''}`}
              placeholder="Enter candidate's age"
              onBlur={handleBlur}
              defaultValue={candidate ? candidate.age : ''}
              min="18"
            />
            {errors.age && touchedFields.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : (candidate ? 'Update Candidate' : 'Add Candidate')}
          </button>
        </Form>

        {/* Bottom Text with Link */}
        <div className="mt-4 text-center text-gray-600 text-sm">
          <p>Already added a candidate? <Link to="/candidatelist" className="text-indigo-500 hover:text-indigo-600 font-semibold transition duration-300">View Candidates</Link></p>
        </div>
      </div>
    </div>
  );
};

export default CandidateForm;
