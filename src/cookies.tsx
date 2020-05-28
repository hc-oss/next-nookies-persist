import { destroyCookie as destroy, setCookie as set } from "nookies";
import sparkles from "sparkles";

import { NK } from "./static";

/**
 * sets cookie but does not update store can be used server side
 *
 * @param {string} key
 * @param {*} value
 * @param {*} [options={}]
 * @param {number} maxAge
 * @param {string} path
 * @param {*} [ctx={}]
 */
export const setCookie = (key, value, options, maxAge, path, ctx) => {
  const nKey = NK.PREFIX + key;
  set(ctx, nKey, JSON.stringify(value), {
    maxAge,
    path,
    ...options,
  });
  sparkles().emit(NK.ADDED, { [key]: value });
};

/**
 * Removes cookie by name can be used on server side
 *
 * @param {string} key
 * @param {*} [ctx={}]
 * @param {string} [path=NK.PATH]
 * @param {*} [options={}]
 */
export const destroyCookie = (key, ctx, path, options) => {
  const nKey = NK.PREFIX + key;
  destroy(ctx, nKey, { path, ...options });
  sparkles().emit(NK.REMOVED, key);
};
