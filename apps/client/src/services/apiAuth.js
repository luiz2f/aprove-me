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

export async function login() {
  const data = {
    login: "aproveme",
    password: "aproveme",
  };
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

export async function validateUser() {
  let authorized;
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("Please login");
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
