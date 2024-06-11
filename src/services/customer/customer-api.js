import axios from "axios";
import config from '../../config';

const customerApi = axios.create({
    baseURL: config.apiUrl + "/customer"
});

export default customerApi;