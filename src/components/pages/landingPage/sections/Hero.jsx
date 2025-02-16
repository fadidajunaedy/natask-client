import { Link } from "react-router-dom"
import Heading from "../../../common/Heading"
import CardTask1 from "../../../../assets/images/card-task-1.png"
import CardTask2 from "../../../../assets/images/card-task-2.png"

const Hero = () => {
    return (
        <section className="bg-base-200">
            <div className="container min-h-screen grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                {/* Text Hero */}
                <div className="flex flex-col items-start gap-4">
                    <Heading
                        data-aos="fade-right"
                        level="h1"
                        size="6xl"
                        className="md:leading-12 lg:leading-18"
                    >
                        Manage Your Team's Tasks Easily and Efficiently
                    </Heading>
                    <p
                        data-aos="fade-right"
                        data-aos-delay="100"
                        className="text-lg md:text-xl lg:text-2xl opacity-80"
                    >
                        Natask is the best solution for resource and team task management. With Natask, you can organize, monitor, and complete work more effectively without any hassle.
                    </p>
                    <Link to="#" className="btn btn-lg btn-secondary rounded-xl">
                        Get Started
                    </Link>
                </div>

                {/* Image Hero */}
                <div className="w-full relative">
                    <img
                        data-aos="fade-up"
                        data-aos-delay="300"
                        src={CardTask2}
                        alt="Task Card 2"
                        className="peer absolute -top-12 right-6 z-[97] hover:scale-125 transition-transform rounded-xl shadow-lg h-64"
                    />
                    <img
                        data-aos="fade-up"
                        data-aos-delay="200"
                        src={CardTask1}
                        alt="Task Card 1"
                        className="transition rounded-xl shadow-lg h-96 mx-auto peer-hover:blur-sm"
                    />
                </div>
            </div>
        </section>
    )
}

export default Hero