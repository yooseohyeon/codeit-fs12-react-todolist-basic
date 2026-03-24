import "./App.css";
import { useState } from "react";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { SortButtons } from "./components/SortButtons";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "리액트 공부하기",
      completed: false,
      createdAt: "2026-03-18T12:00:00.000Z",
    },
    {
      id: 2,
      title: "장보기",
      completed: true,
      createdAt: "2026-03-18T12:00:00.000Z",
    },
    {
      id: 3,
      title: "운동하기",
      completed: false,
      createdAt: "2026-03-18T12:00:00.000Z",
    },
  ]);
  return (
    <>
      <h1>Todo List</h1>
      <TodoForm setTodos={setTodos} />
      <SortButtons setTodos={setTodos} />
      <TodoList setTodos={setTodos} />
    </>
  );
}

export default App;
