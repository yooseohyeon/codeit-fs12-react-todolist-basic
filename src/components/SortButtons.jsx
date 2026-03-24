import React, { useState } from "react";

export const SortButtons = ({ setTodos }) => {
  const [sortBy, setSortBy] = useState("latest");

  const handelSortChange = (value) => {
    setSortBy(value);

    if (value === "oldest") {
      setTodos((prev) =>
        [...prev].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
      );
    } else {
      setTodos((prev) =>
        [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      );
    }
  };

  return (
    <select value={sortBy} onChange={(e) => handelSortChange(e.target.value)}>
      <option value="latest">최신순</option>
      <option value="oldest">등록순</option>
    </select>
  );
};
