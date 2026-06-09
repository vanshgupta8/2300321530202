let cachedToken = "";
let expiresAt = 0;

export function getCachedToken() {
  if (cachedToken && Date.now() < expiresAt) {
    return cachedToken;
  }
  return null;
}

export function saveToken(token: string, ttlMinutes = 55) {
  cachedToken = token;
  expiresAt = Date.now() + ttlMinutes * 60 * 1000;
}

export function clearTokenCache() {
  cachedToken = "";
  expiresAt = 0;
}
