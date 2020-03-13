import React, { useReducer, useRef } from "react";
import "./App.css";

type actionName = "add" | "remove" | "complete";
type action = { name: actionName; payload: any };
type todos = Array<{ text: string; completed: boolean }>;

const reducer = (current: todos, action: action): todos => {
  if (action.name === "add") {
    const newTodos = [...current];
    newTodos.push({ text: action.payload, completed: false });
    return newTodos;
  } else if (action.name === "remove") {
    return current.filter(todo => todo !== action.payload);
  } else if (action.name === "complete") {
    const newTodos = [...current];
    newTodos[action.payload].completed = !newTodos[action.payload].completed;

    return newTodos;
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
        <input
          ref={newTodo}
          onKeyPress={e => {
            if (e.which === 13) addToDo();
          }}
          type="text"
        />
        <button onClick={addToDo}>Add!</button>
      </div>

      {data.map(({ text, completed }, index) => {
        const onClick = () => update({ name: "remove", payload: text });
        return (
          <div className="Todo">
            <input
              type="checkbox"
              onClick={() => update({ name: "complete", payload: index })}
              checked={completed}
            />
            <span style={completed ? { textDecoration: "line-through" } : {}}>
              {text}
            </span>
            <button onClick={onClick}>remove</button>
          </div>
        );
      })}
    </main>
  );
};

export default App;
