import { reactive } from 'vue'
import data_test from './data_test';

import axios from 'axios'
export const store = reactive({

    infoLoad: false,

    user: {
        isLogged: null,

        login(userKey) {
            axios.post('/api/login', { userKey }).then((res) => {
                if (res.data.logged) {
                    store.onLogin();
                } else {
                    console.log({ test: { ...res.data } });
                }
            }
            );
        },
        logout() {
            axios.post('/api/logout').then((res) => {
                store.onLogout();
            }
            ).catch((err) => {
                location.reload();
            });
        },
    },

    start() {
        store.user = { ...store.user, ...data_test.user };
        store.experiences = data_test.experiences;
        store.visiblePj = data_test.visiblePj;
        store.template = data_test.template;
        
        // axios.get('/api').then((res) => {
        //     store.user = { ...store.user, ...res.data.user };
        //     store.experiences = res.data.experiences;
        //     store.visiblePj = res.data.visiblePj;
        //     store.template = res.data.template;

        //     if (store.user.isLogged) store.onLogin();

        //     console.log('cancellare : ', res.data);
        // }
        // ).catch((err) => {
        //     location.reload();
        // });
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
        axios.post('/api/hidden-pj').then((res) => {
            store.hiddenPj = res.data;
            console.log('hiddenPj : ', store.hiddenPj);
        }
        );
    },
})