import { atom } from "recoil";

const getTheme = () => {
  const theme =
    localStorage.conelloTheme ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  return theme;
};

const themeMode = atom({
  key: "themeMode",
  default: getTheme(),
});

export default themeMode;
