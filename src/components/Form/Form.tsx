import React from "react";
import CardForm from "./Form.module.css";
import BoardForm from "./BoardForm.module.css";

interface Props {
  placeholder: "Add a card" | string;
  value: string;
  onChange: (e: any) => void;
  onSubmit: (e: any) => Promise<void>;
}

const Form = ({ placeholder, value, onChange, onSubmit }: Props) => {
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
