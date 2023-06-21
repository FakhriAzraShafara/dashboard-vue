import { defineStore } from "pinia";
import * as s$mesin from '@/services/dashboard/mesin.js'

const d$mesin = defineStore({
    id: 'mesin',
    state: () => ({
        list: [],
    }),
    actions: {
        async a$list() {
            try {
                const data = await s$mesin.list();
                this.list = data;
                console.log(data);
            } catch (e) {
                console.error('actions mesin get list error', e);
                throw e;
            }
        },
        async a$update(id_mesin, updatedItem, body) {
            try {
                await s$mesin.update(id_mesin, updatedItem, body);
            } catch (e) {
                console.error('actions mesin update error', e);
                throw e;
            }
        },
        async a$getById(id_mesin) {
            try {
                const detail = await s$mesin.getById(id_mesin);
                console.log(detail);
                return detail;
            } catch (e) {
                console.error('actions mesin get By Id error', e);
                throw e;
            }
        },
        async a$add(body) {
            try {
                await s$mesin.add(body);
            } catch (e) {
                console.error('actions mesin add error', e);
                throw e;
            }
        },
        async a$delete(id_mesin) {
            try {
                await s$mesin.del(id_mesin);
            } catch (e) {
                console.error('actions mesin delete error', e);
                throw e;
            }
        },
    },
    getters: {
        g$mesin: ({ list }) => list,
    },
});

export default d$mesin;