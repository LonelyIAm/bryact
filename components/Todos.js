import { c, useMemo } from "../react";
import Todo from "./Todo";

const Todos = ({ todos, setTodos, filter }) => {
  // Handlers
  const handleToggleTodo = (id) =>
    setTodos(
      todos().map((Todo) =>
        Todo.id === id ? { ...Todo, done: !Todo.done } : Todo
      )
    );
  const handleDeleteTodo = (id) =>
    setTodos(todos().filter((Todo) => Todo.id !== id));

  return c(
    "ul",
    useMemo(() =>
      todos()
        .filter((todo) => {
          if (filter() === "done") {
            if (todo.done) return true;
            else return false;
          }
          if (filter() === "undone") {
            if (!todo.done) return true;
            else return false;
          }
          return true;
        })
        .map(({ todo, id, done }) =>
          c(Todo, {
            todo,
            done,
            remove: handleDeleteTodo.bind(null, id),
            toggle: handleToggleTodo.bind(null, id),
          })
        )
    )
  );
};

export default Todos;
