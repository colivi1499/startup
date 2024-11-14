import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

export default function Login() {
  return (
    <div className="login-container">
      <form className="login-form" action="#" method="post">
        <h2>Login</h2>

        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" placeholder="Enter your username" required />
        </div>

        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" required />
        </div>

        <button type="submit">Login</button>

        <div className="footer-links">
          <a href="#">Forgot Password?</a>
          <a href="#">Create an account</a>
        </div>
      </form>
    </div>
  );
}
