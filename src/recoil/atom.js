import { atom } from "recoil";

const getTheme = () => {
  // 기본 컬러 테마는 localStorage의 값 혹은 사용자의 OS에 저장된 테마를 따른다.
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
