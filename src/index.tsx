import React, { createContext, useContext, useState } from "react";
import sparkles from "sparkles";

import { destroyCookie, setCookie } from "./cookies";
import { getNookie, parseNookies } from "./parser";
import { INookiesProvider, IStorage, NK } from "./static";

const NookiesContext = createContext({
  nookies: {},
  setNookie: () => {},
  removeNookie: () => {},
} as IStorage);

/**
 * Context wrapper for next application mostly used in `_app.js`
 *
 * @param {INookiesProvider} {
 *   children,
 *   initialValue,
 *   options
 *   maxAge = NK.MAX_AGE,
 *   path = NK.PATH
 * }
 * @returns
 */
const NookiesProvider = ({
  children,
  initialValue,
  options = NK.OPTIONS,
  maxAge = NK.MAX_AGE,
  path = NK.PATH,
}: INookiesProvider) => {
  const [nookies, setNookies] = useState(initialValue);

  const setNookie = (key: string, value: any, ctx: any = {}) => {
    setCookie(key, value, options, maxAge, path, ctx);
  };

  sparkles().on(NK.ADDED, function (evt) {
    setNookies({ ...nookies, ...evt });
  });

  const removeNookie = (key: string, ctx: any = {}, path: string = NK.PATH) => {
    destroyCookie(key, ctx, path, options);
  };

  sparkles().on(NK.REMOVED, function (key) {
    const { [key]: _r, ...tNookies } = nookies;
    setNookies(tNookies);
  });

  return (
    <NookiesContext.Provider
      value={{
        nookies,
        setNookie,
        removeNookie,
        options,
      }}
    >
      {children}
    </NookiesContext.Provider>
  );
};

const useNookies = () => {
  return useContext(NookiesContext);
};

export {
  parseNookies,
  getNookie,
  destroyCookie as removeNookie,
  setCookie as setNookie,
  NookiesProvider,
  useNookies as default,
};
