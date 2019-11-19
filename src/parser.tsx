import { parseCookies } from "nookies";

import { NK } from "./static";

/**
 * Takes next context as arguement and then returns parsed cookies
 *
 * @param {*} ctx
 * @returns
 */
export const parseNookies = ctx => {
  const rawCookies = parseCookies(ctx);
  let parsedCookies = {};
  for (const [key, value] of Object.entries(rawCookies)) {
    if (key.startsWith(NK.PREFIX)) {
      parsedCookies = { ...parsedCookies, [key]: JSON.parse(value.toString()) };
    }
  }
  return parsedCookies;
};
