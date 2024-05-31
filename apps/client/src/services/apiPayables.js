import { getToken } from "./apiAuth";
import { PAGE_SIZE } from "../utils/constants";

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
async function patchJWT(data) {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  let request = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return request;
}
async function deleteJWT() {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  let request = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return request;
}

export async function createPayable(payable) {
  const id = payable.id;
  // If dont have an id, is creating a new payable
  const hasId = !!id;
  const newApiUrl = hasId ? `${apiUrl}/${id}` : apiUrl;

  try {
    const request = hasId
      ? await patchJWT(payable.newPayable)
      : await postJWT(payable);
    const response = await fetch(newApiUrl, request);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.statusCode);
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

export async function getPayables(page) {
  const newApiUrl = `${apiUrl}?page=${page}&limit=${PAGE_SIZE}`;
  try {
    const request = await getJWT();
    const response = await fetch(newApiUrl, request);

    if (!response.ok) {
      throw new Error(`getPayables HTTP error! Status: ${response.status}`);
    }
    const { data, length } = await response.json();
    return { data, length };
  } catch (error) {
    console.error("Error getting payables:", error.message);
    throw error; // Rethrow the error after logging it.
  }
}
export async function getPayable(id) {
  if (!id) return;
  const newApiUrl = `${apiUrl}/${id}`;
  try {
    const request = await getJWT();
    const response = await fetch(newApiUrl, request);

    if (!response.ok) {
      throw new Error(`getPayables HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting payable:", error.message);
    throw error; // Rethrow the error after logging it.
  }
}

export async function deletePayable(id) {
  const newApiUrl = `${apiUrl}/${id}`;
  try {
    const request = await deleteJWT();
    const response = await fetch(newApiUrl, request);

    if (!response.ok) {
      const queryClient = new QueryClient();

      queryClient.invalidateQueries();
      throw new Error(`deletePayable HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting payables:", error.message);
    throw error; // Rethrow the error after logging it.
  }
}
