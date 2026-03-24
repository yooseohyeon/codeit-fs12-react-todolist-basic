import React from "react";
import { TodoItem } from "./TodoItem";

export const TodoList = ({ todos, setTodos }) => {
  const completedTodos = todos.filter((todo) => todo.completed);
  const notCompletedTodos = todos.filter((todo) => !todo.completed);

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

  const handleUpdate = async (id, title) => {
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
    <ul>
      {notCompletedTodos.length > 0 && (
        <div>
          <h2>할일 목록</h2>
          {notCompletedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
      {completedTodos.length > 0 && (
        <div>
          <h2>완료 목록</h2>
          {completedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </ul>
  );
};
