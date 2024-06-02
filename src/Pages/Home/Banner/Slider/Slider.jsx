import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
// import required modules
import { Autoplay, EffectCoverflow } from "swiper/modules";
import slider1 from "../../../../assets/slider1.jpg";
import slider2 from "../../../../assets/slider2.jpg";
import slider3 from "../../../../assets/slider3.jpg";
import slider4 from "../../../../assets/slider4.jpg";
import slider5 from "../../../../assets/slider5.jpg";
// import slider6 from "../../../../assets/slider6.jpg";
const Slider = () => {
  return (
    <div className="max-w-[350px] rounded-lg overflow-hidden md:max-w-[600px] lg:max-w-[650px] !mb-20 lg:!mb-0 mx-auto h-[365px]">
      <Swiper
        
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        spaceBetween={20}
        centeredSlides={true}
        // slidesPerView={"auto"}
        
        pagination={true}
        breakpoints={{
          // when window width is smaller than sm breakpoint

          640: {
            slidesPerView: 1,
          },
          // when window width is between sm and md breakpoint
          768: {
            slidesPerView: 2,
          },
          // when window width is between md and lg breakpoint
          1024: {
            slidesPerView: 3,
          },
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="">
            <img
              className="w-full rounded-2xl h-[360px]"
              src={slider1}
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="">
            <img
              className="w-full rounded-2xl h-[360px]"
              src={slider2}
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="">
            <img
              className="w-full rounded-2xl h-[360px]"
              src={slider3}
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="">
            <img
              className="w-full rounded-2xl h-[360px]"
              src={slider4}
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="">
            <img
              className="w-full rounded-2xl h-[360px]"
              src={slider5}
              alt=""
            />
          </div>
        </SwiperSlide>
        {/* <SwiperSlide>
          <div className="">
            <img src={slider6} alt="" />
          </div>
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export default Slider;
