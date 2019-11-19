import { destroyCookie, setCookie as set } from "nookies";

/**
 * sets cookie but does not update store can be used server side
 *
 * @param {string} key
 * @param {*} value
 * @param {number} maxAge
 * @param {string} path
 * @param {*} ctx
 */
const setCookie = (
  key: string,
  value: any,
  maxAge: number,
  path: string,
  ctx: any
) => {
  set(ctx, key, JSON.stringify(value), {
    maxAge,
    path
  });
};

export { setCookie, destroyCookie };
