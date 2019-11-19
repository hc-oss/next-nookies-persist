# next-nookies-persist

A simple easy to digest key-value based storage module wrapper for Next.js based on cookies that persists data on page reloads

[![Edit next-nookies-persist-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/next-nookies-persist-example-l5sp2?fontsize=14&hidenavigation=1&theme=dark)

![GitHub Actions Status](https://github.com/harshzalavadiya/next-nookies-persist/workflows/NodeJS/badge.svg)
[![NPM](https://img.shields.io/npm/v/next-nookies-persist.svg)](https://npm.im/next-nookies-persist)
[![gzip](https://badgen.net/bundlephobia/minzip/next-nookies-persist)](https://bundlephobia.com/result?p=next-nookies-persist)

> as this package is written in TypeScript documentation is directly available as jsdoc/tsdoc intellisense

## ⚡ Features

- SSR Ready
- Lightweight
- Typed with TypeScript (works with JavaScript too)

## 🔧 Installation

```sh
npm i next-nookies-persist
```

## 📦 Usage

### Configure `pages/_app.js`

```jsx
import App from "next/app";
import React from "react";

import { NookiesProvider, parseNookies } from "next-nookies-persist";

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        nookies: parseNookies(ctx), // 👈
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {})
      }
    };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <NookiesProvider initialValue={pageProps.nookies}> <!--👈-->
        <Component {...pageProps} />
      </NookiesProvider>
    );
  }
}
```

### Use as a react hook inside component `pages/index.js`

```jsx
import React from "react";

import useStorage from "next-nookies-persist";

const Home = () => {
  const { nookies, setNookie, clearNookie } = useStorage();

  return (
    <div>
      <pre>{JSON.stringify(nookies, null, 2)}</pre>
      <button onClick={setNookie("foo", { bar: "baz" })}>Set</button>
      <button onClick={() => clearNookie("foo")}>Clear</button>
    </div>
  );
};

export default Home;
```

## 🤠 Credits

- [Nookies](https://github.com/maticzav/nookies)
- [Microbundle](https://github.com/developit/microbundle)
- [TypeScript](https://github.com/microsoft/TypeScript)

## 🙏 Contribute

Contributions/Suggestions are always welcome!

## 📄 License

MIT &copy; [harshzalavadiya](https://github.com/harshzalavadiya)
