import "./App.css";
import { useState, useEffect } from "react";
import Container from "./components/container";
import Title from "./components/title";
import ListContainer from "./components/listcontainer";
import Form from "./components/form";
import Items from "./components/items";

function App() {
  const [item, setItem] = useState([
    // { label: "Buy milk", done: false },
    // { label: "Take kids to school", done: false },
    // { label: "Go to the post office", done: false },
  ]);

  const [current, setCurrent] = useState({ done: false, label: "" });

  const [username, setUsername] = useState({ username: "fskarmeta" });

  const urlAPI = "http://localhost:5000/todos/";

  useEffect(() => {
    // createUser();
    // updateTasks();
    getTasks();
  }, []);

  // API Methods.
  // Create User

  const createUser = () => {
    fetch(`${urlAPI}user/${username.username}`, {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok !== true) {
          response.json();
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  // Get API Object
  const getTasks = () => {
    fetch(`${urlAPI}user/${username.username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setItem(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Update List with API
  const updateTasks = (array) => {
    fetch(`${urlAPI}user/${username.username}`, {
      method: "PUT",
      body: JSON.stringify(array),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  // Delete User
  const deleteUser = () => {
    fetch(`${urlAPI}user/${username.username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  // Check a Task
  function setDone(i) {
    const newItems = item.map((item, idx) => {
      if (idx === i) {
        item.done = true;
      }
      return item;
    });
    updateTasks(newItems);
    setItem(newItems);
  }

  //Uncheck a Task
  function setUnDone(i) {
    const newItems = item.map((item, idx) => {
      if (idx === i) {
        item.done = false;
      }
      return item;
    });
    updateTasks(newItems);
    setItem(newItems);
  }

  ///////////////////////////////////////////////////////////////////////////
  // LIST FUNCTIONALITIES
  // Delete all Tasks
  function clearAll() {
    let emptyArr = [];
    setItem(emptyArr);
    deleteUser();
  }

  // Capture new Task Input
  function currentText(e) {
    setCurrent({ ...current, label: e.target.value, done: false });
  }

  //Submit captured task to the list
  function submitText(e) {
    e.preventDefault();
    // createUser();
    let newItem = [...item, current];
    setItem(newItem);
    setCurrent({ label: "" });
    e.target.input.value = "";
    updateTasks(newItem);
  }

  //Delete individual Task from List
  function deleteItem(i) {
    let aux = [...item];
    let newAux = [...aux.slice(0, i), ...aux.slice(i + 1, item.length)];
    setItem(newAux);
    updateTasks(newAux);
  }

  return (
    <>
      <Container>
        <Title clearAll={clearAll} />
        <ListContainer>
          <Form currentText={currentText} submitText={submitText} />
          <Items
            item={item}
            deleteItem={deleteItem}
            setDone={setDone}
            setUnDone={setUnDone}
          />
        </ListContainer>
      </Container>
    </>
  );
}

export default App;
