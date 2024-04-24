import axios from "axios";

export const apiPostCall = (endpoint, headers = {}, payload = {}) => {
  return new Promise((resolve, reject) => {
    const header = {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    };

    axios
      .post(endpoint, payload, { headers })
      .then((res) => resolve(res.data))
      .catch((error) => {
        reject(error);
      });
  });
};

export const apiGetCall = (endpoint, headers = {}) => {
  return new Promise((resolve, reject) => {
    const header = {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    };

    axios
      .get(endpoint, { headers })
      .then((res) => resolve(res.data))
      .catch((error) => {
        reject(error);
      });
  });
};
