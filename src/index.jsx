import { Application } from "@nativescript/core";
import { render } from "@dominative/solid";
import { createSignal } from "solid-js";
import Component from "./comp.jsx";

const App = () => {
  const [count, setCount] = createSignal(0);
  const increment = () => {
    setCount((c) => c + 1);
  };
  return (
    <>
      <stacklayout>
        <label>You have tapped {count()} time(s)</label>
        <Component increment={increment} />
      </stacklayout>
    </>
  );
};

const create = () => {
  render(App, document.documentElement);
  return document
};

Application.run({ create });
