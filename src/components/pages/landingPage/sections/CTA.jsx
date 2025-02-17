import { Link } from "react-router-dom";
import Heading from "../../../common/Heading";

const CTA = () => {
  return (
    <section className="bg-base-100">
      <div className="container py-12 lg:py-24">
        <div
          data-aos="fade-zoom-in"
          className="bg-secondary flex flex-col justify-between lg:items-center rounded-xl p-8 lg:p-16"
        >
          <Heading
            data-aos="fade-up"
            data-aos-delay="100"
            level="h2"
            size="lg"
            className="text-left md:text-center text-primary mb-4"
          >
            TRY IT NOW!
          </Heading>
          <Heading
            data-aos="fade-up"
            data-aos-delay="100"
            level="h3"
            size="4xl"
            className="text-left md:text-center text-base-100 font-normal mb-2"
          >
            Start Managing Tasks the Smart Way!
          </Heading>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-left md:text-center text-base-100 md:text-lg lg:text-xl mb-4 opacity-80"
          >
            Sign Up Now & Boost Your Team’s Productivity!
          </p>
          <Link
            data-aos="fade-up"
            data-aos-delay="100"
            to="/auth/register"
            className="btn btn-lg btn-primary rounded-xl"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
