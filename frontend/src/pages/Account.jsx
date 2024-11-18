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
          throw new Error(`Failed to fetch profile (Status: ${response.status})`);
        }

        const data = await response.json();
        
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid response format');
        }

        if (!data.profile) {
          setProfileData(null);
          setErrorMessage('No profile data found');
          return;
        }

        setProfileData(data.profile);
        setErrorMessage('');

      } catch (error) {
        console.error('Profile fetch error:', error);
        setProfileData(null);
        setErrorMessage(error instanceof Error ? error.message : 'An error occurred while fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userEmail, displayRole]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid date';
    }
  };

  const renderDashboardButton = () => {
    if (displayRole === 'Employee') {
      return (
        <Link to="/employee-dashboard" className="dashboard-btn">
          Employee Dashboard
        </Link>
      );
    }
    if (userRole === 'Manager') {
      return (
        <Link to="/manager-dashboard" className="dashboard-btn">
          Manager Dashboard
        </Link>
      );
    }
    return null;
  };

  const renderProfileContent = () => {
    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    if (errorMessage) {
      return <div className="error-message">{errorMessage}</div>;
    }

    if (!profileData) {
      return <div className="no-data">No profile data available</div>;
    }

    return (
      <>
        <div className="profile-field">
          <span className="field-label">ID:</span>
          <span className="field-value">{profileData.ID || 'Not available'}</span>
        </div>
        <div className="profile-field">
          <span className="field-label">First Name:</span>
          <span className="field-value">{profileData.First_Name || 'Not available'}</span>
        </div>
        <div className="profile-field">
          <span className="field-label">Last Name:</span>
          <span className="field-value">{profileData.Last_Name || 'Not available'}</span>
        </div>
        <div className="profile-field">
          <span className="field-label">Email:</span>
          <span className="field-value">{profileData.email || 'Not available'}</span>
        </div>
        <div className="profile-field">
          <span className="field-label">Phone:</span>
          <span className="field-value">{profileData.phone || 'Not available'}</span>
        </div>
        <div className="profile-field">
          <span className="field-label">Date of Birth:</span>
          <span className="field-value">{formatDate(profileData.DateOfBirth)}</span>
        </div>
      </>
    );
  };

  return (
    <div className="account-container">
      <div className="role-display">
        <h2>User Role: {userRole || 'No role assigned'}</h2>
      </div>

      <div className="account-header">
        {renderDashboardButton()}
      </div>

      <div className="account-section">
        <h2>Profile Information</h2>
        {renderProfileContent()}
      </div>
    </div>
  );
};

export default Account;