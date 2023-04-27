import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@assets/conello_logo.svg";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("trello_token");

    navigate("/");

    window.location.reload();
  };

  return (
    <header className={styles.container}>
      <Link to={localStorage.getItem("trello_token") ? "/boards" : "/"}>
        <img className={styles.logo} src={`${logo}`} alt="logo" />
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
