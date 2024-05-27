import { getToken } from "./apiAuth";

const apiUrl = "http://localhost:3000/api/integrations/payable";

async function postJWT(data) {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  let request = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return request;
}

async function getJWT() {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return config;
}

export async function createPayable(newPayable) {
  try {
    const request = await postJWT(newPayable);
    const response = await fetch(apiUrl, request);
    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    // Se for um objeto de erro conhecido, lance-o como está
    if (error.message) {
      throw new Error(error.message);
    }
    throw error;
  }
}

export async function getPayables() {
  try {
    const request = await getJWT();
    const response = await fetch(apiUrl, request);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error getting payables:", error.message);
    throw error; // Rethrow the error after logging it.
  }
}
