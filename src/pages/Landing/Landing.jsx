import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Landing.module.css";
import axios from "axios";
import Header from "components/Header/Header";
import ToggleTheme from "components/ThemeToggleButton/ThemeToggleButton";

const Landing = () => {
  const navigate = useNavigate();

  const handleAuthentification = () => {
    const authenticationSuccess = async () => {
      const token = localStorage.getItem("trello_token");

      const { data } = await axios.get(
        `https://api.trello.com/1/members/me/?key=${process.env.REACT_APP_KEY}&token=${token}`
      );

      navigate("/boards", {
        state: {
          idOrganizations: data.idOrganizations,
          token,
        },
      });
    };

    window.Trello.authorize({
      type: "popup",
      name: "Conello",
      scope: {
        read: "true",
        write: "true",
      },
      expiration: "1day",
      success: authenticationSuccess,
    });
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>아틀라시안 계정으로 시작하기</h1>
        <p className={styles.p}>
          아틀라시안 계정을 연동하여 Conello를 즐겨보세요!
        </p>
        <button className={styles.btn} onClick={handleAuthentification}>
          연동하기
        </button>
      </div>
      <ToggleTheme />
    </>
  );
};

export default Landing;
