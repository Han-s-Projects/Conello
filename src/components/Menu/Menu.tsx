import React from "react";
import styles from "./Menu.module.css";

interface Props {
  children: React.ReactNode;
}

const Menu = ({ children }: Props) => {
  return <div className={styles.menu}>{children}</div>;
};

export default Menu;
