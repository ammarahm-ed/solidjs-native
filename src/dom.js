import { document, aliasTagName, nativeViews } from "dominative";
aliasTagName((tag) => tag.toLowerCase());
global.document = document;
global.navigator = {
  userAgent: "Chrome",
};
globalThis.window = {
  document: global.document,
  location: {
    protocol: "http:",
  },
};
