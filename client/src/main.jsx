import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'

// Import pages
import UserHomePage from './components/pages/UserHomePage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      // TO DO: Add elements
      {
        index: true,
        element: <UserHomePage />
      }
      // {
      //   path: '/saved',
      //   element: <SavedBooks />
      // }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
