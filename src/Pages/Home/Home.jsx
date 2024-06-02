import Banner from "./Banner/Banner";
import Services from "./Services/Services";
import ShortAbout from "./ShortAbout/ShortAbout";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <ShortAbout />
      <Services />
      <Testimonials />
    </div>
  );
};

export default Home;
