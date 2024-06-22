<template>
     <main class="main">
        <div v-if="store.user" class="container">
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
        console.log('@@@@ Main @@@@');
    }
}

</script>

<style lang="scss"></style>