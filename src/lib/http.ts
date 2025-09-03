type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export class ApiError extends Error {
  status: number;
  details: unknown;
  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export async function apiFetch<T>(
  url: string,
  options: {
    method?: HttpMethod;
    headers?: Record<string, string>;
    //eslint-disable-next-line
    body?: any;
  } = {}
): Promise<T> {
  const { method = "GET", headers, body } = options;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
    next: { revalidate: 0 },
  });

  // Try to parse JSON; if not JSON, fall back to text
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const message =
      (data && (data.detail || data.message)) ||
      `Request failed: (${res.status})`;
    throw new ApiError(message, res.status, data);
  }

  return data as T;
}
