import { createPortal } from "react-dom";

const DescriptionPortal = ({ children }) => {
  const el = document.getElementById("modal");
  return createPortal(children, el);
};

export default DescriptionPortal;
