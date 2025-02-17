import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Heading from "../../common/Heading";
import FormRegister from "../../forms/FormRegister";

const Register = () => {
  return (
    <>
      <Helmet>
        <title>Natatask - Create Your Account & Get Started</title>
        <meta
          name="description"
          content="Register for free and and start managing your team’s tasks effortlessly."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={`${import.meta.env.VITE_CLIENT_URL}/auth/register`}
        />
      </Helmet>
      <Heading level="h1" size="3xl">
        Create Your Account
      </Heading>
      <p className="mb-4">Register to start managing tasks effortlessly!</p>
      <FormRegister />
      <span className="w-full flex justify-center text-center text-sm mt-4">
        Have an account? &nbsp;
        <Link to="/auth/login" className="link text-primary">
          Login
        </Link>
      </span>
    </>
  );
};

export default Register;
