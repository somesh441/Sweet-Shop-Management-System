import React, { useState } from 'react';
import axios from 'axios';
import './Welcome.css';

const Welcome = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleBack = () => {
    setShowLogin(false);
    setShowRegister(false);
    setError('');
    setSuccess('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData(e.target);
    const loginData = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    try {
      console.log('Sending login data:', loginData);
      const response = await axios.post('http://localhost:8000/api/auth/login/', loginData);
      console.log('Login response:', response.data);
      
      // Store JWT tokens
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      setSuccess('Login successful! Redirecting...');
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
      
    } catch (err) {
      console.log('Login error:', err);
      console.log('Error response:', err.response?.data);
      console.log('Error status:', err.response?.status);
      
      let errorMessage = 'Login failed. Please try again.';
      
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (typeof err.response?.data === 'string') {
        errorMessage = err.response.data;
      } else if (err.response?.data?.detail) {
        errorMessage = err.response.data.detail;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData(e.target);
    const registerData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: 'customer' // Always register as customer
    };

    try {
      console.log('Sending registration data:', registerData);
      const response = await axios.post('http://localhost:8000/api/auth/register/', registerData);
      console.log('Registration response:', response.data);
      
      setSuccess('Registration successful! You can now login.');
      
      // Clear form
      e.target.reset();
      
      // Switch to login form after successful registration
      setTimeout(() => {
        setShowRegister(false);
        setShowLogin(true);
        setSuccess('');
      }, 2000);
      
    } catch (err) {
      console.log('Registration error:', err);
      console.log('Error response:', err.response?.data);
      console.log('Error status:', err.response?.status);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (typeof err.response?.data === 'string') {
        errorMessage = err.response.data;
      } else if (err.response?.data?.detail) {
        errorMessage = err.response.data.detail;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Simple Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand">AI Kata: Sweet Shop</span>
          <div className="navbar-nav ms-auto">
            <button className="btn btn-outline-light me-2" onClick={handleLogin}>
              Login
            </button>
            <button className="btn btn-outline-light" onClick={handleRegister}>
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Welcome Content */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="welcome-text text-center">
  <h1 className="display-4 gradient">WELCOME!!</h1>
  {/* <p className="lead">Sweet Shop Management System</p> */}
            {!showLogin && !showRegister && (
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Get Started</h5>
                      <p className="card-text">Please login or register to continue.</p>
                      <div className="d-grid gap-2">
                        <button className="btn btn-primary" onClick={handleLogin}>
                          Login
                        </button>
                        <button className="btn btn-success" onClick={handleRegister}>
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Login Form */}
            {showLogin && (
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Login</h5>
                      <button className="btn btn-sm btn-outline-secondary" onClick={handleBack}>
                        Back
                      </button>
                    </div>
                    <div className="card-body">
                      {error && <div className="alert alert-danger">{error}</div>}
                      {success && <div className="alert alert-success">{success}</div>}
                      
                      <form onSubmit={handleLoginSubmit}>
                        <div className="mb-3">
                          <label htmlFor="login-email" className="form-label">Email</label>
                          <input type="email" className="form-control" id="login-email" name="email" required />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="login-password" className="form-label">Password</label>
                          <input type="password" className="form-control" id="login-password" name="password" required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                          {loading ? 'Logging in...' : 'Login'}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Register Form */}
            {showRegister && (
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Register</h5>
                      <button className="btn btn-sm btn-outline-secondary" onClick={handleBack}>
                        Back
                      </button>
                    </div>
                    <div className="card-body">
                      {error && <div className="alert alert-danger">{error}</div>}
                      {success && <div className="alert alert-success">{success}</div>}
                      
                      <form onSubmit={handleRegisterSubmit}>
                        <div className="mb-3">
                          <label htmlFor="register-name" className="form-label">Full Name</label>
                          <input type="text" className="form-control" id="register-name" name="name" required />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="register-email" className="form-label">Email</label>
                          <input type="email" className="form-control" id="register-email" name="email" required />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="register-password" className="form-label">Password</label>
                          <input type="password" className="form-control" id="register-password" name="password" required />
                        </div>
                        <button type="submit" className="btn btn-success w-100" disabled={loading}>
                          {loading ? 'Registering...' : 'Register'}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome; 