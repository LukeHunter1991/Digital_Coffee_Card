import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'

// Import pages
import HomePage from './components/pages/HomePage.jsx';
import UserHomePage from './components/pages/UserHomePage.jsx';
import BusinessHomePage from './components/pages/BusinessHomePage.jsx'
import CurrentCards from './components/pages/CurrentCards.jsx';
import CompletedCards from './components/pages/CompletedCards.jsx';
import QRCodePage from './components/pages/QRCode.jsx';
import StampCard from './components/pages/StampCard.jsx'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      // TO DO: Add elements
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/user',
        element: <UserHomePage />
      },
      {
        path: '/user/current-cards',
        element: <CurrentCards />
      },
      {
        path: '/user/completed-cards',
        element: <CompletedCards />
      },
      {
        path: '/user/stamp-card/:scannedId',
        element: <StampCard />
      },
      {
        path: '/business',
        element: <BusinessHomePage />
      },
      {
        path: '/business/stamp',
        element: <QRCodePage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
