import React from "react";
import { useRecoilState } from "recoil";
import themeMode from "@recoil/atom";
import styles from "./ThemeToggleButton.module.css";

const ThemeToggleButton = () => {
  const [theme, setTheme] = useRecoilState(themeMode);

  localStorage.conelloTheme === "dark" &&
    document.documentElement.setAttribute("color-theme", "dark");

  const changeTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("color-theme", nextTheme);
    localStorage.conelloTheme = nextTheme;
    setTheme(nextTheme);
  };

  return (
    <button className={styles.container} onClick={changeTheme}>
      {theme === "dark" ? "light mode" : "dark mode"}
    </button>
  );
};

export default ThemeToggleButton;
