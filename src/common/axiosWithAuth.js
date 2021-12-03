import axios from "axios";
let store;
const injectStore = (_store) => {
  store = _store;
  console.log("FROM STORE", store.getState());
};
const instanceToken = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

instanceToken.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${store.getState().auth.tokenId}`;
  return config;
});
export { instanceToken, injectStore };
