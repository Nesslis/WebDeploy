import React, { useState } from 'react';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import './register.css';
import { Link } from 'react-router-dom';
import MyCheckbox from '../../../components/checkbox/checkbox.tsx';

interface RegistrationInfo {
  name: string;
  agencyName: string;
  email: string;
}

const RegisterPage: React.FC = () => {
  const [registrationInfo, setRegistrationInfo] = useState<RegistrationInfo>({
    name: '',
    agencyName: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can perform registration validation and submission using registrationInfo
    // For simplicity, let's just log the registration info to the console
    console.log('Submitted registration info:', registrationInfo);
  };

  return (
    <div className="register-page">
      <div className="registration-container">
          <form onSubmit={handleSubmit}>
            <h2>Sign Up.</h2>
            <div className="note">Create an account.</div>
            <div className="form-group1">
            <FaUser className="icon" />
              <input
                type="text"
                id="name"
                name="name"
                placeholder='Name : '
                value={registrationInfo.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group1">
            <FaUser className="icon" />
              <input
                type="text"
                id="agencyName"
                name="agencyName"
                placeholder='Agency Name : '
                value={registrationInfo.agencyName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group1">
            <FaEnvelope className="icon" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder='Email : '
                value={registrationInfo.email}
                onChange={handleChange}
                required
              />
            </div>
            <MyCheckbox/>
            <button type="submit" className="submit-button" onClick={handleSubmit}>Create Account</button>
            <div style={{ color: '#3a5a5e', marginTop: '8px', fontSize:'15px', alignSelf:'center', marginLeft:'8px' }}>
            Already have an account? <Link to="/login" style={{ fontWeight: 'bold', marginBottom: '5px', color: '#206f74' }}>Log in</Link>.
          </div>
          </form>
        </div>
        </div>
  );
};

export default RegisterPage;
