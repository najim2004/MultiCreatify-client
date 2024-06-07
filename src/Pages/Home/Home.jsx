import Banner from "./Banner/Banner";
import Newsletter from "./Newslatter/Newslatter";
import RelationShip from "./RelationShip/RelationShip";
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
      <RelationShip />
      <Newsletter />
    </div>
  );
};

export default Home;
