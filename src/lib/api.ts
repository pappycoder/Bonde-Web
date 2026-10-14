/**
 * Minimal public API client. The site is unauthenticated, so there is no token
 * handling — just a thin fetch wrapper over the same-origin `/api/*` base that
 * `next.config.ts` proxies to the backend. Failures are normalized into
 * `ApiError` carrying the server's uniform `{ statusCode, message }` message.
 */
export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export interface WaitlistJoinResult {
  status: "joined";
  email: string;
  alreadyJoined: boolean;
}

export interface ContactMessageResult {
  status: "received";
  id: string;
}

export interface WaitlistPayload {
  email: string;
  name?: string;
  source?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`/api${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  const parsed = await jsonOf(response);
  if (!response.ok) {
    throw new ApiError(response.status, messageOf(response, parsed));
  }
  return parsed as T;
}

async function jsonOf(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function messageOf(response: Response, body: unknown): string {
  if (body && typeof body === "object" && "message" in body) {
    const message = (body as { message: unknown }).message;
    if (Array.isArray(message)) {
      const joined = message.filter((m): m is string => typeof m === "string");
      if (joined.length > 0) return joined.join(", ");
    }
    if (typeof message === "string") return message;
  }
  return response.statusText || `Request failed (${response.status})`;
}

export const publicApi = {
  joinWaitlist: (payload: WaitlistPayload) =>
    post<WaitlistJoinResult>("/waitlist", payload),
  sendContactMessage: (payload: ContactPayload) =>
    post<ContactMessageResult>("/contact", payload),
};
