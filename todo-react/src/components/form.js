const Form = ({ currentText, submitText }) => {
  return (
    <form htmlFor="input" onSubmit={(e) => submitText(e)}>
      <div className="add-text-container">
        <input
          name="input"
          id="input"
          type="text"
          placeholder="What needs to be done?"
          autoComplete="off"
          onChange={(e) => currentText(e)}
        />
        <button className="btn">
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </form>
  );
};

export default Form;
