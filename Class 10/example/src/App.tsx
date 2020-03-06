import React, { useReducer, useRef } from "react";
import "./App.css";

type action_t = "add" | "remove";
type todos = Array<string>;

const reducer = (current: todos, action: { name: action_t; payload: any }) => {
  if (action.name === "add") {
    const newTodos = [...current];
    newTodos.push(action.payload);

    return newTodos;
  }

  if (action.name === "remove") {
    return current.filter(todo => todo !== action.payload);
  }

  return [] as todos;
};

const App: React.FC = () => {
  const [data, update] = useReducer(reducer, []);

  const newTodo = useRef(null as any);

  return (
    <main className="App">
      <div
        style={{
          margin: "1rem",
          padding: "1rem",
          backgroundColor: "tomato",
          borderRadius: "1rem"
        }}
      >
        <input ref={newTodo} type="text" />
        <button
          onClick={() => {
            const newData = newTodo.current.value;
            newTodo.current.value = "";
            update({ name: "add", payload: newData });
          }}
        >5
          Add!
        </button>
        <br />
        <br />
        {data.map(todo => (
          <div style={{ color: "white", fontSize: "1.3rem" }}>
            {" "}
            {todo}
            <button onClick={() => update({ name: "remove", payload: todo })}>
              remove
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default App;
