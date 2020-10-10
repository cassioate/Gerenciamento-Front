import axios from "axios";

const api = axios.create({
  baseURL: "http://https://gerenciamentostefa.herokuapp.com/",
});

export default api;
