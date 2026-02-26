import axios from "axios";

const ApiClient = axios.create({
    baseURL: "http://localhost:9000",
    withCredentials: true
});

export default ApiClient;