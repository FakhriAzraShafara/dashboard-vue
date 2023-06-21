import { defineStore } from "pinia";
import * as s$employee from '@/services/dashboard/employee.js'

const d$employee = defineStore({
    id: 'employee',
    state: () => ({
        list: [],
    }),
    actions: {
        async a$list() {
            try {
                const data = await s$employee.list();
                this.list = data;
                console.log(data);
            } catch (e) {
                console.error('actions employee get list error', e);
                throw e;
            }
        },
        async a$update(id_employee, updatedItem, body) {
            try {
                await s$employee.update(id_employee, updatedItem, body);
            } catch (e) {
                console.error('actions employee update error', e);
                throw e;
            }
        },
        async a$getById(id_employee) {
            try {
                await s$employee.getById(id_employee);
            } catch (e) {
                console.error('actions employee update error', e);
                throw e;
            }
        },
        async a$add(body) {
            try {
                await s$employee.add(body);
            } catch (e) {
                console.error('actions employee add error', e);
                throw e;
            }
        },
        async a$delete(id_employee) {
            try {
                await s$employee.del(id_employee);
            } catch (e) {
                console.error('actions employee delete error', e);
                throw e;
            }
        },
    },
    getters: {
        g$employee: ({ list }) => list,
    },
});

export default d$employee;