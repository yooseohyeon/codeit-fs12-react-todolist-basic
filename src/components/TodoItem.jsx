import React, { useState } from "react";

export const TodoItem = ({
  todo,
  handleToggle,
  handleDelete,
  handleUpdate,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);
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
      {!isUpdate ? (
        <div>
          <strong>{todo.title}</strong>
          <button
            type="button"
            onClick={() => {
              setIsUpdate(true);
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
              handleUpdate(todo.id, newTitle);
              setIsUpdate(false);
            }}
          >
            저장
          </button>
        </div>
      )}

      <span>{formattedDate}</span>
      <button
        type="button"
        onClick={() => handleToggle(todo.id, todo.completed)}
      >
        {todo.completed ? "취소" : "완료"}
      </button>
      <button type="button" onClick={() => handleDelete(todo.id)}>
        삭제
      </button>
    </li>
  );
};
