import { Outlet } from "react-router-dom";
import Footer from "./Shared/Footer";
import { StickyNavbar } from "./Shared/Navbar";

const App = () => {
  return (
    <div>
      <StickyNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
