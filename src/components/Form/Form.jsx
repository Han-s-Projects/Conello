import CardForm from "./Form.module.css";
import BoardForm from "./BoardForm.module.css";

const Form = ({ placeholder, value, onChange, onSubmit }) => {
  const styles = placeholder === "Add a card" ? CardForm : BoardForm;
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        className={styles.input}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <button className={styles.btn}>Create</button>
    </form>
  );
};

export default Form;
