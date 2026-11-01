
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/auth.css';

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const existingUser = users.find(
      (user) => user.email === email
    );

    if (existingUser) {
      setError('Email already registered. Please login.');
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: 'user'
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! Please login.');
    navigate('/login');
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">

        {/* Header */}
        <header className="login-header">
          <Link to="/" className="brand-logo">
            <span className="brand-icon">P</span>
            <span>Personal Portfolio</span>
          </Link>

          <nav className="login-nav">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </nav>
        </header>

        {/* Signup Content */}
        <div className="login-content">

          {/* Signup Form */}
          <form className="login-card" onSubmit={handleSignup}>

            <div className="welcome-icon">✦</div>

            <h1>CREATE ACCOUNT</h1>

            <p className="login-subtitle">
              Join Personal Portfolio Management System
            </p>

            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="login-error">{error}</p>
            )}

            <button type="submit" className="login-button">
              CREATE ACCOUNT <span>→</span>
            </button>

            <p className="signup-text">
              Already have an account?
              {' '}
              <Link to="/login">Login Here</Link>
            </p>

            <Link to="/" className="back-home">
              ← Back to Home
            </Link>

          </form>

          {/* Right Side Illustration */}
          <div className="login-visual">

            <div className="visual-heading">
              <span>START YOUR JOURNEY</span>

              <h2>
                Build Your Future.
                <br />
                Create Your Identity.
              </h2>

              <p>
                Create your account and showcase your
                skills, projects and professional journey
                in one place.
              </p>
            </div>

            <div className="visual-art">

              <span className="floating-icon icon-lock">🔐</span>
              <span className="floating-icon icon-star">✦</span>

              <div className="browser-card">

                <div className="browser-top">
                  <i></i>
                  <i></i>
                  <i></i>
                </div>

                <div className="browser-body">

                  <div className="big-lock">🚀</div>

                  <h3>Welcome Aboard!</h3>

                  <div className="fake-input">
                    👤 Your Name
                  </div>

                  <div className="fake-input">
                    ✉️ Your Email
                  </div>

                  <div className="fake-input">
                    🔑 Create Password
                  </div>

                  <div className="fake-button">
                    JOIN US NOW
                  </div>

                </div>
              </div>
            </div>

            <div className="visual-bottom">
              <span>✦</span>
              Secure. Simple. Professional.
            </div>

          </div>
        </div>

        <div className="login-footer">
          © 2026 Personal Portfolio. All Rights Reserved.
        </div>

      </div>
    </div>
  );
}

export default Signup;
