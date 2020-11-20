import axios from "axios";

const BASE_URL = process.env.VUE_APP_BACKEND_BASE_URL;

const instance = axios.create({ baseURL: BASE_URL });

export default instance;
