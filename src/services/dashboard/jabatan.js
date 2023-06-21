import { baseApi } from "@/plugins/axios";

const api = '/jabatan';

const list = () => baseApi.get(`${api}`);
const add = (body) => baseApi.post(`${api}`, body)
const del = (id_jabatan) => baseApi.delete(`${api}/${id_jabatan}`);
const getById = (id_jabatan) => baseApi.get(`${api}/${id_jabatan}`)
const update = (id_jabatan, body) => baseApi.patch(`${api}/${id_jabatan}`, body);


export { add, list, getById, del, update };