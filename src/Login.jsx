
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/auth.css';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } else {
      setError('Invalid email or password. Please signup first.');
    }
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
            <a href="/#profile">Profile</a>
            <a href="/#about">About</a>
            <a href="/#portfolio">Portfolio</a>
            <a href="/#contact">Contact</a>
          </nav>
        </header>

        {/* Main Content */}
        <div className="login-content">

          {/* Login Form */}
          <div className="login-card">

            <div className="welcome-icon">✦</div>

            <h1>WELCOME BACK</h1>

            <p className="login-subtitle">
              Login to access your personal portfolio
            </p>

            <form onSubmit={handleLogin}>

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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="login-options">
                <label className="remember">
                  <input type="checkbox" />
                  Remember me
                </label>
              </div>

              {error && (
                <p className="login-error">{error}</p>
              )}

              <button type="submit" className="login-button">
                SIGN IN <span>→</span>
              </button>

            </form>

            <p className="signup-text">
              Don't have an account?
              {' '}
              <Link to="/signup">Create Account</Link>
            </p>

            <Link to="/" className="back-home">
              ← Back to Home
            </Link>

          </div>

          {/* Right Side Design */}
          <div className="login-visual">

            <div className="visual-heading">
              <span>SECURE ACCESS</span>

              <h2>
                Your Portfolio.
                <br />
                Your Identity.
              </h2>

              <p>
                Sign in and take control of your professional journey.
                Everything you need, all in one place.
              </p>
            </div>

            <div className="visual-art">

              <div className="floating-icon icon-lock">🔒</div>
              <div className="floating-icon icon-star">✦</div>

              <div className="browser-card">

                <div className="browser-top">
                  <i></i>
                  <i></i>
                  <i></i>
                </div>

                <div className="browser-body">

                  <div className="big-lock">🔐</div>

                  <h3>Welcome Back!</h3>

                  <div className="fake-input">
                    👤 &nbsp; Your Account
                  </div>

                  <div className="fake-input">
                    🔑 &nbsp; • • • • • • • •
                  </div>

                  <div className="fake-button">
                    LOGIN SECURELY
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

        <footer className="login-footer">
          © 2026 Personal Portfolio. All Rights Reserved.
        </footer>

      </div>
    </div>
  );
}

export default Login;
