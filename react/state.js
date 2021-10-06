const context = [];
const treeContext = [];

const subscribe = (running, subscriptions) => {
  subscriptions.add(running);
  running.dependencies.add(subscriptions);
};

export const useState = (value) => {
  const subscriptions = new Set();

  const read = () => {
    const running = context[context.length - 1];
    if (running) subscribe(running, subscriptions);
    return value;
  };

  const write = (nextValue) => {
    value = nextValue;

    for (const sub of [...subscriptions]) {
      sub.execute();
    }
  };
  return [read, write];
};

const cleanup = (running) => {
  for (const dep of running.dependencies) {
    dep.delete(running);
  }
  running.dependencies.clear();
};

export const useEffect = (fn) => {
  const execute = () => {
    cleanup(running);
    context.push(running);
    try {
      fn();
    } finally {
      context.pop();
    }
  };

  const running = {
    execute,
    dependencies: new Set(),
  };

  execute();
};

export const useMemo = (fn) => {
  const [s, set] = useState();
  useEffect(() => set(fn()));
  return s;
};
