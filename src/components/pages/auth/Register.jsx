import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { showToast } from "../../../store/toastSlice"
import NataskLogo from "../../../assets/images/natask-logo.png"
import RegisterForm from "../../forms/RegisterForm"
import { Helmet } from "react-helmet"
import Heading from "../../common/Heading"

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleRegister = async (data) => {
        try {
            const request = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            const response = await request.json()
            if (response.success) {
                dispatch(showToast({ type: "SUCCESS", message: response.message }))
                navigate("/auth/login")
            } else {
                console.error(response.message)
            }
        } catch (error) {
            console.error("Registration failed", error)
        }
    }

    return (
        <>
            <Helmet>
                <title>Natatask - Create Your Account & Get Started</title>
                <meta name="description" content="Register for free and and start managing your team’s tasks effortlessly." />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`${import.meta.env.VITE_CLIENT_URL}/auth/register`} />
            </Helmet>
            <fieldset className="w-full bg-base-100 flex flex-col justify-center px-4 md:px-18 lg:px-36">
                <Heading level="h1" size="3xl">Create Your Account</Heading>
                <p className="mb-4">Register to start managing tasks effortlessly!</p>
                <RegisterForm onSubmit={handleRegister} />
                <span className="w-full flex justify-center text-center text-sm mt-4">
                    Have an account?
                    &nbsp;
                    <Link to="/auth/login" className="link text-primary">Login</Link>
                </span>
            </fieldset>
            <div className="w-full bg-primary rounded-xl border border-base-200 shadow-lg">
            </div>
        </>
    )
}

export default Register
