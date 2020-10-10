import axios from "axios";

const api = axios.create({
  baseURL: "https://gerenciamentostefa.herokuapp.com",
});

export default api;
