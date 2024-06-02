// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Container from "../../../Components/Container";
import "@smastrom/react-rating/style.css";
import { Rating } from "@smastrom/react-rating";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
const testimonials = [
  {
    name: "John Doe",
    title: "Client",
    feedback:
      "The web development service was exceptional. Our website's performance and design have significantly improved. Highly recommended!",
    rating: 4.5,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Jane Smith",
    title: "Client",
    feedback:
      "Digital marketing efforts have skyrocketed our online presence. The strategies implemented were effective and results-driven.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Alice Johnson",
    title: "Client",
    feedback:
      "App development was seamless and efficient. The team delivered a high-quality app that met all our requirements.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    name: "Michael Brown",
    title: "Client",
    feedback:
      "Their customer service is top-notch. They addressed all my queries promptly and effectively. Truly commendable!",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    name: "Emily White",
    title: "Client",
    feedback:
      "The SEO services have boosted our organic traffic significantly. We are now ranking higher on search engines.",
    rating: 4.7,
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    name: "Daniel Green",
    title: "Client",
    feedback:
      "The team’s creativity and innovation in graphic design are unparalleled. Our brand's visual identity has never looked better.",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    name: "Sophia Davis",
    title: "Client",
    feedback:
      "Their email marketing campaigns are highly effective. We’ve seen a significant increase in our engagement rates.",
    rating: 4.6,
    image: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    name: "James Wilson",
    title: "Client",
    feedback:
      "The mobile app developed by the team is intuitive and user-friendly. Our users are loving the new features.",
    rating: 5.0,
    image: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    name: "Olivia Martinez",
    title: "Client",
    feedback:
      "The content marketing strategy they implemented has greatly increased our brand awareness and website traffic.",
    rating: 4.7,
    image: "https://randomuser.me/api/portraits/women/9.jpg",
  },
  {
    name: "David Anderson",
    title: "Client",
    feedback:
      "The social media management service has been outstanding. Our follower count and engagement have grown exponentially.",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    name: "Emma Thompson",
    title: "Client",
    feedback:
      "Their PPC advertising strategies have yielded great results. We’ve seen a significant increase in our conversion rates.",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    name: "William Clark",
    title: "Client",
    feedback:
      "The rebranding project was a huge success. The new brand identity resonates well with our target audience.",
    rating: 4.6,
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Isabella Lewis",
    title: "Client",
    feedback:
      "Their market research provided us with valuable insights that have informed our business strategy.",
    rating: 4.5,
    image: "https://randomuser.me/api/portraits/women/13.jpg",
  },
];

const Testimonials = () => {
  return (
    <Container>
      <div className="mx-auto relative md:my-[60px] my-20 lg:my-[100px]">
        <h1 className="lg:text-[40px] md:text-3xl text-2xl text-titleClr font-semibold text-center mb-8">
          What our clients have to say
        </h1>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
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
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper h-[375px]"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 h-[350px] rounded-lg shadow-lg text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                  <img
                    src={testimonial.image}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Rating
                  value={testimonial.rating}
                  readOnly
                  style={{ maxWidth: 100 }}
                />
                <p className="text-gray-700 font-openSans mt-4 mb-4">
                  {testimonial.feedback}
                </p>
                <div className="mt-4">
                  <h4 className="text-lg font-semibold font-poppins">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 text-sm">{testimonial.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute top-1/2 lg:-left-6 left-2 z-30 p-2 bg-black text-2xl rounded-full text-white swiper-button-prev">
          <FaArrowLeft />
        </div>
        <div className="absolute top-1/2 lg:-right-6 right-2 p-2 bg-black text-2xl rounded-full text-white  z-30 swiper-button-next">
          <FaArrowRight />
        </div>
      </div>
    </Container>
  );
};

export default Testimonials;
