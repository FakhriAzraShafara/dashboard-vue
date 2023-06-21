import { defineStore } from "pinia";
import * as s$jabatan from '@/services/dashboard/jabatan.js'

const d$jabatan = defineStore({
    id: 'jabatan',
    state: () => ({
        list: [],
    }),
    actions: {
        async a$list() {
            try {
                const data = await s$jabatan.list();
                this.list = data;
                console.log(data);
            } catch (e) {
                console.error('actions jabatan get list error', e);
                throw e;
            }
        },
        async a$update(id_jabatan, updatedItem, body) {
            try {
                await s$jabatan.update(id_jabatan, updatedItem, body);
            } catch (e) {
                console.error('actions jabatan update error', e);
                throw e;
            }
        },
        async a$getById(id_jabatan) {
            try {
                await s$jabatan.getById(id_jabatan);
            } catch (e) {
                console.error('actions jabatan kasi update error', e);
                throw e;
            }
        },
        async a$add(body) {
            try {
                await s$jabatan.add(body);
            } catch (e) {
                console.error('actions jabatan add error', e);
                throw e;
            }
        },
        async a$delete(id_jabatan) {
            try {
                await s$jabatan.del(id_jabatan);
            } catch (e) {
                console.error('actions jabatan delete error', e);
                throw e;
            }
        },
    },
    getters: {
        g$jabatan: ({ list }) => list,
    },
});

export default d$jabatan;