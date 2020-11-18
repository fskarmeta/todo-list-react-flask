const Title = ({ clearAll }) => {
  return (
    <div className="title-container">
      <span className="title-text">Todo List</span>
      <i
        className="fas fa-recycle delete"
        title="Delete all tasks"
        onClick={clearAll}
      ></i>
    </div>
  );
};

export default Title;
