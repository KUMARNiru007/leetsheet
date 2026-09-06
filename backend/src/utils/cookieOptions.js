// Central place for auth cookie options.
// - Localhost: SameSite=lax, not secure, no domain -> works on http://localhost
// - Production: SameSite=none, secure, optional COOKIE_DOMAIN for cross-subdomain
//   cookies (leave empty when the API and frontend are on different apex domains).
const isProduction = process.env.NODE_ENV === "production";

export function getAccessCookieOptions() {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    domain: process.env.COOKIE_DOMAIN || undefined,
    maxAge: 1000 * 60 * 15, // 15 minutes
  };
}

export function getRefreshCookieOptions() {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    domain: process.env.COOKIE_DOMAIN || undefined,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  };
}

export function getClearCookieOptions() {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    domain: process.env.COOKIE_DOMAIN || undefined,
  };
}