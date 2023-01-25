import styles from "./Header.module.css";
import logo from "assets/conello_logo.svg";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("trello_token");

    navigate("/");
  };

  return (
    <header className={styles.container}>
      <Link to={"/boards"}>
        <img className={styles.logo} src={logo} alt="logo" />
      </Link>
      <button className={styles.logout} onClick={handleLogout}>
        Log out
      </button>
    </header>
  );
};

export default Header;
