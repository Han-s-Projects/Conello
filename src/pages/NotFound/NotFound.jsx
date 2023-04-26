import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';
import ToggleTheme from 'components/ThemeToggleButton/ThemeToggleButton';
import Header from 'components/Header/Header';

const NotFound = () => {
  const navigate = useNavigate();
  const ReturnToHome = () => {
    navigate('/');
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
