import { NativeScriptConfig } from "@nativescript/core";

export default {
  id: "org.nativescript.ReactDomExp",
  appPath: "src",
  appResourcesPath: "App_Resources",
  android: {
    discardUncaughtJsExceptions: true,
    codeCache: true,
    v8Flags: "--nolazy --expose_gc --harmony_destructuring",
    markingMode: "none",
  },
} as NativeScriptConfig;
