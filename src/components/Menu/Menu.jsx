import styles from "./Menu.module.css";

const Menu = ({ children }) => {
  return <div className={styles.menu}>{children}</div>;
};

export default Menu;
