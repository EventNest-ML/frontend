export const API_BASE =
  process.env.EVENTNEST_API_BASE ?? "https://eventnest-api.onrender.com";

// Cookie names
export const ACCESS_TOKEN_COOKIE =
  process.env.ACCESS_TOKEN_COOKIE ?? "ea_access";
export const REFRESH_TOKEN_COOKIE =
  process.env.REFRESH_TOKEN_COOKIE ?? "ea_refresh";

// Max-Age (seconds). to match backend’s TTLs.
export const ACCESS_TOKEN_MAX_AGE = Number(
  process.env.ACCESS_TOKEN_MAX_AGE ?? 60 * 60
); // 1 hour

export const REFRESH_TOKEN_MAX_AGE = Number(
  process.env.REFRESH_TOKEN_MAX_AGE ?? 7 * 24 * 60 * 60
); // 7 days


export const IS_PROD = process.env.NODE_ENV === "production";
