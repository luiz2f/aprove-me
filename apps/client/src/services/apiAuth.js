const apiUrl = "http://localhost:3000/api/integrations/auth";

function post(data) {
  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return request;
}
export async function signUp(credentials) {
  const response = await fetch(`${apiUrl}/signup`, post(credentials));
  if (!response.ok) {
    const data = await response.json();
    throw data.message;
  }

  return;
}
export async function login(data) {
  const response = await fetch(`${apiUrl}/signin`, post(data));

  if (!response.ok) {
    throw new Error("Erro ao fazer login");
  }
  const result = await response.json();
  const token = result.accessToken;
  localStorage.setItem("accessToken", token);

  return result;
}

export function logout() {
  localStorage.removeItem("accessToken");
}

export function getToken() {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("Please login");
  }
  return token;
}
export async function validateUser() {
  const token = getToken();
  if (!token) {
    return { auth: false };
  }

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return { auth: true };
    }
  } catch (error) {
    localStorage.removeItem("accessToken");

    return { auth: false };
  }
}
