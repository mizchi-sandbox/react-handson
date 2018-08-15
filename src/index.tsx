import React from "react";
import ReactDOM from "react-dom";

function Child(props: { value: string }) {
  return <p>{props.value}</p>;
}

function App() {
  return (
    <>
      Hello
      <Child value="xxx" />
      <Child value="yyy" />
    </>
  );
}

ReactDOM.render(<App />, document.querySelector(".root"));
