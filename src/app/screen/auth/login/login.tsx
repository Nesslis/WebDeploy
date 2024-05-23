import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.tsx';
import { Modal, Box, Typography, Button} from '@mui/material';
import './login.css'; 
interface Credentials {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {onLogin} = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const resetForm = () => {
    setCredentials({
      username:'',
      password:''
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted credentials:', credentials);
    if(!onLogin){
      console.log('Login is unavailable');
    }
    else {
    try {
      const response = await onLogin(credentials.username, credentials.password);
      if (response.error){
        console.log(response.msg);
      }
      else{
        console.log("Success ",response);
        setShowSuccessModal(true);
        resetForm();
      }
    }
    catch (error) {
      console.log("Unexpected error occurred. Please try again later");
    }
  }
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
              id="usename"
              name="username"
              placeholder='Username : '
              value={credentials.username}
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
      <Modal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Success
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Account created successfully!
          </Typography>
          <Button onClick={() => setShowSuccessModal(false)} sx={{marginTop:3}}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
export default LoginPage;
