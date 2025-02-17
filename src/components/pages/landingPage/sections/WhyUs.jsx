import { TbSubtask, TbTableSpark } from "react-icons/tb";
import { MdConnectWithoutContact } from "react-icons/md";
import Heading from "../../../common/Heading";
import PreviewDetailTask from "../../../../assets/images/preview-detail-task.png";

const WhyUs = () => {
  return (
    <section id="why-us" className="bg-base-100">
      <div className="container min-h-screen py-12 lg:py-24">
        {/* Section Heading */}
        <Heading
          data-aos="fade-up"
          level="h2"
          size="lg"
          className="text-left lg:text-center text-primary mb-4"
        >
          WHY US
        </Heading>
        <Heading
          data-aos="fade-up"
          level="h3"
          size="4xl"
          className="text-left lg:text-center font-normal mb-8"
        >
          Empower your team with an efficient task management system designed
          for productivity and seamless collaboration.
        </Heading>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1: Streamlined Task Assignment */}
          <div
            data-aos="fade-zoom-in"
            className="bg-base-200 rounded-xl p-8 lg:p-16"
          >
            <TbSubtask
              data-aos="fade-right"
              data-aos-delay="100"
              className="stroke-primary mb-8"
              size={81}
            />
            <Heading
              data-aos="fade-right"
              data-aos-delay="100"
              level="h3"
              size="4xl"
              className="font-semibold mb-2"
            >
              Streamlined Task Assignment
            </Heading>
            <p
              data-aos="fade-right"
              data-aos-delay="100"
              className="text-lg md:text-xl lg:text-2xl opacity-80"
            >
              Assign and manage tasks with ease.
            </p>
          </div>

          {/* Feature 2: Collaboration */}
          <div
            data-aos="fade-zoom-in"
            data-aos-delay="100"
            className="bg-base-200 rounded-xl p-8 lg:p-16"
          >
            <MdConnectWithoutContact
              data-aos="fade-left"
              data-aos-delay="200"
              className="fill-primary mb-8"
              size={81}
            />
            <Heading
              data-aos="fade-left"
              data-aos-delay="200"
              level="h3"
              size="4xl"
              className="font-semibold mb-2"
            >
              Collaboration
            </Heading>
            <p
              data-aos="fade-left"
              data-aos-delay="200"
              className="text-lg md:text-xl lg:text-2xl opacity-80"
            >
              Stay connected with employees through instant updates.
            </p>
          </div>

          {/* Feature 3: Simple & Intuitive Interface */}
          <div
            data-aos="fade-zoom-in"
            data-aos-delay="200"
            className="md:col-span-2 grid grid-cols-1 lg:grid-cols-2 bg-base-200 rounded-xl overflow-hidden"
          >
            <div className="p-8 lg:p-16">
              <TbTableSpark
                data-aos="fade-up"
                data-aos-delay="300"
                className="stroke-primary mb-8"
                size={81}
              />
              <Heading
                data-aos="fade-up"
                data-aos-delay="300"
                level="h3"
                size="4xl"
                className="font-semibold mb-2"
              >
                Simple & Intuitive Interface
              </Heading>
              <p
                data-aos="fade-up"
                data-aos-delay="300"
                className="text-lg md:text-xl lg:text-2xl opacity-80"
              >
                No complicated setups, just productivity!
              </p>
            </div>
            <div className="w-full relative pt-8 px-8 lg:pt-16 lg:pl-0 lg:pr-16">
              <img
                data-aos="fade-up"
                data-aos-delay="400"
                src={PreviewDetailTask}
                alt="Preview Dashboard"
                className="rounded-t-xl shadow-lg border-4 border-base-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
