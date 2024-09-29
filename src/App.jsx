import { useState, useEffect } from "react";
import TodoItem from "./components/todoitem/todoItem";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const addItem = () => {
    if (inputText.trim() !== "") {
      setItems((prev) => [...prev, inputText]);
      setInputText("");
    }
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item, index) => index !== id));
  };

  return (
    <div className="container">
      <div className="cont shadow mt-5">
        <div className="text-center">
          <h1 className="my-3">To Do List</h1>
        </div>
        <div className="form text-center">
          <input
            className="py-2 px-2 rounded-start-2 "
            type="text"
            value={inputText}
            onChange={handleChange}
            placeholder="some words"
          />
          <button
            className="py-2 px-3 color outlinebtn rounded-end-2"
            onClick={addItem}
          >
            <span
              style={{ fontSize: "20px", lineHeight: "1" }}
              className="text-white"
            >
              +
            </span>
          </button>
        </div>
        <div>
          <hr className="w-75 m-auto d-block my-4 border-3" />
          <ol className="p-0 m-0">
            {items.map((item, index) => (
              <TodoItem
                task={item}
                id={index}
                key={index}
                onChecked={deleteItem}
              />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
