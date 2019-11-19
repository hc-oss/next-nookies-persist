export const NK = {
  PREFIX: "nk_",
  PATH: "/",
  MAX_AGE: 60 * 60 * 24 * 7 // 1 Week
};

export interface IStorage {
  nookies;
  setNookie;
  clearNookie;
}

export interface INookiesProvider {
  children;
  initialValue: { [key: string]: any };
  maxAge?: number;
  path?: string;
}
