import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Ensure this path is correct
import RootLayout from './pages/Root';    // Ensure this path is correct
import SignUpPage, { action as signupAction } from './pages/SignUpPage'; // Ensure this path is correct
import LoginPage, { action as loginAction } from './pages/LoginPage';
import ProfilePage, { loader as profilLoader } from './pages/ProfilePage';
import ChangePasswordPage, { action as changepasswordAction } from './pages/ChangePasswordPage';
import CandidateListPage, { loader as candidatelistLoder } from './pages/CandidateListPage';
import { action as logoutAction } from './pages/LogoutPage';
import { tokenLoader } from './util/auth';
import CandidateFormPage, { action as CandidateFormAction } from './pages/CandidateFormPage';
import CandidateFormEditPages, { candidateLoader } from './pages/CandidateFormEditPages';
import CandidateUpdatePage, { action as candidateupdateAction } from './pages/CandidateUpdatePage';
import { action as candidateDeleteAction } from './pages/CandidateDeletePage'; // Import delete action
import LiveVotingPage, { loader as livevotingLoader } from './pages/LiveVotingPage';
import { action as voteAction } from './pages/VotePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/signup', element: <SignUpPage />, action: signupAction },
      { path: '/login', element: <LoginPage />, action: loginAction },
      { path: '/profile', element: <ProfilePage />, loader: profilLoader },
      { path: '/change-password', element: <ChangePasswordPage />, action: changepasswordAction },
      { path: '/candidatelist', element: <CandidateListPage />, loader: candidatelistLoder },
      { path: '/logout', action: logoutAction },
      { path: '/candidateform', element: <CandidateFormPage />, action: CandidateFormAction },
      { path: '/candidateform/:candidateID/edit', element: <CandidateFormEditPages />, loader: candidateLoader },
      { path: '/candidate/:candidateID/delete', action: candidateDeleteAction },
      { path: '/candidate/:candidateID/update', element: <CandidateUpdatePage />, action: candidateupdateAction },
      { path: '/livevoting', element: <LiveVotingPage />, loader: livevotingLoader },
      { path: '/candidate/vote/:candidateID', action: voteAction }, // Ensure this is correct
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
