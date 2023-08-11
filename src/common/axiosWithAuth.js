import axios from "axios";
let store;
const injectStore = (_store) => {
  store = _store;
  console.log("FROM STORE", store.getState());
};
const instanceToken = axios.create({
  baseURL: "http://localhost:80/api",
});

instanceToken.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${store.getState().auth.tokenId}`;
  return config;
});
export { instanceToken, injectStore };
