import { baseApi } from "@/plugins/axios";

const api = '/scw';

const list = () => baseApi.get(`${api}`);
const add = (body) => baseApi.post(`${api}`, body)
const del = (id_scw) => baseApi.delete(`${api}/${id_scw}`);
const getById = (id_scw) => baseApi.get(`${api}/${id_scw}`)
const update = (id_scw, body) => baseApi.patch(`${api}/${id_scw}`, body);


export { add, list, getById, del, update };