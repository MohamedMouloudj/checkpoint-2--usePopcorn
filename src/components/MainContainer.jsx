import PropTypes from "prop-types";

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export function Main({ children }) {
  return <main className="main">{children}</main>;
}
