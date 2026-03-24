import React, { useState } from "react";

export const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="할일을 입력해주세요"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button type="button" onClick={handleSubmit}>
        제출
      </button>
    </div>
  );
};
