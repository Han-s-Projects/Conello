import React from "react";
import { useRecoilState } from "recoil";
import { tokenState } from "@recoil/atom";
import { Link, useNavigate } from "react-router-dom";
import logo from "@assets/conello_logo.svg";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenState);

  const handleLogout = () => {
    localStorage.removeItem("trello_token");
    setToken(null);
    navigate("/");
  };

  return (
    <header className={styles.container}>
      <Link to={token ? "/boards" : "/"}>
        <img className={styles.logo} src={`${logo}`} alt="logo" />
      </Link>
      {token ? (
        <button className={styles.logout} onClick={handleLogout}>
          Log out
        </button>
      ) : null}
    </header>
  );
};

export default Header;
