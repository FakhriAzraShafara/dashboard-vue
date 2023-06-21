import { defineStore } from "pinia";
import * as s$scw from '@/services/dashboard/scw.js'

const d$scw = defineStore({
    id: 'scw',
    state: () => ({
        list: [],
    }),
    actions: {
        async a$list() {
            try {
                const data = await s$scw.list();
                this.list = data;
                console.log(data);
            } catch (e) {
                console.error('actions scw get list error', e);
                throw e;
            }
        },
        async a$update(id_scw, updatedItem, body) {
            try {
                await s$scw.update(id_scw, updatedItem, body);
            } catch (e) {
                console.error('actions scw update error', e);
                throw e;
            }
        },
        async a$getById(id_scw) {
            try {
                await s$scw.getById(id_scw);
            } catch (e) {
                console.error('actions scw update error', e);
                throw e;
            }
        },
        async a$add(body) {
            try {
                await s$scw.add(body);
            } catch (e) {
                console.error('actions scw add error', e);
                throw e;
            }
        },
        async a$delete(id_scw) {
            try {
                await s$scw.del(id_scw);
            } catch (e) {
                console.error('actions scw delete error', e);
                throw e;
            }
        },
    },
    getters: {
        g$scw: ({ list }) => list,
    },
});

export default d$scw;