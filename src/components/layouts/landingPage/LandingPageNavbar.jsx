import { Link } from "react-router-dom"
import { IoReorderTwo, IoClose } from "react-icons/io5"
import NataskLogo from "../../../assets/images/natask-logo.png"
import { useState } from "react"

const LandingPageNavbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <header className={`static md:absolute z-[99] w-[-webkit-fill-available] h-[10vh] ${isOpen ? "bg-base-100" : ""}`}>
                <div className="container h-full flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <img src={NataskLogo} alt="Natask Logo" className="aspect-square w-6" />
                        <span className="text-2xl font-bold">Natask</span>
                    </div>
                    <button
                        type="button"
                        className="block md:hidden cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <IoClose size={36} /> : <IoReorderTwo size={36} />}
                    </button>
                    <nav className="hidden md:flex items-center gap-4">
                        <a href="#why-us">Why Us</a>
                        <a href="#how-it-works">How it Works</a>
                        <div className="flex items-center gap-2">
                            <Link to="auth/register" className="btn btn-outline btn-primary">Register</Link>
                            <Link to="auth/login" className="btn btn-primary">Log In</Link>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Mobile Navigation */}
            <nav
                className={`block md:hidden absolute top-0 left-0 z-[80] bg-base-100 w-[-webkit-fill-available] flex flex-col gap-4 p-4 transition-transform duration-300 ${
                    isOpen ? "top-[10vh] translate-y-0 shadow-lg" : "translate-y-[-100%]"
                }`}
            >
                <a 
                    href="#why-us" 
                    className="text-center p-4 rounded-xl hover:bg-primary"
                    onClick={() => setIsOpen(false)}
                >
                    Why Us
                </a>
                <a 
                    href="#how-it-works" 
                    className="text-center p-4 rounded-xl hover:bg-primary"
                    onClick={() => setIsOpen(false)}
                >
                    How it Works
                </a>
                <div className="w-full flex flex-col gap-2">
                    <Link
                        to="auth/register"
                        className="w-full btn btn-lg btn-outline btn-primary rounded-xl p-4"
                        onClick={() => setIsOpen(false)}
                    >
                        Sign Up
                    </Link>
                    <Link
                        to="auth/login"
                        className="w-full btn btn-lg btn-primary rounded-xl p-4"
                        onClick={() => setIsOpen(false)}
                    >
                        Sign In
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default LandingPageNavbar