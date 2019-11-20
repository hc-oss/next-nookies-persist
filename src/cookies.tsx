import { destroyCookie as destroy, setCookie as set } from "nookies";

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
) =>
  set(ctx, key, JSON.stringify(value), {
    maxAge,
    path
  });

/**
 * Removes cookie by name can be used on server side
 *
 * @param {string} key
 * @param {*} [ctx={}]
 */
export const destroyCookie = (key: string, ctx: any = {}) => destroy(key, ctx);
