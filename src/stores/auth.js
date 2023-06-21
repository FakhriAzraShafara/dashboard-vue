import { defineStore } from "pinia";
import * as s$auth from '@/services/auth'
import { setCookies, certCookies, delCookies } from "@/plugins/cookies";
import parseJwt from '@/plugins/parseJwt'

const d$auth = defineStore({
    id: 'auth',
    state: () => ({
        id: undefined,
        username: undefined,
    }),
    actions: {
        async a$setUser() {
            try {
                const { id, username } = certCookies();
                this.id = id;
                this.username = username;
                return 'User Authenticated!';
            } catch ({ message }) {
                this.id = undefined;
                this.username = undefined;
                throw message;
            }
        },
        async a$login(body) {
            try {
                const { token } = await s$auth.login(body);
                setCookies('CERT', token, { datetime: Date(parseJwt(token).exp).toString() });
                this.a$setUser();
                return true
            } catch ({ error, message }) {
                throw message ?? error
            }
        },
        async a$register(body) {
            try {
                await s$auth.register(body)
                return true
            } catch ({ error, message }) {
                throw message ?? error
            }
        },
        async a$logout() {
            try {
                delCookies("CERT");
                return true;
            } catch ({ error, message }) {
                throw message ?? error;
            }
        },
    },
    getters: {
        g$user: ({ id, username }) => ({ id, username })
    },

})

export default d$auth