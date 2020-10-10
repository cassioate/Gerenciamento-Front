import axios from "axios";

const api = axios.create({
  baseURL: "https://gerenciamentostefa.herokuapp.com/obra",
});

export default api;
