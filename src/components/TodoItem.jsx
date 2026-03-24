import React from "react";

export const TodoItem = ({ todo }) => {
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
    </li>
  );
};
