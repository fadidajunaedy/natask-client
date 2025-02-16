import { Routes, Route } from "react-router-dom";
import Register from "../../pages/auth/Register";
import Login from "../../pages/auth/Login";
import ForgotPassword from "../../pages/auth/ForgotPassword";
import ResetPassword from "../../pages/auth/ResetPassword";
import Toast from "../../common/Toast";

const AuthLayout = () => {
  return (
    <main className="w-full min-h-screen bg-base-100 grid grid-cols-1 md:grid-cols-2 p-4">
      <Toast />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </main>
  );
};

export default AuthLayout;
