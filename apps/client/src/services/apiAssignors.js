import { getToken } from "./apiAuth";

const apiUrl = "http://localhost:3000/api/integrations/assignor";

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

export async function createAssignor(assignor) {
  const id = assignor.id;
  // If dont have an id, is creating a new assignor
  const hasId = !!id;
  const newApiUrl = hasId ? `${apiUrl}/${id}` : apiUrl;

  try {
    const request = hasId
      ? await patchJWT(assignor.newAssignor)
      : await postJWT(assignor);
    const response = await fetch(newApiUrl, request);
    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    if (error.message) {
      throw new Error(error.message);
    }
    throw new Error(error);
  }
}

export async function getAssignors() {
  try {
    const request = await getJWT();
    const response = await fetch(apiUrl, request);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error getting assignors:", error.message);
    throw error; // Rethrow the error after logging it.
  }
}

export async function deleteAssignor(id) {
  const newApiUrl = `${apiUrl}/${id}`;
  try {
    const request = await deleteJWT();
    const response = await fetch(newApiUrl, request);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error getting payables:", error.message);
    throw error; // Rethrow the error after logging it.
  }
}
