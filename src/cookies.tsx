import { destroyCookie as destroy, setCookie as set } from "nookies";
import sparkles from "sparkles";

import { NK } from "./static";

/**
 * sets cookie but does not update store can be used server side
 *
 * @param {string} key
 * @param {*} value
 * @param {number} maxAge
 * @param {string} path
 * @param {*} [ctx={}]
 */
export const setCookie = (
  key: string,
  value: any,
  maxAge: number = NK.MAX_AGE,
  path: string = NK.PATH,
  ctx: any = {}
) => {
  const nKey = NK.PREFIX + key;
  set(ctx, nKey, JSON.stringify(value), {
    maxAge,
    path
  });
  sparkles().emit(NK.ADDED, { [key]: value });
};

/**
 * Removes cookie by name can be used on server side
 *
 * @param {string} key
 * @param {*} [ctx={}]
 * @param {string} [path=NK.PATH]
 */
export const destroyCookie = (
  key: string,
  ctx: any = {},
  path: string = NK.PATH
) => {
  const nKey = NK.PREFIX + key;
  destroy(ctx, nKey, { path });
  sparkles().emit(NK.REMOVED, key);
};
