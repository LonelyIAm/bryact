import { c } from "../react";

const Todo = ({ todo, done, toggle, remove }) =>
  c(
    "li",
    [
      todo,
      c("button", done ? "not done" : "done", {
        onclick: toggle,
      }),
      c("button", "delete", {
        onclick: remove,
      }),
    ],
    () =>
      done
        ? {
            style: {
              textDecoration: "line-through",
            },
          }
        : null
  );

export default Todo;
