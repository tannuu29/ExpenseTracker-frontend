import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import UpdateProfile from './UpdateProfile'
import './Dashboard.css'

export default function Profile() {
  const navigate = useNavigate()

  return (
    <div className="dashboard-container">
      <Header />

      <div className="dashboard-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <UpdateProfile />

        <div style={{ maxWidth: 900, margin: '0 auto', width: '100%' }}>
          <button
            type="button"
            className="auth-submit-btn"
            onClick={() => navigate('/change-password')}
            style={{ width: 'auto', padding: '12px 22px' }}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  )
}


