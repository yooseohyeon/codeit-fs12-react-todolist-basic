import "./App.css";
import { useState, useEffect } from "react";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { SortButtons } from "./components/SortButtons";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const res = await fetch("http://localhost:4000/todos", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      const data = await res.json();

      // 최신순 정렬
      setTodos(
        [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      );
    };
    getTodos();
  }, []);

  return (
    <>
      <h1>Todo List</h1>
      <TodoForm setTodos={setTodos} />
      <SortButtons setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </>
  );
}

export default App;
