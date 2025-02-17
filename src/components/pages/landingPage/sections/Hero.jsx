import { Link } from "react-router-dom";
import Heading from "../../../common/Heading";
import PreviewCardTask from "../../../../assets/images/preview-card-task.png";
import PreviewFormCreateTask from "../../../../assets/images/preview-form-create-task.png";
import Button from "../../../common/Button";

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
            Solution for resource and team task management. With Natask, you can
            organize, monitor, and complete work more effectively without any
            hassle.
          </p>
          <div className="flex items-center gap-2 mt-8">
            <Link
              to="/auth/register"
              className="btn btn-lg btn-secondary rounded-xl"
            >
              Get Started
            </Link>
            <Button
              size="lg"
              level="primary"
              outline
              onClick={() =>
                window.scrollTo({
                  top: window.innerHeight,
                  left: 0,
                  behavior: "smooth",
                })
              }
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Image Hero */}
        <div className="w-full relative p-4">
          <img
            data-aos="fade-up"
            data-aos-delay="300"
            src={PreviewCardTask}
            alt="Preview Card Task"
            className="peer absolute -top-6 right-6 z-[97] hover:scale-125 transition-all rounded-xl shadow-lg w-64"
          />
          <img
            data-aos="fade-up"
            data-aos-delay="200"
            src={PreviewFormCreateTask}
            alt="Preview Form Task"
            className="transition-all rounded-xl shadow-lg w-86 mx-auto peer-hover:brightness-90 peer-hover:blur-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
