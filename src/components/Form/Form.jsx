const Form = ({ placeholder }) => {
  return (
    <>
      <form>
        <input placeholder={placeholder} />
        <button>Create</button>
      </form>
    </>
  );
};

export default Form;
