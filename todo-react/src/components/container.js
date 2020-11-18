const Container = ({ children }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="todo-container">{children}</div>
      </div>
    </div>
  );
};

export default Container;
