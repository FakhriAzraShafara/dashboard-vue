import { baseApi } from "@/plugins/axios";

const api = '/departemen';

const list = () => baseApi.get(`${api}`);
const add = (body) => baseApi.post(`${api}`, body)
const del = (id_departemen) => baseApi.delete(`${api}/${id_departemen}`);
const getById = (id_departemen) => baseApi.get(`${api}/${id_departemen}`)
const update = (id_departemen, body) => baseApi.patch(`${api}/${id_departemen}`, body);


export { add, list, getById, del, update };