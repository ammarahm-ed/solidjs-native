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

/***
 * Creates a performance.now() function
 */
if (!global.performance) {
  global.performance = {};
}
if (!global.performance.now) {
  if (global.android) {
    global.performance.now = function () {
      return java.lang.System.nanoTime() / 1000000;
    };
  } else if (global.ios) {
    global.performance.now = function () {
      return CACurrentMediaTime();
    };
  }
}
