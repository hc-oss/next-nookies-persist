import React, { createContext, useContext, useState } from "react";

import { destroyCookie, setCookie } from "./cookies";
import { parseNookies } from "./parser";
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
    const nKey = NK.PREFIX + key;
    setNookies({ ...nookies, [nKey]: value });
    setCookie(nKey, value, maxAge, path, ctx);
  };

  const removeNookie = (key: string, ctx = {}) => {
    const nKey = NK.PREFIX + key;
    let tNookies = { ...nookies };
    delete tNookies[nKey];
    setNookies(tNookies);
    destroyCookie(nKey, ctx);
  };

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
  NookiesProvider,
  destroyCookie as removeNookie,
  setCookie as setNookie,
  useNookies as default
};
