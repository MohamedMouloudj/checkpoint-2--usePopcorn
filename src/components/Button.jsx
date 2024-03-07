import PropType from "prop-types";

Button.propTypes = {
  children: PropType.node.isRequired,
  onClick: PropType.func.isRequired,
  className: PropType.string,
};

export function Button({ children, onClick, className }) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
