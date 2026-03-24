import React, { useState } from "react";

export const TodoForm = ({ setTodos }) => {
  const [title, setTitle] = useState("");

  const handleAdd = async () => {
    if (!title.trim()) return;

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
    setTitle("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="할일을 입력해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="button" onClick={() => handleAdd()}>
        제출
      </button>
    </div>
  );
};
