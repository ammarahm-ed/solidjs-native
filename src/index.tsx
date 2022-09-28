import "./dom.js";
import { Application } from "@nativescript/core";
import { render } from "solid-js/web";
import { App } from "./app";
const create = () => {
  console.time("createStart");
  const root = document.createElement("RootLayout");
  document.appendChild(root);
  //@ts-ignore
  console.log("render");
  //root.tagName = "RootLayout";
  //@ts-ignore
  console.log(root);
  document.activeElement = root;
  //@ts-ignore

  render(App, root);

  console.log("render");
  return root;
};

Application.run({
  //@ts-ignore
  create: create,
});
