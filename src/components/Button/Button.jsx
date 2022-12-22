import styles from "./Button.module.css";

const Button = ({ name = "edit title", func }) => {
  return (
    <button className={styles.menu} onClick={func}>
      {name}
    </button>
  );
};

export default Button;
