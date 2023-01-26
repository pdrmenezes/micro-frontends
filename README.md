# Working with Mini-Frontends

```
> npx create-mf-app (by jack herrington)
```

> Creates a Module Federation application, API server, or library based on one of multiple different templates.

### The remote application will be created using solidJS:

- remote-solidjs / application / :8080 / solid-js / javascript / tailwind

## Steps

1. Create a counter component using solid's createSignal (equivalent to react's useState)

2. In the webpack.config.js file, on the ModuleFederationPlugin, we'll expose the component inside the "exposes" key with its path

```js
exposes: {
  ...
  "./Counter": "./src/Counter.jsx"
},
```

3. Restart application
4. New manifest with all the modules exposed is automatically generated (localhost:8080/remoteEntry.js)

```
> npx create-mf-app
```

## The host application will be created using React:

- remote-react / application / 3000 / react / javascript / tailwind

5. Inside its webpack.config.js file, on the ModuleFederationPlugin we'll add a remote address from where we want to add a module

```js
remotes: {
  remote: "remote_solidjs@http://localhost:8080/remoteEntry.js" },
```

- the "remote" keyword will be used as the path on the micro-frontend import

```js
import Counter from "remote/Counter";
```

- the "remote_solidjs@" name came from the remote's webpack.config.js file, "name" key

```js
 plugins: [
    new ModuleFederationPlugin({
    name: "remote_solidjs",
```

6. To use a solid component inside react we have to create a wrapper function to render the component on screen

```js
import { render } from "solid-js/web";
import Counter from "./Counter";

export default (el) => {
  render(Counter, el);
};
```

7. Now we'll expose the wrapper function as well, like we did with the Counter component: inside the webpack.config.js file and add the counterWrapper

```js
exposes: {
    ...
    "./counterWrapper": "./src/counterWrapper.jsx"
  },
```

8. And, using the counterWrapper, useRef and useEffect we'll render the counter on our React App

```js
import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import counterWrapper from "remote/counterWrapper";

import "./index.scss";

const App = () => {
  const divRef = useRef(null);
  useEffect(() => {
    counterWrapper(divRef.current);
  }, []);

  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <div>Name: react-host</div>
      <div ref={divRef}></div>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
```

Finally, any changes made to the remote module will be reflected on the host.
