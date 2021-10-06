import { useEffect, useStateWithoutEffect } from ".";

const populateWithProps = (props, element) =>
  Object.entries(props).forEach(([key, value]) => {
    if (key === "style")
      Object.entries(value).forEach(
        ([style, value]) => (element.style[style] = value)
      );
    else {
      element[key] = value;
      if (typeof value === "string") {
        element.setAttribute(key, value);
      }
    }
  });

const processChildren = (children, effect, noeffect) => {
  if (typeof children === "function") useEffect(effect(children));
  else noeffect(children);
};

const populateWithChildren = (children, element) => {
  try {
    let [first, setFirst] = useStateWithoutEffect(true);
    const method = (c) => {
      c.forEach((child, idx) => {
        if (typeof child === "string")
          element.appendChild(document.createTextNode(child));
        else if (typeof child === "function" && typeof child() === "string")
          element.appendChild(document.createTextNode(child()));
        else if (typeof child === "function") element.appendChild(child());
        else if (child) element.appendChild(child);

        useEffect(() => {
          if (!first()) {
            console.log("updating");
            if (typeof child === "string")
              element.replaceChild(
                document.createTextNode(child),
                element.chilNodes[idx]
              );
            else if (typeof child === "function" && typeof child() === "string")
              element.replaceChild(
                document.createTextNode(child()),
                element.chilNodes[idx]
              );
            else if (typeof child === "function")
              element.replaceChild(child(), element.chilNodes[idx]);
            else if (child) element.replaceChild(child, element.chilNodes[idx]);
          }
        });
      });
    };

    processChildren(
      children,
      (children) => () => method(children()),
      (children) => method(children)
    );
    setFirst(false);
  } catch (error) {
    console.log(element, children);
  }
};

const makeElement = (element, children, props) => {
  const el = document.createElement(element);

  if (props && typeof props !== "function") {
    populateWithProps(props, el);
  } else if (typeof props === "function" && props()) {
    useEffect(() => populateWithProps(props(), el));
  }

  populateWithChildren(children, el);

  return el;
};

const makeComponent = (element, props) => {
  if (props && typeof props !== "function") {
    return element(props);
  } else if (typeof props === "function" && props()) {
    return element(props());
  }
};

const c = (element, props, { children }) => {
  if (element && typeof element === "string") {
    return makeElement(element, children, props);
  } else {
    return makeComponent(element, props);
  }
};

export { c };
