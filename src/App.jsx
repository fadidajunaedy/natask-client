import Task from "./components/pages/Task";
import AuthLayout from "./components/layouts/auth/AuthLayout";
import DashboardLayout from "./components/layouts/dashboard/DashboardLayout";
import LandingPage from "./components/pages/landingPage/LandingPage";
import AOS from "aos";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import ScrollToTop from "./components/utils/ScrollToTop";
import Toast from "./components/common/Toast";

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Router basename="/">
        <ScrollToTop />
        <Toast />
        <Routes >
          <Route path="/auth/*" element={<AuthLayout />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          />
          <Route path="/task/:_id" element={<Task />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
