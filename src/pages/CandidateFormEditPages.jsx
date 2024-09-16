import React from "react";
import { useLoaderData } from "react-router-dom";
import CandidateForm from "../components/CandidateForm";
import { json, redirect } from "react-router-dom"; // Corrected imports
import { getAuthToken } from "../util/auth"; // Importing the auth function

const CandidateFormEditPages = () => {
  const candidate = useLoaderData(); // Candidate data fetched by loader

  return (
    <div>
      <CandidateForm candidate={candidate}  method='put'/> {/* Pass candidate data to form */}
    </div>
  );
};

export default CandidateFormEditPages;

export async function candidateLoader({ params }) {
  const token = getAuthToken(); // Get the token
  const { candidateID } = params; // Extract the candidate ID

  const response = await fetch(`http://localhost:3000/candidate/${candidateID}`, {
    method: 'GET', // Get candidate data to populate the form
    headers: {
      Authorization: `Bearer ${token}`, // Correct token format
    },
  });

  if (response.status === 401) {
    return redirect("/login"); // Redirect if not authenticated
  }

  if (!response.ok) {
    return json({ message: "Candidate not found" }, { status: 404 });
  }

  const candidate = await response.json();
  return json(candidate); // Return the candidate data to use in `useLoaderData`
}
