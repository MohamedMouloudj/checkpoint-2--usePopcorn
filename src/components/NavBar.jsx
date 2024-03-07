import PropType from "prop-types";
NavBar.propTypes = {
  children: PropType.node.isRequired,
};

export function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
