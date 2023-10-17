import axios from "axios";
import consts from '../consts/consts.js'

export const axiosMailer = axios.create({
    baseURL: consts.axios.url,
    timeout: consts.axios.timeout
})
