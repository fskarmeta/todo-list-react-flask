const Items = ({ item, deleteItem, setDone, setUnDone }) => {
  return (
    <div className="add-items-container">
      {item.map((element, index) => (
        <div className="item" key={index}>
          <span
            className="item-text"
            style={element.done ? { textDecoration: "line-through" } : null}
          >
            {element.label}
          </span>
          <div className="icons">
            <i
              className="far fa-check-square"
              style={element.done ? null : { display: "none" }}
              onClick={() => setUnDone(index)}
            ></i>
            <i
              className="far fa-square"
              style={element.done ? { display: "none" } : null}
              onClick={() => setDone(index)}
            ></i>
            <i className="fas fa-trash" onClick={() => deleteItem(index)}></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Items;
