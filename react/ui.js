import { useEffect } from ".";

const populateWithProps = (props, element) =>
  Object.entries(props).forEach(([key, value]) => {
    if (key === "style")
      Object.entries(value).forEach(
        ([style, value]) => (element.style[style] = value)
      );
    else {
      if (typeof value === "string") {
        element[key] = value;
        element.setAttribute(key, value);
      } else {
        element[key] = value;
      }
    }
  });

const populateWithChildren = (children, element, debug) => {
  if (Array.isArray(children))
    children.forEach((child) => {
      if (typeof child === "string")
        element.appendChild(document.createTextNode(child));
      else element.appendChild(child);
      debug && console.log(element);
    });
  else if (typeof children === "string")
    element.appendChild(document.createTextNode(children));
  else if (children) element.appendChild(children);
};

const makeElement = (element, children, props, debug) => {
  const el = document.createElement(element);

  if (props && typeof props !== "function") {
    populateWithProps(props, el);
  } else if (typeof props === "function" && props()) {
    useEffect(() => populateWithProps(props(), el));
  }

  if (children && typeof children !== "function") {
    debug && console.log("----------------------------------");
    debug && children.forEach((ch) => console.log(ch));
    populateWithChildren(children, el, debug);
  } else if (typeof children === "function" && children()) {
    debug && console.log("----------------------------------");
    debug && children().forEach((ch) => console.log(ch));
    useEffect(() => {
      el.innerHTML = "";
      populateWithChildren(children(), el, debug);
    });
  }
  debug && console.log(el);
  return el;
};

const makeComponent = (element, children, props, debug) => {
  console.log(typeof element);
  return element(props);
};

const c = (element, children, props, debug) => {
  if (element && typeof element === "string") {
    return makeElement(...Array.from(arguments));
  } else {
    return makeComponent(...Array.from(arguments));
  }
};

export { c };
