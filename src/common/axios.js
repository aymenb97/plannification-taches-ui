import axios from "axios";

let store;

const instance = axios.create({
  baseURL: "http://localhost:80",
});

export { instance };
