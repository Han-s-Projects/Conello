const Form = ({ placeholder, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input placeholder={placeholder} onChange={onChange} />
      <button>Create</button>
    </form>
  );
};

export default Form;
