import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import UserSignUpForm from './UserSignupForm';
import UserLoginForm from './UserLoginForm';
import BusinessSignUpForm from './BusinessSignupForm'
import BusinessLoginForm from './BusinessLoginForm'

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showUserModal, setShowUserModal] = useState(false);
  const [showBusinessModal, setShowBusinessModal] = useState(false);

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            Digital Coffee Card
          </Navbar.Brand>
            <Nav className='ml-auto d-flex'>
              {/* if user is logged in show user/business Nav links and logout */}
              {Auth.loggedIn() ? (
                <>
                {/* Use url to determine if user or busienss Nav items should be shown */}
                  {window.location.pathname.startsWith('/user') ? (
                    <>
                      <Nav.Link as={Link} to='/user/current-cards'>
                        My Current Cards
                      </Nav.Link>
                      <Nav.Link as={Link} to='/user/completed-cards'>
                      My Completed Cards
                    </Nav.Link> 
                  </>
                  ) : (
                    <Nav.Link as={Link} to='/'>
                    Business route
                  </Nav.Link>
                  )
                }
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                <Nav.Link onClick={() => setShowUserModal(true)}>Customer Login/Sign Up</Nav.Link>
                <Nav.Link onClick={() => setShowBusinessModal(true)}>Business Login/Sign Up</Nav.Link>
                </>
              )}
            </Nav>
        </Container>
      </Navbar>
      {/* set customer modal data up */}
      <Modal
        size='lg'
        show={showUserModal}
        onHide={() => setShowUserModal(false)}
        aria-labelledby='user-signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='user-signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <UserLoginForm handleModalClose={() => setShowUserModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <UserSignUpForm handleModalClose={() => setShowUserModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
       {/* set business modal data up */}
       <Modal
        size='lg'
        show={showBusinessModal}
        onHide={() => setShowBusinessModal(false)}
        aria-labelledby='busines-signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='business-signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <BusinessLoginForm handleModalClose={() => setShowBusinessModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <BusinessSignUpForm handleModalClose={() => setShowBusinessModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
