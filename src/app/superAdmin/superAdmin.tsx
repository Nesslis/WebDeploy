import React, { useState } from 'react';
import { Drawer, Button, Input} from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import CreateClinic from './components/createClinic.tsx';
import CreateHotel from './components/createHotel.tsx';
import './superAdmin.css';

const SuperAdmin: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerContent, setDrawerContent] = useState('welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const showToast = (message: string) => {
    toast(message);
  };
  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      showToast('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post(
        'https://healthcareintourism-test.azurewebsites.net/api/User/ResetPassword',
        {
          email,
          password,
          confirmPassword,
        }
      );
      if (response.status === 200) {
        showToast('Password reset successfully');
      } else {
        showToast('Error resetting password');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      showToast('Error resetting password');
    }
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };
  return (
    <div className='superAdminPage'>
      <div className='adminPanel'>
        <div className='adminIcon' onClick={showDrawer}>
          <MenuOutlined style={{ fontSize: '24px', color: '#ffffff' }} />
        </div>
        <div
          onClick={() => setDrawerContent('welcome')}
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          <UserOutlined
            style={{ fontSize: '20px', color: '#ffffff', marginLeft: 3 }}
          />
          <div className='adminText'>Super Admin Panel</div>
        </div>
      </div>
      <Drawer
        title='Admin Actions'
        placement='left'
        closable={false}
        onClose={onCloseDrawer}
        visible={drawerVisible}
      >
        <div className='drawerContent'>
          <Button
            onClick={() => {
              setDrawerContent('resetPassword');
              onCloseDrawer();
            }}
          >
            Reset Password
          </Button>
          <Button
            onClick={() => {
              setDrawerContent('createClinic');
              onCloseDrawer();
            }}
          >
            Create Clinic
          </Button>
          <Button
            onClick={() => {
              setDrawerContent('createHotel');
              onCloseDrawer();
            }}
          >
            Create Hotel
          </Button>
          <Button
            onClick={() => {
              window.location.href = '/';
              onCloseDrawer();
            }}
          >
            Logout
          </Button>
        </div>
      </Drawer>
      <div className='adminSections'>
        <div className='homePage'>
          {drawerContent === 'welcome' && (
            <div style={{ fontSize: '24px', color: '#ffffff' }}>
              <h1>Welcome to the Super Admin Panel</h1>
            </div>
          )}
          {drawerContent === 'resetPassword' && (
            <div>
              <h1
                style={{ fontSize: '26px', color: '#ffffff', marginBottom: 24 }}
              >
                Reset Password
              </h1>
              <Input
                placeholder='Email'
                className='resetInput'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                className='resetInput'
                placeholder='New Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                className='resetInput'
                placeholder='Confirm Password'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button onClick={handleResetPassword} style={{ marginTop: 16 }}>
                Reset Password
              </Button>
            </div>
          )}
          {drawerContent === 'createClinic' && <CreateClinic/>}
          {drawerContent === 'createHotel' && <CreateHotel/>}
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;
