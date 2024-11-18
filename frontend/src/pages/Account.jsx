import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import './Account.css';

const Account = () => {
  const { userRole, userEmail } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const displayRole = userRole === 'Customer' ? 'Customer' : 'Employee';

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!userEmail) {
        setLoading(false);
        setErrorMessage('No user email available');
        return;
      }

      try {
        const response = await fetch(
          `https://coogzoobackend.vercel.app/profile?email=${encodeURIComponent(userEmail)}&type=${encodeURIComponent(displayRole)}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data || !data.profile) {
          throw new Error('Invalid profile data received');
        }

        setProfileData(data.profile);
        setErrorMessage('');
      } catch (err) {
        console.error('Profile fetch error:', err);
        setErrorMessage(err.message || 'Failed to fetch profile data');
        setProfileData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userEmail, displayRole]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid date';
    }
  };

  const renderDashboardButtons = () => (
    <div className="account-header">
      {displayRole === 'Employee' && (
        <Link to="/employee-dashboard" className="dashboard-btn">
          Employee Dashboard
        </Link>
      )}
      {userRole === 'Manager' && (
        <Link to="/manager-dashboard" className="dashboard-btn">
          Manager Dashboard
        </Link>
      )}
    </div>
  );

  const renderProfileData = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (errorMessage) {
      return <p className="error-message">Error: {errorMessage}</p>;
    }

    if (!profileData) {
      return <p>No profile data available.</p>;
    }

    return (
      <>
        <p>ID: {profileData.ID || 'Not available'}</p>
        <p>First Name: {profileData.First_Name || 'Not available'}</p>
        <p>Last Name: {profileData.Last_Name || 'Not available'}</p>
        <p>Email: {profileData.email || 'Not available'}</p>
        <p>Phone: {profileData.phone || 'Not available'}</p>
        <p>Date of Birth: {formatDate(profileData.DateOfBirth)}</p>
      </>
    );
  };

  return (
    <div className="account-container">
      <div className="role-display">
        <h2>User Role: {userRole || "No role assigned"}</h2>
      </div>
      
      {renderDashboardButtons()}
      
      <div className="account-section">
        <h2>Profile Information</h2>
        {renderProfileData()}
      </div>
    </div>
  );
};

export default Account;