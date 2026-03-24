import React, { useState } from "react";

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");

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
      {!isEditing ? (
        <div>
          <strong>{todo.title}</strong>
          <button
            type="button"
            onClick={() => {
              setIsEditing(true);
              setNewTitle(todo.title);
            }}
          >
            수정
          </button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              onEdit(todo.id, newTitle);
              setIsEditing(false);
            }}
          >
            저장
          </button>
        </div>
      )}

      <span>{formattedDate}</span>
      <button type="button" onClick={() => onToggle(todo.id, todo.completed)}>
        {todo.completed ? "취소" : "완료"}
      </button>
      <button type="button" onClick={() => onDelete(todo.id)}>
        삭제
      </button>
    </li>
  );
};
