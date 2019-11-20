import React, { createContext, useContext, useState } from "react";
import sparkles from "sparkles";

import { destroyCookie, setCookie } from "./cookies";
import { getNookie, parseNookies } from "./parser";
import { INookiesProvider, IStorage, NK } from "./static";

const NookiesContext = createContext({
  nookies: {},
  setNookie: () => {},
  removeNookie: () => {}
} as IStorage);

/**
 * Context wrapper for next application mostly used in `_app.js`
 *
 * @param {INookiesProvider} {
 *   children,
 *   initialValue,
 *   maxAge = NK.MAX_AGE,
 *   path = NK.PATH
 * }
 * @returns
 */
const NookiesProvider = ({
  children,
  initialValue,
  maxAge = NK.MAX_AGE,
  path = NK.PATH
}: INookiesProvider) => {
  const [nookies, setNookies] = useState(initialValue);

  const setNookie = (key: string, value: any, ctx: any = {}) => {
    setCookie(key, value, maxAge, path, ctx);
  };

  sparkles().on(NK.ADDED, function(evt) {
    setNookies({ ...nookies, ...evt });
  });

  const removeNookie = destroyCookie;

  sparkles().on(NK.REMOVED, function(key) {
    let tNookies = { ...nookies };
    delete tNookies[key];
    setNookies(tNookies);
  });

  return (
    <NookiesContext.Provider
      value={{
        nookies,
        setNookie,
        removeNookie
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
  useNookies as default
};
