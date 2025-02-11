import { baseApi } from "../plugins/axios";

const api = '';

const login = (body) => baseApi.post(`${api}/login`, body);
const register = (body) => baseApi.post(`${api}/user`, body);

export { login, register };