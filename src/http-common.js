import axios from "axios";

const TINGESOBackendServer = import.meta.env.VITE_TINGESO_BACKEND_SERVER;
const TINGESOBackendPort = import.meta.env.VITE_TINGESO_BACKEND_PORT;

export default axios.create({
  baseURL: `http://${TINGESOBackendServer}:${TINGESOBackendPort}`, 
  headers: {
    "Content-type": "application/json"
  }
});
