import { baseApi } from "@/plugins/axios";

const api = '/history';

const list = () => baseApi.get(`${api}`);
const add = (body) => baseApi.post(`${api}`, body)
const del = (id_history) => baseApi.delete(`${api}/${id_history}`);
const getById = (id_history) => baseApi.get(`${api}/${id_history}`)
const update = (id_history, body) => baseApi.patch(`${api}/${id_history}`, body);


export { add, list, getById, del, update };