import { defineStore } from "pinia";
import * as s$departemen from '@/services/dashboard/departemen.js'

const d$departemen = defineStore({
    id: 'departemen',
    state: () => ({
        list: [],
    }),
    actions: {
        async a$list() {
            try {
                const data = await s$departemen.list();
                this.list = data;
                console.log(data);
            } catch (e) {
                console.error('actions departemen get list error', e);
                throw e;
            }
        },
        async a$update(id_departemen, updatedItem, body) {
            try {
                await s$departemen.update(id_departemen, updatedItem, body);
            } catch (e) {
                console.error('actions departemen update error', e);
                throw e;
            }
        },
        async a$getById(id_departemen) {
            try {
                await s$departemen.getById(id_departemen);
            } catch (e) {
                console.error('actions departemen kasi update error', e);
                throw e;
            }
        },
        async a$add(body) {
            try {
                await s$departemen.add(body);
            } catch (e) {
                console.error('actions departemen add error', e);
                throw e;
            }
        },
        async a$delete(id_departemen) {
            try {
                await s$departemen.del(id_departemen);
            } catch (e) {
                console.error('actions departemen delete error', e);
                throw e;
            }
        },
    },
    getters: {
        g$departemen: ({ list }) => list,
    },
});

export default d$departemen;