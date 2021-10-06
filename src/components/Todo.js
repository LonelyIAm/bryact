import { c } from "../react";

const Todo = ({ todo, done, toggle, remove }) =>
  c(
    "li",
    () =>
      done
        ? {
            style: {
              textDecoration: "line-through",
            },
          }
        : null,
    {
      children: [
        todo,
        c(
          "button",
          {
            onclick: toggle,
          },
          { children: [done ? "not done" : "done"] }
        ),
        c(
          "button",
          {
            onclick: remove,
          },
          { children: ["delete"] }
        ),
      ],
    }
  );

export default Todo;
