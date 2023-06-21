import { defineStore } from "pinia";
import * as s$history from '@/services/dashboard/history.js'

const d$history = defineStore({
    id: 'history',
    state: () => ({
        list: [],
    }),
    actions: {
        async a$list() {
            try {
                const data = await s$history.list();
                this.list = data;
                console.log(data);
            } catch (e) {
                console.error('actions history get list error', e);
                throw e;
            }
        },
        async a$update(id_history, updatedItem, body) {
            try {
                await s$history.update(id_history, updatedItem, body);
            } catch (e) {
                console.error('actions history update error', e);
                throw e;
            }
        },
        async a$getById(id_history) {
            try {
                await s$history.getById(id_history);
            } catch (e) {
                console.error('actions history update error', e);
                throw e;
            }
        },
        async a$add(body) {
            try {
                await s$history.add(body);
            } catch (e) {
                console.error('actions history add error', e);
                throw e;
            }
        },
        async a$delete(id_history) {
            try {
                await s$history.del(id_history);
            } catch (e) {
                console.error('actions history delete error', e);
                throw e;
            }
        },
    },
    getters: {
        g$history: ({ list }) => list,
    },
});

export default d$history;