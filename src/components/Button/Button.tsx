import React from "react";
import styles from "./Button.module.css";

interface Props {
  name?: string;
  func: () => void;
}

const Button = ({ name = "edit title", func }: Props) => {
  return (
    <button className={styles.menu} onClick={func}>
      {name}
    </button>
  );
};

export default Button;
