import React from "react";
import { TodoItem } from "./TodoItem";

export const TodoList = ({ title, todos, onToggle, onDelete, onEdit }) => {
  return (
    <div>
      {todos.length > 0 && (
        <div>
          <h2>{title}</h2>
          <ul>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
