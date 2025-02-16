import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Heading from "../../common/Heading";
import FormForgotPassword from "../../forms/FormForgotPassword";

const ForgotPassword = () => {
  return (
    <>
      <Helmet>
        <title>Natask - Forgot your Password?</title>
        <meta name="robots" content="noindex, follow" />
        <link
          rel="canonical"
          href={`${import.meta.env.VITE_CLIENT_URL}/auth/forgot-password`}
        />
      </Helmet>
      <fieldset className="w-full bg-base-100 flex flex-col justify-center px-4 md:px-18 lg:px-36">
        <Heading level="h1" size="3xl">
          Forgot Your Password?
        </Heading>
        <p className="mb-4">
          Enter your email to receive a password reset link.
        </p>
        <FormForgotPassword />
        <span className="w-full flex justify-center text-center text-sm mt-4">
          Don't have an account? &nbsp;
          <Link to="/auth/register" className="link text-primary">
            Register
          </Link>
        </span>
      </fieldset>
      <div className="w-full bg-primary rounded-xl border border-base-200 shadow-lg"></div>
    </>
  );
};

export default ForgotPassword;
