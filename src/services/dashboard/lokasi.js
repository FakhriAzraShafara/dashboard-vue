import { baseApi } from "@/plugins/axios";

const api = '/lokasi';

const list = () => baseApi.get(`${api}`);
const add = (body) => baseApi.post(`${api}`, body)
const del = (id_lokasi) => baseApi.delete(`${api}/${id_lokasi}`);
const getById = (id_lokasi) => baseApi.get(`${api}/${id_lokasi}`)
const update = (id_lokasi, body) => baseApi.patch(`${api}/${id_lokasi}`, body);


export { add, list, getById, del, update };