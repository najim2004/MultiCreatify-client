import PropTypes from "prop-types";

const Container = ({ children }) => {
  return <div className="max-w-[1180px] mx-auto p-3">{children}</div>;
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
