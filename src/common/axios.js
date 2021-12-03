import axios from "axios";

let store;

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
});
instance.defaults.headers.common["Authorization"] = "3dzes21erf";

export { instance };
