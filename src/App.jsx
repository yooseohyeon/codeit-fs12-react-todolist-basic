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
    if (!title.trim()) return;

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

  return (
    <>
      <h1>Todo List</h1>
      <TodoForm onAdd={handleAdd} />
      <SortButtons setTodos={setTodos} />
      <TodoList
        todos={todos}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </>
  );
}

export default App;
