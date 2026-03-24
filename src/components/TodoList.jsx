import React from "react";
import { TodoItem } from "./TodoItem";

export const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  const completedTodos = todos.filter((todo) => todo.completed);
  const notCompletedTodos = todos.filter((todo) => !todo.completed);

  return (
    <div>
      {notCompletedTodos.length > 0 && (
        <div>
          <h2>할일 목록</h2>
          <ul>
            {notCompletedTodos.map((todo) => (
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
      {completedTodos.length > 0 && (
        <div>
          <h2>완료 목록</h2>
          <ul>
            {completedTodos.map((todo) => (
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
