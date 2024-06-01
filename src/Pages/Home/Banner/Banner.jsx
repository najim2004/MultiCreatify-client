import { FaPlayCircle } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="w-full gap-[200px] h-screen flex items-center justify-center bg-[#3B23AC]">
      <div className="max-w-[400px]">
        <h3 className="font-poppins leading-[68px] text-6xl text-white font-bold">
          WEB.
          <br />
          MOBILE.
          <br />
          GRAPHIC.
          <br />
          MARKETING.
        </h3>
        <p className="font-openSans mt-[80px] mb-[40px] leading-7 text-lg text-[#fff000]">
          Website and App development solution for transforming and innovating
          businesses.
        </p>
        <button className="btn !bg-gradient-to-r w-[150px] text-white h-14 rounded-full text-xl font-medium font-openSans from-orange-800 to-orange-400">
          Get Started
        </button>
      </div>
      <div className="fle-1">
        <div className="flex items-center gap-6">
          <FaPlayCircle className="text-6xl bg-red-800 text-white rounded-full" />
          <p className="text-white text-xl leading-7">
            <span className="text-[#fff000]">WE DESIGN DIGITAL SOLUTIONS</span>
            <br />
            FOR BRANDS AND COMPANIES
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
