export const NK = {
  ADDED: "nk_added",
  REMOVED: "nk_removed",
  PREFIX: "nk_",
  PATH: "/",
  OPTIONS: {},
  MAX_AGE: 60 * 60 * 24 * 7, // 1 Week
};

export interface IStorage {
  nookies;
  setNookie;
  removeNookie;
}

export interface INookiesProvider {
  children;
  initialValue: Record<string, any>;
  options?: Record<string, any>;
  maxAge?: number;
  path?: string;
}
