import React, { useReducer, useRef } from "react";
import "./App.css";

type actionName = "add" | "remove";
type action = { name: actionName; payload: any };
type todos = Array<string>;

const reducer = (current: todos, action: action): todos => {
  if (action.name === "add") {
    const newTodos = [...current];
    newTodos.push(action.payload);

    return newTodos;
  } else if (action.name === "remove") {
    return current.filter(todo => todo !== action.payload);
  }

  return [];
};

const App: React.FC = () => {
  const [data, update] = useReducer(reducer, []);
  const newTodo = useRef<HTMLInputElement>(null);

  const addToDo = () => {
    if (!newTodo.current) return;

    const text = newTodo.current.value;
    newTodo.current.value = "";
    update({ name: "add", payload: text });
  };

  return (
    <main className="App">
      <h3>Todos</h3>
      <div className="Container">
        <input ref={newTodo} type="text" />
        <button onClick={addToDo}>Add!</button>
      </div>

      {data.map(todo => {
        const onClick = () => update({ name: "remove", payload: todo });
        return (
          <div className="Todo">
            <span>{todo}</span>
            <button onClick={onClick}>remove</button>
          </div>
        );
      })}
    </main>
  );
};

export default App;
