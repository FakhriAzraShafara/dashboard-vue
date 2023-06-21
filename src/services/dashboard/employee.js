import { baseApi } from "@/plugins/axios";

const api = '/employee';

const list = () => baseApi.get(`${api}`);
const add = (body) => baseApi.post(`${api}`, body)
const del = (id_employee) => baseApi.delete(`${api}/${id_employee}`);
const getById = (id_employee) => baseApi.get(`${api}/${id_employee}`)
const update = (id_employee, body) => baseApi.patch(`${api}/${id_employee}`, body);


export { add, list, getById, del, update };