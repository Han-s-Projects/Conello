import styles from "./Header.module.css";
import logo from "assets/conello_logo.svg";

const Header = () => {
  return (
    <>
      <header className={styles.container}>
        <a href="/">
          {/* <img className={styles.logo} src={logo} alt="logo" /> */}
          <i className="icon-board" aria-hidden="true"></i>
          로고
        </a>
        <button className={styles.logout}>Log out</button>
      </header>
    </>
  );
};

export default Header;
