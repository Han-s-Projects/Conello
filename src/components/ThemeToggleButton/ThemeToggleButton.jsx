import { useRecoilState } from 'recoil';
import styles from './ThemeToggleButton.module.css';
import themeMode from 'recoil/atom';

const ThemeToggleButton = () => {
  const [theme, setTheme] = useRecoilState(themeMode);

  localStorage.conelloTheme === 'dark' &&
    document.documentElement.setAttribute('color-theme', 'dark');

  const changeTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('color-theme', nextTheme);
    localStorage.conelloTheme = nextTheme;
    setTheme(nextTheme);
  };

  return (
    <button className={styles.container} onClick={changeTheme}>
      {theme === 'dark' ? 'light mode' : 'dark mode'}
    </button>
  );
};

export default ThemeToggleButton;
