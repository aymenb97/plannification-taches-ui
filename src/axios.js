import axios from "axios";
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
});
console.log(process.env.BASE_URL);
instance.defaults.headers.common["Authorization"] = "3dzes21erf";
export default instance;
