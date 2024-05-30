import axios from "axios";

export async function makeRequest(method, url, data = null) {
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

    if (!response.data && method !== 'delete') {
      throw new Error("Empty response data");
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Request failed");
  }
}
