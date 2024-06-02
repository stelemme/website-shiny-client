import axios from "axios";
import { useSetRecoilState } from "recoil";
import { alertOpen, alertSeverity, alertMessage } from "../utils/atoms";

export const useMakeRequest = () => {
  const setAlertOpen = useSetRecoilState(alertOpen);
  const setAlertSeverity = useSetRecoilState(alertSeverity);
  const setAlertMessage = useSetRecoilState(alertMessage);

  const makeRequest = async (method, url, data = null, action = "request", silence = false) => {
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

      if (!silence) {
        if (method === "delete") {
          setAlertMessage("The delete was successful!");
        } else {
          setAlertMessage(`The ${action} was successful!`);
        }

        setAlertSeverity("success");
        setAlertOpen(true);
      }

      return response.data;
    } catch (error) {
      console.error(error);

      setAlertMessage(error.message || "Request failed");
      setAlertSeverity("error");
      setAlertOpen(true);

      throw new Error(error.message || "Request failed");
    }
  };

  return makeRequest;
};

export const useGetRequest = () => {
  const setAlertOpen = useSetRecoilState(alertOpen);
  const setAlertSeverity = useSetRecoilState(alertSeverity);
  const setAlertMessage = useSetRecoilState(alertMessage);

  const getRequest = async (url, params = null) => {
    console.log("GET-request pending to: ", url);

    try {
      const response = await axios.get(url, params);

      if (!response.data) {
        throw new Error("Empty response data");
      }

      console.log("Request successful!");

      return response.data;
    } catch (error) {
      console.error(error);

      setAlertMessage(error.message || "Get Request failed");
      setAlertSeverity("error");
      setAlertOpen(true);

      throw new Error(error.message || "Get Request failed");
    }
  };

  return getRequest;
};