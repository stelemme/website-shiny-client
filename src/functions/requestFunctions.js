import axios from "axios";

export async function makeRequest(method, url, data = null) {
  console.log(data ? data : "No data.");

  try {
    const config = {
      method,
      maxBodyLength: Infinity,
      url,
      headers: {
        "Content-Type": "application/json",
      },
      ...(data && { data: JSON.stringify(data) }),
    };

    const response = await axios.request(config);

    console.log(response);

    if (!response.data && method !== "delete") {
      throw new Error("Empty response data");
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Request failed");
  }
}

export async function getRequest(url) {
  console.log("GET-request pending to: ", url);

  try {
    const response = await axios.get(url);

    if (!response.data) {
      throw new Error("Empty response data");
    }

    console.log("Request successful!");

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Get Request failed");
  }
}
