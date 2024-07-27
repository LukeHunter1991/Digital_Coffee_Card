// see SignupForm.js for comments
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import Auth from '../utils/auth';

import { useMutation } from '@apollo/client';
import { BUSINESS_LOGIN } from '../utils/mutations';

const BusinessLoginForm = () => {
  const [businessFormData, setBusinessFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [businessLogin] = useMutation(BUSINESS_LOGIN);

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

    try {
      const { data } = await businessLogin({
        variables: { ...businessFormData },
      });
      console.log(data);
      Auth.businessLogin(data.businessLogin.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setBusinessFormData({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
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
        <Button
          disabled={!(businessFormData.email && businessFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default BusinessLoginForm;
