import { c, useState, useMemo } from "../react";

const TodoBar = ({ todos, setTodos, setFilter }) => {
  // State
  const [todo, setTodo] = useState("");

  // Derived State
  const todosDoneLength = useMemo(
    () => todos().filter((todo) => todo.done).length
  );
  const todosUndoneLength = useMemo(
    () => todos().filter((todo) => !todo.done).length
  );

  // Handlers
  const handleNewTodoInputChange = (e) => setTodo(e.target.value);
  const handleFilterSelectChange = (e) =>
    setFilter(e.target.selectedOptions[0].value);
  const handleAddTodo = () => {
    setTodos([
      ...todos(),
      {
        id: todos().length ? todos()[todos().length - 1].id + 1 : 0,
        todo: todo(),
        done: false,
      },
    ]);
    setTodo("");
  };

  return c("div", [
    c("input", null, () => ({
      placeholder: "New Todo",
      value: todo(),
      oninput: handleNewTodoInputChange,
    })),
    c(
      "select",
      [
        c("option", "all", { value: "all" }),
        c("option", "done", { value: "done" }),
        c("option", "undone", { value: "undone" }),
      ],
      {
        onclick: handleFilterSelectChange,
      }
    ),
    c("button", "Add Todo", {
      onclick: handleAddTodo,
    }),
    c(
      "span",
      () => `Done: ${todosDoneLength()} | Not Done: ${todosUndoneLength()}`
    ),
  ]);
};

export default TodoBar;
