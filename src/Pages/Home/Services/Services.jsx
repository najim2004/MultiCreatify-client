import { FaArrowRight } from "react-icons/fa";
import Container from "../../../Components/Container";
import devImg from "../../../assets/development.svg";
import eComImg from "../../../assets/ecommerce.svg";
import appImg from "../../../assets/app.svg";
import techImg from "../../../assets/tech.svg";
import markImg from "../../../assets/seo.svg";

const Services = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-5">
        <div className="lg:col-span-4 p-7 rounded-lg bg-gradient-to-r from-[#9C28B1] to-[#6839B7]">
          <h3 className="text-2xl font-poppins font-semibold text-white leading-8">
            INTEGRATED SERVICES
          </h3>
          <p className="my-6 font-openSans text-white leading-7">
            Lorem Ipsum is text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500.
          </p>
          <button className="flex gap-3 items-center text-white font-openSans">
            Learn More <FaArrowRight />
          </button>
        </div>
        {/* service 1 */}
        <div className="lg:col-span-3 flex  px-7 items-center bg-[#F3F5FF] border-b-[4px] rounded-lg border-[#B0BDFF]  h-[244px]  group ">
          <div className="overflow-hidden h-full w-full flex flex-col justify-center relative">
            <img
              className="size-[60px] group-hover:scale-0 duration-500 group-hover:-translate-y-[60px] "
              src={devImg}
              alt=""
            />
            <div className="group-hover:-translate-y-[80px] space-y-2 duration-500">
              <h3 className="text-xl font-poppins font-semibold text-[#050748]">
                Web Development
              </h3>
              <p className="text-[#6a6a8e] font-openSans font-bold">
                REACT | TAILWIND | MONGODB | NODE.JS
              </p>
            </div>
            <p className="text-base leading-[20px] translate absolute font-normal text-[#6a6a8e] font-openSans translate-y-60 group-hover:translate-y-[50px] duration-500">
              Lorem Ipsum is text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500.
            </p>
          </div>
        </div>
        {/* service 2 */}

        <div className="lg:col-span-3 flex  px-7 items-center bg-[#FFF3E6] border-b-[4px] rounded-lg border-[#FFC093]  h-[244px]  group ">
          <div className="overflow-hidden h-full w-full flex flex-col justify-center relative">
            <img
              className="size-[60px] group-hover:scale-0 duration-500 group-hover:-translate-y-[60px] "
              src={eComImg}
              alt=""
            />
            <div className="group-hover:-translate-y-[80px] space-y-2 duration-500">
              <h3 className="text-xl font-poppins font-semibold text-[#050748]">
                Ecommerce Development
              </h3>
              <p className="text-[#6a6a8e] font-openSans font-bold">
                MAGENTO | WP | SHOPIFY | JOOMLA
              </p>
            </div>
            <p className="text-base leading-[20px] translate absolute font-normal text-[#6a6a8e] font-openSans translate-y-60 group-hover:translate-y-[50px] duration-500">
              Lorem Ipsum is text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500.
            </p>
          </div>
        </div>
        {/* service 3 */}

        <div className="lg:col-span-3 flex  px-7 items-center bg-[#FBEEFD] border-b-[4px] rounded-lg border-[#F6BCFF]  h-[244px]  group ">
          <div className="overflow-hidden h-full w-full flex flex-col justify-center relative">
            <img
              className="size-[60px] group-hover:scale-0 duration-500 group-hover:-translate-y-[60px] "
              src={appImg}
              alt=""
            />
            <div className="group-hover:-translate-y-[80px] space-y-2 duration-500">
              <h3 className="text-xl font-poppins font-semibold text-[#050748]">
                Mobile App Development
              </h3>
              <p className="text-[#6a6a8e] font-openSans font-bold">
                IPHONE | ANDROID | CROSS | PLATFORM
              </p>
            </div>
            <p className="text-base leading-[20px] translate absolute font-normal text-[#6a6a8e] font-openSans translate-y-60 group-hover:translate-y-[50px] duration-500">
              Lorem Ipsum is text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500.
            </p>
          </div>
        </div>
        {/* service 4 */}

        <div className="lg:col-span-3 flex  px-7 items-center bg-[#EFFDFF] border-b-[4px] rounded-lg border-[#9FF3FF]  h-[244px]  group ">
          <div className="overflow-hidden h-full w-full flex flex-col justify-center relative">
            <img
              className="size-[60px] group-hover:scale-0 duration-500 group-hover:-translate-y-[60px] "
              src={techImg}
              alt=""
            />
            <div className="group-hover:-translate-y-[80px] space-y-2 duration-500">
              <h3 className="text-xl font-poppins font-semibold text-[#050748]">
                Trending Technologies
              </h3>
              <p className="text-[#6a6a8e] font-openSans font-bold">
                REACT.JS | NODE.JS | ANGULAR.JS
              </p>
            </div>
            <p className="text-base leading-[20px] translate absolute font-normal text-[#6a6a8e] font-openSans translate-y-60 group-hover:translate-y-[50px] duration-500">
              Lorem Ipsum is text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500.
            </p>
          </div>
        </div>
        {/* service 5 */}

        <div className="lg:col-span-4 flex  px-7 items-center bg-[#FBFFF1] border-b-[4px] rounded-lg border-[#FFDAA2]  h-[244px]  group ">
          <div className="overflow-hidden h-full w-full flex flex-col justify-center relative">
            <img
              className="size-[60px] group-hover:scale-0 duration-500 group-hover:-translate-y-[60px] "
              src={markImg}
              alt=""
            />
            <div className="group-hover:-translate-y-[80px] space-y-2 duration-500">
              <h3 className="text-xl font-poppins font-semibold text-[#050748]">
                Digital Marketing
              </h3>
              <p className="text-[#6a6a8e] font-openSans font-bold">
                SEO | SMO | PPC
              </p>
            </div>
            <p className="text-base leading-[20px] translate absolute font-normal text-[#6a6a8e] font-openSans translate-y-60 group-hover:translate-y-[30px] duration-500">
              Lorem Ipsum is text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Services;
