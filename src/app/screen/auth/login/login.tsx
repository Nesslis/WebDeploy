import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css'; // Import the CSS file

interface Credentials {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted credentials:', credentials);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h2>Hello! Welcome back.</h2>
          <div className="note">Sign in to your account.</div>
          <div className="form-group">
            <input
              type="text"
              id="email"
              name="email"
              placeholder='Email : '
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder='Password : '
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className='button'>Login</button>
          <div style={{ textAlign: 'center' , width:'100%'}}>
            <div style={{ color: '#3a5a5e', fontSize: '13px', marginBottom: '7px' }}>Forgot password?</div>
            <hr style={{ borderTop: '1px solid #3a5a5e', width: '40%', display: 'inline-block', margin: '0 5px' }} />
            <div style={{ color: '#3a5a5e', display: 'inline-block' }}>or</div>
            <hr style={{ borderTop: '1px solid #3a5a5e', width: '40%', display: 'inline-block', margin: '0 5px' }} />
          </div>
          <div style={{ color: '#3a5a5e', marginTop: '8px', fontSize:'15px', alignSelf:'center', marginLeft:'8px' }}>
            Don't have an account? <Link to="/register" style={{ fontWeight: 'bold', marginBottom: '5px', color: '#206f74' }}>Sign Up</Link>.
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
