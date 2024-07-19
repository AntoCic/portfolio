import { reactive } from 'vue'

import axios from 'axios'
export const store = reactive({

    infoLoad: false,

    user: {
        isLogged: null,

        login(userKey) {
            axios.post('/api/notion/login', { userKey }).then((res) => {
                if (res.data.logged) {
                    store.onLogin();
                } else {
                    console.log(res.data);
                }
            }
            );
        },
        logout() {
            axios.post('/api/notion/logout').then((res) => {
                store.onLogout();
            }
            );
        },
    },

    start() {
        axios.get('/api/notion').then((res) => {
            store.user = { ...store.user, ...res.data.user };
            store.experiences = res.data.experiences;
            store.visiblePj = res.data.visiblePj;

            if (store.user.isLogged) store.onLogin();

            console.log('user : ', store.user);
            console.log('experiences : ', store.experiences);
            console.log('visiblePj : ', store.visiblePj);
        }
        );
    },
    onLogin() {
        store.user.isLogged = true;
        store.getPjHidden();
    },
    onLogout() {
        store.user.isLogged = false;
        store.hiddenPj = null;
    },

    getPjHidden() {
        axios.post('/api/notion/hidden-pj').then((res) => {
            store.hiddenPj = res.data;
            console.log('hiddenPj : ', store.hiddenPj);
        }
        );
    },
})