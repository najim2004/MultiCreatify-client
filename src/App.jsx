import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Shared/Footer";
import { StickyNavbar } from "./Shared/Navbar";

const App = () => {
  const location = useLocation();
  const isLoginOrSignUp =
    location.pathname.includes("login") || location.pathname.includes("signup");
  return (
    <div>
      {!isLoginOrSignUp && <StickyNavbar />}
      <Outlet />
      {!isLoginOrSignUp && <Footer />}
    </div>
  );
};

export default App;
