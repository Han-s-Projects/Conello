import styles from "./Header.module.css";
import logo from "assets/conello_logo.svg";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("trello_token");

    navigate("/");

    window.location.reload();
  };

  return (
    <header className={styles.container}>
      <Link to={"/boards"}>
        <img className={styles.logo} src={logo} alt="logo" />
      </Link>
      {localStorage.getItem("trello_token") ? (
        <button className={styles.logout} onClick={handleLogout}>
          Log out
        </button>
      ) : null}
    </header>
  );
};

export default Header;
