import { useRecoilState } from "recoil";
import styles from "./ThemeToggleButton.module.css";
import themeMode from "recoil/atom";

const ThemeToggleButton = () => {
  const [theme, setTheme] = useRecoilState(themeMode);

  const changeTheme = () => {
    if (theme === "dark") {
      document.documentElement.removeAttribute("color-theme");
      localStorage.conelloTheme = "light";
      setTheme("light");
    } else {
      document.documentElement.setAttribute("color-theme", "dark");
      localStorage.conelloTheme = "dark";
      setTheme("dark");
    }
  };

  return (
    <button className={styles.container} onClick={changeTheme}>
      {theme === "dark" ? "light mode" : "dark mode"}
    </button>
  );
};

export default ThemeToggleButton;
