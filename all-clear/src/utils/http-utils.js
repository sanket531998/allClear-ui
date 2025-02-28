import axios from "axios";

export default class httpConfig {
  Axios;
  constructor(baseURL) {
    this.Axios = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getRequest(url, headers) {
    return this.Axios.get(url, {
      headers: { ...defaultHeaders, ...headers },
    }).then((res) => (res.data ? res.data : res));
  }

  postRequest(url, data, headers) {
    return this.Axios.post(url, data, {
      headers: { ...defaultHeaders, ...headers },
    }).then((res) => (res.data ? res.data : res));
  }

  // Delete
  // Put
  // Patch
}
