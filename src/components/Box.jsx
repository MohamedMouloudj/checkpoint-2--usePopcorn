import { useState } from "react";
import { Button } from "./Button";
import PropType from "prop-types";

Box.propTypes = {
  children: PropType.node,
};

export function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  function handleToggle() {
    setIsOpen((open) => !open);
  }
  return (
    <div className="box">
      <Button className="btn-toggle" onClick={handleToggle}>
        {isOpen ? "-" : "+"}
      </Button>
      {isOpen && children}
    </div>
  );
}
