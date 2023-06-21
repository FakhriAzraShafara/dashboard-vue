import { baseApi } from "@/plugins/axios";

const api = '/mesin';

const list = () => baseApi.get(`${api}`);
const add = (body) => baseApi.post(`${api}`, body)
const del = (id_mesin) => baseApi.delete(`${api}/${id_mesin}`);
const getById = (id_mesin) => baseApi.get(`${api}/${id_mesin}`)
const update = (id_mesin, body) => baseApi.patch(`${api}/${id_mesin}`, body);


export { add, list, getById, del, update };