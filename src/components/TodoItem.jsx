import React, { useState } from "react";

export const TodoItem = ({ todo, handleToggle, handleDelete }) => {
  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(todo.createdAt));

  return (
    <li>
      <h3>{todo.title}</h3>
      <span>{formattedDate}</span>
      <button
        type="button"
        onClick={() => handleToggle(todo.id, todo.completed)}
      >
        {todo.completed ? "완료" : "취소"}
      </button>
      <button type="button" onClick={() => handleDelete(todo.id)}>
        삭제
      </button>
    </li>
  );
};
