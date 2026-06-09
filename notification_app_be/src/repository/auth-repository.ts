import { getCachedToken, saveToken } from "../cache/token-cache";

const AUTH_URL = "http://20.244.56.144/evaluation-service/auth";

function readEnv(key: string) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing env value: ${key}`);
  }
  return value;
}

export async function fetchAccessToken() {
  const existing = getCachedToken();
  if (existing) {
    return existing;
  }

  const response = await fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: readEnv("EVALUATION_EMAIL"),
      name: readEnv("EVALUATION_NAME"),
      rollNo: readEnv("EVALUATION_ROLL_NO"),
      clientID: readEnv("EVALUATION_CLIENT_ID"),
      clientSecret: readEnv("EVALUATION_CLIENT_SECRET"),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Auth failed (${response.status}): ${body}`);
  }

  const data = (await response.json()) as { access_token: string };
  saveToken(data.access_token);
  return data.access_token;
}
