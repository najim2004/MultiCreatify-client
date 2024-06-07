import Banner from "./Banner/Banner";
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
    </div>
  );
};

export default Home;
