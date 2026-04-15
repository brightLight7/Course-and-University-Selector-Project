const API_BASE = "http://127.0.0.1:5000";

export type AuthUser = {
  userId: number;
  firstName: string;
  email: string;
};

export async function signUp(
  firstName: string,
  email: string,
  password: string,
): Promise<AuthUser> {
  const response = await fetch(`${API_BASE}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, email, password }),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message ?? "Failed to create account.");
  }

  return body as AuthUser;
}

export type UserSave = {
  attemptId: number;
  courses: string[];
  universities: string[];
};

export async function fetchUserSaves(userId: number): Promise<UserSave[]> {
  const response = await fetch(`${API_BASE}/api/user/${userId}/saves`);
  if (!response.ok) throw new Error("Failed to load saves.");
  return (await response.json()) as UserSave[];
}

export async function login(
  email: string,
  password: string,
): Promise<AuthUser> {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message ?? "Invalid email or password.");
  }

  return body as AuthUser;
}
