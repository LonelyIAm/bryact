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

  return c("div", null, {
    children: [
      c(
        "input",
        () => ({
          placeholder: "New Todo",
          value: todo(),
          oninput: handleNewTodoInputChange,
        }),
        { children: [] }
      ),
      c(
        "select",
        {
          onclick: handleFilterSelectChange,
        },
        {
          children: [
            c("option", { value: "all" }, { children: ["all"] }),
            c("option", { value: "done" }, { children: ["done"] }),
            c("option", { value: "undone" }, { children: ["undone"] }),
          ],
        }
      ),
      c(
        "button",
        {
          onclick: handleAddTodo,
        },
        { children: ["Add Todo"] }
      ),
      c("span", null, {
        children: [
          () => `Done: ${todosDoneLength()} | Not Done: ${todosUndoneLength()}`,
        ],
      }),
    ],
  });
};

export default TodoBar;
