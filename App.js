import { c, useState } from "./react";
import Todos from "./components/Todos";
import TodoBar from "./components/TodoBar";

const App = () => {
  // State
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  return c(
    "main",
    [
      c(TodoBar, { todos, setTodos, setFilter }),
      c(Todos, { todos, setTodos, filter }),
    ],
    null
  );
};

export default App;
