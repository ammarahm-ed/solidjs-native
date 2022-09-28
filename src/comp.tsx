import { benchmarkSync } from "@jalik/benchmark";
import { FlexboxLayout, Label } from "@nativescript/core";
class Suite {
  jobs = {};

  add(title, job) {
    this.jobs[title] = job;
  }

  run(iterations = 50) {
    console.log("start benchmark with", Object.keys(this.jobs).length, "jobs");
    let result = benchmarkSync(this.jobs, iterations);
    console.log("end benchmark");
    return result;
  }
}

const suite = new Suite();

suite.add("new FlexboxLayout()", (count = 1000) => {
  global.gc?.();
  for (let i = 0; i < count; i++) {
    new FlexboxLayout();
  }
});

suite.add("document.createElement", (count = 1000) => {
  global.gc?.();
  for (let i = 0; i < count; i++) {
    document.createElement("FlexboxLayout");
  }
});

suite.add("nativeView.addChild", (count = 1000) => {
  global.gc?.();
  const root = new FlexboxLayout();
  for (let i = 0; i < count; i++) {
    const label = new Label();
    label.text = "Hello";
    label.backgroundColor = "red";
    root.addChild(label);
  }
});

suite.add("document.appendChild", (count = 1000) => {
  global.gc?.();
  const root = document.createElement("FlexboxLayout");
  for (let i = 0; i < count; i++) {
    const label = document.createElement("Label");
    //@ts-ignore
    label.text = "Hello";
    //@ts-ignore
    label.backgroundColor = "red";
    root.appendChild(label);
  }
});

// suite.add("document.appendChild", (count = 1000) => {
//   global.gc?.();
// });

const Component = () => {
  setTimeout(() => {
    let results = suite.run(100);
    for (let result in results) {
      console.log(result, results[result]);
    }
  }, 5000);
  console.log("rendered");
  return (
    <stackLayout>
      <button
        style={{
          color: "red",
        }}
        onTap={() => {
          let results = suite.run(100);
          for (let result in results) {
            console.log(result, results[result]);
          }
        }}
        text="Run Benchmark"
      />
    </stackLayout>
  );
};

export default Component;
