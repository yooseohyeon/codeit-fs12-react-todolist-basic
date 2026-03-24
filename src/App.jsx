import "./App.css";
import { useState, useEffect } from "react";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { SortButtons } from "./components/SortButtons";

function App() {
  const [todos, setTodos] = useState([]);
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    const getTodos = async () => {
      const res = await fetch("http://localhost:4000/todos", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      const data = await res.json();

      setTodos(data);
    };
    getTodos();
  }, []);

  const sortByDate = (todos) =>
    [...todos].sort((a, b) => {
      return sortBy === "latest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });

  const handleAdd = async (title) => {
    const newTodo = {
      title: title,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const res = await fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    const data = await res.json();

    setTodos((prev) => [...prev, data]);
  };

  const handleToggle = async (id, completed) => {
    const res = await fetch(`http://localhost:4000/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    });

    const data = await res.json();

    setTodos((prev) => prev.map((todo) => (todo.id === id ? data : todo)));
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:4000/todos/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  const handleEdit = async (id, title) => {
    const res = await fetch(`http://localhost:4000/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title }),
    });

    const data = await res.json();

    setTodos((prev) => prev.map((todo) => (todo.id === id ? data : todo)));
  };

  const completedTodos = sortByDate(todos.filter((todo) => todo.completed));
  const notCompletedTodos = sortByDate(todos.filter((todo) => !todo.completed));

  return (
    <>
      <h1>Todo List</h1>
      <TodoForm onAdd={handleAdd} />
      <SortButtons sortBy={sortBy} setSortBy={setSortBy} />
      <TodoList
        title={"할 일 목록"}
        todos={notCompletedTodos}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <TodoList
        title={"완료 목록"}
        todos={completedTodos}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </>
  );
}

export default App;
