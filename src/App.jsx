import Task from './components/pages/Task'
import AuthLayout from "./components/layouts/auth/AuthLayout"
import DashboardLayout from "./components/layouts/dashboard/DashboardLayout"
import LandingPage from './components/pages/landingPage/LandingPage'
import AOS from 'aos';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';

const App = () => {

  useEffect(() => {
    AOS.init()
  }, [])
  
  return (
    <>
      <Router basename='/'>
        <Routes>
          <Route path="/auth/*" element={<AuthLayout />} />
          <Route path="/dashboard/*" element={<DashboardLayout />} />
          <Route path="/task/:_id" element={<Task />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>  
    </>
  )
}

export default App