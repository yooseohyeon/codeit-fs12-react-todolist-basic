import React from "react";
import { TodoItem } from "./TodoItem";

export const TodoList = ({ todos }) => {
  const completedTodos = todos.filter((todo) => todo.completed);
  const notCompletedTodos = todos.filter((todo) => !todos.completed);

  return (
    <ul>
      {notCompletedTodos.length > 0 && (
        <div>
          <h2>할일 목록</h2>
          {notCompletedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
      {completedTodos.length > 0 && (
        <div>
          <h2>완료 목록</h2>
          {completedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </ul>
  );
};
