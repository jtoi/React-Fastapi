import axios from "axios";
import * as constants from "../constants";

// Crear instancia de Axios centralizada
const api = axios.create({
  baseURL: constants.SERVER_URL
});
console.log('api.js->' + constants.SERVER_URL)

export default api;