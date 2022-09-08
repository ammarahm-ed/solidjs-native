import { Application } from "@nativescript/core";
import "./dom.js";
import { createSignal, onCleanup, Component } from "solid-js";
import { render, template } from "solid-js/web/dist/web";
console.log("render is a", render, template);

const App = () => {
  const [count, setCount] = createSignal(0),
    timer = setInterval(() => setCount((c) => c + 1), 1000);
  onCleanup(() => clearInterval(timer));
  return <div>{count()}</div>;
};

Application.run({
  //@ts-ignore
  create: () => {
    const root = document.createElement("FlexboxLayout");
    document.appendChild(root);
    //@ts-ignore
    root.tagName = "FlexboxLayout";
    //@ts-ignore
    document.activeElement = root;
    //@ts-ignore
    //render(App, root);
    return root;
  },
});
