import React from "react";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
}

const DescriptionPortal = ({ children }: Props) => {
  const el = document.getElementById("modal");

  if (el) {
    return createPortal(children, el);
  } else {
    console.error(
      'DescriptionPortal 컴포넌트에 document.getElementById("modal")의 값이 null입니다.'
    );
    return null;
  }
};

export default DescriptionPortal;
