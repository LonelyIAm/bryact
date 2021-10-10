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

        const hasChildren = element.hasChildNodes();

        useEffect(() => {
          if (!first() && hasChildren && element.childNodes.length) {
            if (typeof child === "string")
              element.replaceChild(
                document.createTextNode(child),
                element.childNodes[idx]
              );
            else if (typeof child === "function" && typeof child() === "string")
              element.replaceChild(
                document.createTextNode(child()),
                element.childNodes[idx]
              );
            else if (typeof child === "function") {
              element.replaceChild(child(), element.childNodes[idx]);
              element.nodeName === "SPAN" &&
                console.log(child(), element.childNodes[idx]);
            } else if (child)
              element.replaceChild(child, element.childNodes[idx]);
          } else if (!first()) {
            console.log(children);
            element.innerHTML = "";
            if (typeof child === "string")
              element.appendChild(document.createTextNode(child));
            else if (typeof child === "function" && typeof child() === "string")
              element.appendChild(document.createTextNode(child()));
            else if (typeof child === "function") element.appendChild(child());
            else if (child) element.appendChild(child);
          }
        });
      });
    };

    processChildren(
      children,
      (c) => () => method(c()),
      (c) => method(c)
    );
    setFirst(false);
  } catch (error) {
    console.log(element, children, error && true);
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
