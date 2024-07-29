import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../utils/auth';

import { useMutation } from '@apollo/client';
import { ADD_BUSINESS_USER } from '../utils/mutations';


const BusinessSignupForm = () => {
  // set initial form state
  const [businessFormData, setBusinessFormData] = useState({ businessName: '', email: '', password: '', postcode: '', stampsRequired: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [businessSignup] = useMutation(ADD_BUSINESS_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBusinessFormData({ ...businessFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log(businessFormData)

    try {
      // Convert input to int
      businessFormData.stampsRequired = parseInt(businessFormData.stampsRequired);
      const { data } = await businessSignup({
        variables: {
          ...businessFormData
        }
      });
      console.log(data)

      if (!data) {
        throw new Error('something went wrong!');
      }

      Auth.businessLogin(data.createBusiness.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setBusinessFormData({
      businessName: '',
      email: '',
      password: '',
      postcode: '',
      stampsRequired: ''
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='businessName'>Business Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your business name'
            name='businessName'
            onChange={handleInputChange}
            value={businessFormData.businessName}
            required
          />
          <Form.Control.Feedback type='invalid'>Business Name is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={businessFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={businessFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='postcode'>Postcode</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your postcode'
            name='postcode'
            onChange={handleInputChange}
            value={businessFormData.postcode}
            required
          />
        <Form.Control.Feedback type='invalid'>Postcode is required!</Form.Control.Feedback>
        </Form.Group>
    
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='stampsRequired'>Stamps Required</Form.Label>
          <Form.Control
            type='number'
            placeholder='How many stamps should your card require? Must be between 2 and 12.'
            name='stampsRequired'
            onChange={handleInputChange}
            value={businessFormData.stampsRequired}
            required
          />
          <Form.Control.Feedback type='invalid'>A stamp amount between 2 and 12 is required!</Form.Control.Feedback>
        </Form.Group>
          <Button
            disabled={!(businessFormData.businessName && businessFormData.email && businessFormData.password && businessFormData.postcode && businessFormData.stampsRequired > 1 && businessFormData.stampsRequired < 13 )}
            type='submit'
            variant='success'>
            Submit
          </Button>
      </Form>
    </>
  );
};

export default BusinessSignupForm;
