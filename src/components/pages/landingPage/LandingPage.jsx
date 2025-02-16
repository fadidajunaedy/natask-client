import Heading from "../../common/Heading"
import { Link } from "react-router-dom"
import LandingPageLayout from "../../layouts/landingPage/LandingPageLayout"
import Hero from "./sections/Hero"
import WhyUs from "./sections/WhyUs"
import HowItWorks from "./sections/HowItWorks"
import CTA from "./sections/CTA"

const LandingPage = () => {
    return (
        <>
            <LandingPageLayout>
                <Hero />
                <WhyUs />
                <HowItWorks />
                <CTA />
            </LandingPageLayout>
           
        </>
    )
}

export default LandingPage