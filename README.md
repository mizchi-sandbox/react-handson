# React Handson

# Seup build env

```bash
npm install -g yarn

# init repo
mkdir react-handson
cd react-handson
git init

yarn init -y
yarn add react react-dom
yarn add webpack webpack-cli html-webpack-plugin webpack-serve --dev
```

Edit files

```js
// src/index.js
import React from "react";
import ReactDOM from "react-dom";

// No jsx
ReactDOM.render(
  React.createElement("h1", null, "Hello"),
  document.querySelector(".root")
);
```

```html
<html>

<head>
  <meta charset="utf-8">
</head>

<body>
  <div class="root"></div>
</body>

</html>
```

```js
// webpack.config.js
const HTMLPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [
    new HTMLPlugin({
      template: "src/index.html"
    })
  ]
};
```

Build

```bash
yarn webpack-serve --port 10000
# src/index.js => dist/main.js
# src/index.html => dist/index.html

# or

./node_modules/bin/webpack
```

## With Babel@7

```bash
yarn add @babel/core @babel/preset-env @babel/preset-react babel-loader@8.0.0-beta
.4 -D
echo '{ "presets": ["@babel/preset-env", "@babel/preset-react"] }' > .babelrc
```

Edit webpack config

```js
// webpack.config.js
const HTMLPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [
    new HTMLPlugin({
      template: "src/index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
};
```

Use babel

```js
// src/index.js
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(<h1>Hello</h1>, document.querySelector(".root"));
```

## With TypeScript

```bash
# webpack
yarn add typescript ts-loader -D

# type definition
yarn add @types/node @types/react @types/react-dom -D

yarn tsc --init # generate tsconfig.json
```

Edit `tsconfig.js`

```json
    ...
    "jsx": "react",
    "moduleResolution": "node",
    ...
```

```js
const HTMLPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [
    new HTMLPlugin({
      template: "src/index.html"
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  }
};
```

Use ts(x)

```ts
// src/index.tsx
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(<h1>Hello</h1>, document.querySelector(".root"));
```

Type check

```
yarn tsc -p . --noEmit
```

## How to use react

Simple

```ts
// src/index.tsx
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(<h1>Hello</h1>, document.querySelector(".root"));
```

Class Component

```ts
// src/index.tsx
import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  render() {
    return <h1>Hello</h1>;
  }
}

ReactDOM.render(<App />, document.querySelector(".root"));
```

SFC

```ts
// src/index.tsx
import React from "react";
import ReactDOM from "react-dom";

function App() {
  return <h1>Hello</h1>;
}

ReactDOM.render(<App />, document.querySelector(".root"));
```

## Props

```tsx
// src/index.tsx
import React from "react";
import ReactDOM from "react-dom";

function App(props: { name: string }) {
  return <h1>Hello, {props.name}</h1>;
}

ReactDOM.render(<App name="anonymous" />, document.querySelector(".root"));
```

## Children

```tsx
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
```

## State

```tsx
// src/index.tsx
import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component<{}, { value: number }> {
  state = {
    value: 0
  };
  render() {
    return (
      <div>
        <button
          onClick={ev => {
            this.setState({ value: this.state.value + 1 });
          }}
        >
          {this.state.value}
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".root"));
```

## Lifecycle

```tsx
// src/index.tsx
import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component<{}, { value: number }> {
  state = {
    value: 0
  };
  componentDidMount() {
    console.log("mounted");
  }
  componentDidUpdate() {
    console.log("updated");
  }
  componentWillUnmount() {
    console.log("unmount");
  }

  render() {
    return (
      <div>
        <button
          onClick={ev => {
            this.setState({ value: this.state.value + 1 });
          }}
        >
          {this.state.value}
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".root"));
```

## List

```tsx
// src/index.tsx
import React from "react";
import ReactDOM from "react-dom";

function App() {
  return (
    <ul>
      {[1, 2, 3, 4].map(i => {
        return <li key={i}>{i}</li>;
      })}
    </ul>
  );
}

ReactDOM.render(<App />, document.querySelector(".root"));
```

## Styled

```bash
yarn add styled-components
```

```tsx
// src/index.tsx
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

function App() {
  return (
    <Container>
      <ul>
        {[1, 2, 3, 4].map(i => {
          return <li key={i}>{i}</li>;
        })}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  background: #aaa;
`;

ReactDOM.render(<App />, document.querySelector(".root"));
```

## Redux

```
yarn add redux react-redux -D
yarn add @types/redux @types/react-redux
```

```tsx
// src/index.tsx
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { connect, Provider } from "react-redux";

type State = {
  value: number;
};

const initialState: State = {
  value: 0
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "increment": {
      return { value: state.value + 1 };
    }
    default: {
      return state;
    }
  }
};

const App = connect((state: State) => {
  return state;
})((props: State & { dispatch: Function }) => {
  return (
    <button
      onClick={ev => {
        props.dispatch({ type: "increment" });
      }}
    >
      {props.value}
    </button>
  );
});

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector(".root")
);
```
