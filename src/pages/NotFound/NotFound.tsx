import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@components/Header/Header";
import ToggleTheme from "@components/ThemeToggleButton/ThemeToggleButton";
import styles from "./NotFound.module.css";
import { useRecoilValue } from "recoil";
import { tokenState } from "@recoil/atom";

const NotFound = () => {
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);
  const ReturnToHome = () => {
    token ? navigate("/boards") : navigate("/");
  };
  return (
    <>
      <Header />
      <div className={styles.NotFoundWrapper}>
        <p className={styles.NotFoundValue}>
          Page not found. Returning to the homepage.
        </p>
        <button className={styles.NotFoundBtn} onClick={ReturnToHome}>
          Return to home
        </button>
      </div>
      <ToggleTheme />
    </>
  );
};

export default NotFound;
