const updateTheme = (theme: string) => {
  if (theme === "dark") {
    document.documentElement.setAttribute("color-theme", "dark");
    localStorage.conelloTheme = "dark";
  } else {
    document.documentElement.removeAttribute("color-theme");
    localStorage.conelloTheme = "light";
  }
};

export default updateTheme;
