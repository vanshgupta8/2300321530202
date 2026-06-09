import { NextRequest, NextResponse } from "next/server";
import { Log, setupLogger } from "logging_middleware";

const NOTIFICATIONS_URL = "http://4.224.186.213/evaluation-service/notifications";
const AUTH_URL = "http://20.244.56.144/evaluation-service/auth";

let token = "";
let tokenExpiresAt = 0;
let loggerReady = false;

function ensureLogger() {
  if (!loggerReady) {
    setupLogger(getToken);
    loggerReady = true;
  }
}

function readEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env value: ${name}`);
  }
  return value;
}

async function getToken() {
  if (token && Date.now() < tokenExpiresAt) {
    return token;
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
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Auth failed (${response.status}): ${body}`);
  }

  const data = (await response.json()) as { access_token: string };
  token = data.access_token;
  tokenExpiresAt = Date.now() + 55 * 60 * 1000;
  return token;
}

async function fetchPage(params: URLSearchParams) {
  const accessToken = await getToken();
  const query = params.toString();
  const url = query ? `${NOTIFICATIONS_URL}?${query}` : NOTIFICATIONS_URL;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Notification API failed (${response.status}): ${body}`);
  }

  const data = await response.json();
  return data.notifications ?? [];
}

async function fetchAll(notificationType?: string | null) {
  const all: unknown[] = [];
  let page = 1;

  while (true) {
    const params = new URLSearchParams({ page: String(page), limit: "50" });
    if (notificationType) {
      params.set("notification_type", notificationType);
    }

    const batch = await fetchPage(params);
    if (batch.length === 0) {
      break;
    }

    all.push(...batch);
    if (batch.length < 50) {
      break;
    }
    page += 1;
  }

  return all;
}

function getPriorityScore(item: { Type: string; Timestamp: string }) {
  const weights: Record<string, number> = { Placement: 3, Result: 2, Event: 1 };
  const weight = weights[item.Type] ?? 0;
  return weight * 1e15 + new Date(item.Timestamp).getTime();
}

function getTopList(items: Array<{ Type: string; Timestamp: string }>, top: number) {
  const heap: typeof items = [];

  const compare = (a: typeof items[number], b: typeof items[number]) =>
    getPriorityScore(a) - getPriorityScore(b);

  for (const item of items) {
    if (heap.length < top) {
      heap.push(item);
      let index = heap.length - 1;
      while (index > 0) {
        const parent = Math.floor((index - 1) / 2);
        if (compare(heap[index], heap[parent]) >= 0) break;
        [heap[index], heap[parent]] = [heap[parent], heap[index]];
        index = parent;
      }
      continue;
    }

    if (compare(item, heap[0]) > 0) {
      heap[0] = item;
      let index = 0;
      while (true) {
        const left = index * 2 + 1;
        const right = index * 2 + 2;
        let smallest = index;
        if (left < heap.length && compare(heap[left], heap[smallest]) < 0) smallest = left;
        if (right < heap.length && compare(heap[right], heap[smallest]) < 0) smallest = right;
        if (smallest === index) break;
        [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
        index = smallest;
      }
    }
  }

  return [...heap].sort((a, b) => compare(b, a));
}

export async function GET(request: NextRequest) {
  ensureLogger();
  const started = Date.now();
  const search = request.nextUrl.searchParams;

  try {
    const mode = search.get("mode");
    const notificationType = search.get("notification_type");

    if (mode === "priority") {
      const top = Number(search.get("top") ?? 10);
      const allItems = await fetchAll(notificationType);
      const notifications = getTopList(allItems as Array<{ Type: string; Timestamp: string }>, top);

      await Log(
        "frontend",
        "info",
        "handler",
        `Priority route served ${notifications.length} items in ${Date.now() - started}ms`
      );

      return NextResponse.json({ notifications, totalFetched: allItems.length });
    }

    const params = new URLSearchParams({
      page: search.get("page") ?? "1",
      limit: search.get("limit") ?? "50",
    });

    if (notificationType) {
      params.set("notification_type", notificationType);
    }

    const notifications = await fetchPage(params);

    await Log(
      "frontend",
      "info",
      "handler",
      `Notification route served ${notifications.length} items in ${Date.now() - started}ms`
    );

    return NextResponse.json({ notifications });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed";

    try {
      await Log("frontend", "error", "handler", message);
    } catch {
      // Ignore logging failures.
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
