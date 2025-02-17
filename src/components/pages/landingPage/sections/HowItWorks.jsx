import Heading from "../../../common/Heading";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-primary">
      <div className="container flex flex-col justify-center py-12 lg:py-24">
        {/* Section Heading */}
        <Heading
          data-aos="fade-up"
          level="h2"
          size="lg"
          className="text-base-100 mb-4"
        >
          HOW IT WORKS
        </Heading>
        <Heading
          data-aos="fade-up"
          level="h3"
          size="4xl"
          className="text-base-100 font-normal opacity-80 mb-8"
        >
          Effortlessly assign, track, and optimize tasks to keep your projects
          on schedule and your team focused.
        </Heading>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1: Register & Log In */}
          <div
            data-aos="fade-zoom-in"
            className="bg-base-200/5 rounded-xl p-8 md:p-4 lg:p-8"
          >
            <h3
              data-aos="fade-right"
              data-aos-delay="100"
              className="how-it-work-number"
            >
              1
            </h3>
            <Heading
              data-aos="fade-right"
              data-aos-delay="100"
              level="h4"
              size="2xl"
              className="text-base-100 font-semibold mb-2"
            >
              Register & Log In
            </Heading>
            <p
              data-aos="fade-right"
              data-aos-delay="100"
              className="text-base-100 md:text-lg lg:text-xl opacity-80"
            >
              Sign up and log in to access your workspace.
            </p>
          </div>

          {/* Step 2: Add Your Employees */}
          <div
            data-aos="fade-zoom-in"
            data-aos-delay="100"
            className="bg-base-200/5 rounded-xl p-8 md:p-4 lg:p-8"
          >
            <h3
              data-aos="fade-right"
              data-aos-delay="200"
              className="how-it-work-number"
            >
              2
            </h3>
            <Heading
              data-aos="fade-right"
              data-aos-delay="200"
              level="h4"
              size="2xl"
              className="text-base-100 font-semibold mb-2"
            >
              Add Your Employees
            </Heading>
            <p
              data-aos="fade-right"
              data-aos-delay="200"
              className="text-base-100 md:text-lg lg:text-xl opacity-80"
            >
              Register employees in the system before assigning tasks.
            </p>
          </div>

          {/* Step 3: Create & Assign Tasks */}
          <div
            data-aos="fade-zoom-in"
            data-aos-delay="200"
            className="bg-base-200/5 rounded-xl p-8 md:p-4 lg:p-8"
          >
            <h3
              data-aos="fade-right"
              data-aos-delay="300"
              className="how-it-work-number"
            >
              3
            </h3>
            <Heading
              data-aos="fade-right"
              data-aos-delay="300"
              level="h4"
              size="2xl"
              className="text-base-100 font-semibold mb-2"
            >
              Create & Assign Tasks
            </Heading>
            <p
              data-aos="fade-right"
              data-aos-delay="300"
              className="text-base-100 md:text-lg lg:text-xl opacity-80"
            >
              Quickly assign tasks to employees with priorities and deadlines.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
