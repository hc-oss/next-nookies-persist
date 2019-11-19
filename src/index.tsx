import React, { createContext, useContext, useState } from "react";

import { destroyCookie, setCookie } from "./cookies";
import { parseNookies } from "./parser";
import { INookiesProvider, IStorage, NK } from "./static";

const NookiesContext = createContext({
  nookies: {},
  setNookie: () => {},
  clearNookie: () => {}
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
    const nKey = NK.PREFIX + key;
    setNookies({ ...nookies, [nKey]: value });
    setCookie(nKey, value, maxAge, path, ctx);
  };

  const clearNookie = (key: string, ctx = {}) => {
    const nKey = NK.PREFIX + key;
    let tNookies = { ...nookies };
    delete tNookies[nKey];
    setNookies(tNookies);
    destroyCookie(ctx, nKey);
  };

  return (
    <NookiesContext.Provider
      value={{
        nookies,
        setNookie,
        clearNookie
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
  NookiesProvider,
  destroyCookie as destroyServerNookie,
  setCookie as setServerNookie,
  useNookies as default
};
