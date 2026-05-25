import { API_URL } from "./api";

type RegisterData = {
  name?: string;
  email: string;
  password: string;
};

export async function registerRequest(data: RegisterData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message || "Register failed");
  }

  return response.json();
}
