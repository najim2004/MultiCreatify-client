import { FaPlayCircle } from "react-icons/fa";
import Slider from "./Slider/Slider";
import bannerImg from "../../../assets/banner.svg";
const Banner = () => {
  return (
    <div className="w-full relative gap-6 overflow-hidden pt-16 lg:pt-0 lg:gap-[200px] min-h-screen flex flex-col lg:flex-row items-center justify-around bg-[#3B23AC] bg-no-repeat bg-cover">
      <div
        className="absolute inset-0 top-0 bg-no-repeat bg-cover opacity-20"
        style={{ backgroundImage: `url(${bannerImg})` }}
      ></div>
      <div className="max-w-[400px] items-center mt-10 lg:mt-0 lg:items-start flex flex-col">
        <h3 className="font-poppins text-center lg:text-start leading-[34px] md:leading-[48px] lg:leading-[68px] md:text-4xl text-3xl lg:text-6xl text-white font-bold">
          WEB.
          <br />
          MOBILE.
          <br />
          GRAPHIC.
          <br />
          MARKETING.
        </h3>
        <p className="font-openSans mt-7 md:10 text-center lg:text-start lg:mt-[60px] md:mb-8 mb-6 lg:mb-[40px] leading-7 text-lg text-[#fff000]">
          Website and App development solution for transforming and innovating
          businesses.
        </p>
        <button className="btn !bg-gradient-to-r w-[150px] text-white h-14 rounded-full text-xl font-medium font-openSans from-orange-800 to-orange-400">
          Get Started
        </button>
      </div>
      <div className="fle-1 space-y-20">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <FaPlayCircle className="text-6xl bg-red-800 text-white rounded-full" />
          <p className="text-white text-xl leading-7">
            <span className="text-[#fff000]">WE DESIGN DIGITAL SOLUTIONS</span>
            <br />
            FOR BRANDS AND COMPANIES
          </p>
        </div>
        <Slider />
      </div>
    </div>
  );
};

export default Banner;
