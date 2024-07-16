<template>
    <main class="main">
        <div v-if="store.user && store.infoLoad" class="container">
            <RouterView />
        </div>
        <CmpLoading v-else />
    </main>

</template>
<script>
import { store } from '../store.js';
import CmpLoading from '../components/CmpLoading.vue'
export default {
    components: { CmpLoading },
    data() {
        return {
            store,
        }
    },
    methods: {

    },
    mounted() {
        // console.log('@@@@ Main @@@@');
        setTimeout(() => {
            this.store.infoLoad = true;
        }, 3000);
    }
}

</script>

<style lang="scss"></style>