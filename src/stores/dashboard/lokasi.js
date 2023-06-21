import { defineStore } from "pinia";
import * as s$lokasi from '@/services/dashboard/lokasi.js'

const d$lokasi = defineStore({
    id: 'lokasi',
    state: () => ({
        list: [],
    }),
    actions: {
        async a$list() {
            try {
                const data = await s$lokasi.list();
                this.list = data;
                console.log(data);
            } catch (e) {
                console.error('actions lokasi get list error', e);
                throw e;
            }
        },
        async a$update(id_lokasi, updatedItem, body) {
            try {
                await s$lokasi.update(id_lokasi, updatedItem, body);
            } catch (e) {
                console.error('actions lokasi update error', e);
                throw e;
            }
        },
        async a$getById(id_lokasi) {
            try {
                await s$lokasi.getById(id_lokasi);
            } catch (e) {
                console.error('actions lokasi update error', e);
                throw e;
            }
        },
        async a$add(body) {
            try {
                await s$lokasi.add(body);
            } catch (e) {
                console.error('actions lokasi add error', e);
                throw e;
            }
        },
        async a$delete(id_lokasi) {
            try {
                await s$lokasi.del(id_lokasi);
            } catch (e) {
                console.error('actions lokasi delete error', e);
                throw e;
            }
        },
    },
    getters: {
        g$lokasi: ({ list }) => list,
    },
});

export default d$lokasi;