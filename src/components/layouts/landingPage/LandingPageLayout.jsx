import { Helmet } from "react-helmet"
import LandingPageFooter from "./LandingPageFooter"
import LandingPageNavbar from "./LandingPageNavbar"

const LandingPageLayout = ({ children }) => {
    const markupSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Natatask",
        "description": "Natatask helps businesses streamline task assignments, track employee progress in real-time, and optimize productivity.",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "url": `${import.meta.env.VITE_CLIENT_URL}`,
        "image": `${import.meta.env.VITE_CLIENT_URL}/images/natatask-preview.jpg`,
        "author": {
            "@type": "Person",
            "name": "Fadida Zanetti Junaedy"
        }
    }

    return (
        <>
            <Helmet>
                <title>Natask - Manage Your Team's Tasks Easily and Efficiently</title>
                <meta name="description" content="Solution for resource and team task management. With Natask, you can organize, monitor, and complete work more effectively without any hassle." />
                <meta name="keywords" content="task management, employee productivity, team collaboration, work tracking, project management, task automation, business efficiency" />
                <meta property="og:title" content="Natatask – Manage Your Team's Tasks Easily and Efficiently" />
                <meta property="og:description" content="Solution for resource and team task management. With Natask, you can organize, monitor, and complete work more effectively without any hassle." />
                <meta property="og:image" content={`${import.meta.env.VITE_CLIENT_URL}/images/preview.jpg`} />
                <meta property="og:url" content={import.meta.env.VITE_CLIENT_URL} />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={import.meta.env.VITE_CLIENT_URL} />
                <script type="application/ld+json">
                    {JSON.stringify(markupSchema)}
                </script>
            </Helmet>
            <LandingPageNavbar />
            <main className="min-h-screen">
                { children }
            </main>
            <LandingPageFooter />
        </>
    )
}

export default LandingPageLayout