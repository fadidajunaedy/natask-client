import { Routes, Route, Link } from "react-router-dom";
import Register from "../../pages/auth/Register";
import Login from "../../pages/auth/Login";
import ForgotPassword from "../../pages/auth/ForgotPassword";
import ResetPassword from "../../pages/auth/ResetPassword";
import Toast from "../../common/Toast";
import PreviewDashboard from "../../../assets/images/preview-dashboard.png";
import Heading from "../../common/Heading";
import { IoArrowBack } from "react-icons/io5";

const AuthLayout = () => {
  return (
    <main className="w-full md:min-h-screen bg-base-100 grid grid-cols-1 md:grid-cols-2 p-4">
      <fieldset className="w-full h-[calc(100vh-2rem)] bg-base-100 flex flex-col justify-center px-4 md:px-18 lg:px-36">
        <Link to="/" className="link flex items-center gap-2 mb-8">
          <IoArrowBack /> Natask
        </Link>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </fieldset>
      <div className="w-full md:h-[calc(100vh-2rem)] grid grid-cols-1  bg-primary rounded-xl border border-base-200 shadow-lg overflow-hidden">
        <div className="flex flex-col justify-center items-center gap-4 py-8 px-4">
          <Heading
            data-aos="fade-up"
            level="h2"
            size="4xl"
            align="center"
            className="text-base-100"
          >
            Simplify Your Workflow with Our Dashboard
          </Heading>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-lg md:text-2xl text-center text-base-100 opacity-80"
          >
            Easily manage and monitor your data with a clean and intuitive
            dashboard. Get real-time insights, track progress, and stay
            organized—all in one platform.
          </p>
        </div>
        <div className="relative self-end h-[16em] md:h-[24em] px-4 pt-4 flex items-end">
          <img
            data-aos="fade-up"
            data-aos-delay="200"
            src={PreviewDashboard}
            alt="Preview Dashboard"
            className="absolute top-4 md:top-[unset] bottom-0 rounded-t-xl shadox-lg w-[calc(100%-2rem)]"
          />
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
