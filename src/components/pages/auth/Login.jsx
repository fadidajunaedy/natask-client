import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Heading from "../../common/Heading";
import FormLogin from "../../forms/FormLogin";


const Login = () => {
  return (
    <>
      <Helmet>
        <title>Natask - Login to Your Account</title>
        <meta
          name="description"
          content="Login to your Natask account to manage tasks efficiently."
        />
        <meta name="robots" content="noindex, follow" />
        <link
          rel="canonical"
          href={`${import.meta.env.VITE_CLIENT_URL}/auth/login`}
        />
      </Helmet>

      <Heading level="h1" size="3xl">
        Get Started Now
      </Heading>
      <p className="mb-4">Enter your credentials to access your Account</p>
      <FormLogin />
      <span className="w-full flex justify-center text-center text-sm mt-4">
        Don't have an account? &nbsp;
        <Link to="/auth/register" className="link text-primary">
          Register
        </Link>
      </span>
    </>
  );
};

export default Login;
