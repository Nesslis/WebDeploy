import React, { useState, useEffect } from 'react';
import { Drawer, Button, Input, Switch, DatePicker, Select } from 'antd';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext.tsx';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import { Modal, Box, Typography } from '@mui/material';
import axios from 'axios';
import './adminHomePage.css';
const { Option } = Select;

const AdminHome: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerContent, setDrawerContent] = useState('welcome');
  const [clinics, setClinics] = useState<any[]>([]); // State to st
  const [clinicId, setClinicId] = useState<number>();
  const [hotels, setHotels] = useState<any[]>([]);
  const [hotelId, setHotelId] = useState<number>();
  const [treatmentId, setTreatmentId] = useState<number>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('');
  const [price, setPrice] = useState<number>();
  const [discount, setDiscount] = useState<number>();
  const [bannerImage, setBannerImage] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { onResetPassword, onLogout } = useAuth();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    fetchClinics();
    fetchHotels();
  }, []);

  const showToast = (message: string) => {
    toast(message);
  };

  const handleClinicSelect = (value: any) => {
    const selectedClinic = clinics.find((clinic) => clinic.id === value);
    setClinicId(value);
    console.log(selectedClinic);
  };

  const fetchClinics = async () => {
    try {
      const response = await axios.get(
        'https://healthcareintourism-test.azurewebsites.net/api/Clinic/GetAllClinics'
      );
      setClinics(response.data.data.items);
    } catch (error) {
      console.error('Error fetching the cities:', error);
    }
  };
  const fetchHotels = async () => {
    try {
      const response = await axios.get(
        'https://healthcareintourism-test.azurewebsites.net/api/Hotel/GetAllHotels'
      );
      setHotels(response.data.data.items);
    } catch (error) {
      console.error('Error fetching the hotels:', error);
    }
  };
  const handleHotelSelect = (value: any) => {
    const selectedHotel = hotels.find((hotel) => hotel.id === value);
    setHotelId(value); 
    console.log(selectedHotel);
  };

  const handlePushOffer = async () => {
    // Check if all required fields are filled
    if (
      !clinicId ||
      !hotelId ||
      !treatmentId ||
      !title ||
      !description ||
      !currency ||
      !price ||
      !discount ||
      !bannerImage ||
      !startDate ||
      !endDate
    ) {
      toast('Please fill all the required inputs');
      return;
    }

    // Convert Date objects to string in the required format
    const formattedStartDate = startDate?.toISOString();
    const formattedEndDate = endDate?.toISOString();

    try {
      const queryParams = {
        clinicId,
        hotelId,
        treatmentId,
        title,
        description,
        currency,
        price,
        discount,
        bannerImage,
        isActive,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      };
      const url = `https://healthcareintourism-test.azurewebsites.net/swagger/index.html?classId=79a6f82e-4333-493c-bca6-c5ce652c6c6e&assignmentId=a9047589-f065-44c4-9724-4028e0660f6e&submissionId=9ea2c427-c762-2884-4009-207a0cdb3828/api/Agency/PushOfferAsync`;
      const response = await axios.post(url, queryParams, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);

      if (response.status !== 200) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      console.log('Offer pushed successfully:', response.data);
      toast.success('Offer pushed successfully');
      setShowSuccessModal(true);
      resetForm();
    } catch (error) {
      console.error('Error pushing offer:', error);
      const errorMsg = error.response?.data?.message || 'An error occurred';
      toast.error(errorMsg);
    }
  };
  const resetForm = () => {
    setClinicId(undefined);
    setHotelId(undefined);
    setTreatmentId(undefined);
    setTitle('');
    setDescription('');
    setCurrency('');
    setPrice(undefined);
    setDiscount(undefined);
    setBannerImage('');
    setStartDate(null);
    setEndDate(null);
    setIsActive(true);
  };

  const handleLogout = async () => {
    try {
      if (onLogout) {
        await onLogout();
        window.location.href = '/';
      } else {
        console.error('Error while log out');
      }
    } catch (error) {
      console.error('Error occured', error);
    }
  };

  const handleResetPassword = async () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      console.log('Passwords are not matching');
      return;
    }

    if (onResetPassword) {
      try {
        const response = await onResetPassword(
          email,
          password,
          confirmPassword
        );
        if (response.error) {
          showToast('verError');
        } else {
          showToast('Password successfully resetted');
        }
      } catch (error) {
        console.log(error);
        showToast('There is an error during verification');
      }
    }
  };
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <div className='adminPage'>
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
          <div className='adminText'>Admin Panel</div>
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
              setDrawerContent('createOffer');
              onCloseDrawer();
            }}
          >
            Create Offer
          </Button>
          <Button
            onClick={() => {
              handleLogout();
              onCloseDrawer();
            }}
          >
            Logout
          </Button>
        </div>
      </Drawer>
      <div className='adminSections'>
        {/* Add other components for different pages */}
        <div className='homePage'>
          {drawerContent === 'welcome' && (
            <div style={{ fontSize: '24px', color: '#ffffff' }}>
              <h1> Welcome to our Admin Panel </h1>
            </div>
          )}
          {drawerContent === 'resetPassword' && (
            <div>
              <h1 style={{ color: '#ffffff' }}> Reset Password </h1>
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
              <Button onClick={handleResetPassword} style={{ marginTop: 7 }}>
                Reset Password
              </Button>
            </div>
          )}
          {drawerContent === 'createOffer' && (
            <div>
              <h1 style={{ color: '#ffffff' }}> Create Offer </h1>
              <Select
                className='offerInput'
                showSearch
                placeholder='Select a clinic'
                optionFilterProp='children'
                onChange={handleClinicSelect}
                filterOption={(input, option) =>
                  option?.children
                    ?.toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {clinics.map((clinic) => (
                  <li key={clinic.id}>{clinic.name}</li>
                ))}
              </Select>
              <Select
                className='offerInput'
                showSearch
                placeholder='Select a hotel'
                optionFilterProp='children'
                onChange={handleHotelSelect}
                filterOption={(input, option) =>
                  option?.children
                    ?.toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {hotels &&
                  hotels.map((hotel) => (
                    <Option key={hotel.id} value={hotel.id}>
                      {hotel.name}
                    </Option>
                  ))}
              </Select>
              <Input
                className='offerInput'
                placeholder='Treatment ID'
                value={treatmentId}
                onChange={(e) => setTreatmentId(parseInt(e.target.value))}
              />
              <Input
                className='offerInput'
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                className='offerInput'
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Input
                className='offerInput'
                placeholder='Currency'
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              />
              <Input
                className='offerInput'
                placeholder='Price'
                type='number'
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              />
              <Input
                className='offerInput'
                placeholder='Discount'
                type='number'
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value))}
              />
              <Input
                className='offerInput'
                placeholder='Banner Image URL'
                value={bannerImage}
                onChange={(e) => setBannerImage(e.target.value)}
              />
              <div className='altageç'>
                <div>
                  <Switch
                    checked={isActive}
                    onChange={(checked) => setIsActive(checked)}
                  />
                  <DatePicker
                    className='offerDate'
                    placeholder='Start Date'
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                  <DatePicker
                    className='offerDate'
                    placeholder='End Date'
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                  />
                </div>
                <Button onClick={handlePushOffer} style={{ marginTop: 5 }}>
                  Create Offer
                </Button>
                
              </div>
            </div>
          )}
        </div>
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
            Offer pushed successfully!
          </Typography>
          <Button onClick={() => setShowSuccessModal(false)}>
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
export default AdminHome;
