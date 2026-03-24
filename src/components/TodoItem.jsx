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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onEdit(todo.id, newTitle);
    setIsEditing(false);
  };

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
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            id={`edit-input-${todo.id}`}
            name="edit"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button type="submit">저장</button>
        </form>
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
