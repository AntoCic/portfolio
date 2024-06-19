<template>
    <main class="">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <RouterView />
                </div>
                <div class="col text-white text-center">
                    <h1>Template Vue + Bootstrap /AntoCic</h1>
                    <p class="mb-2">{{store.textHello}}</p>
                    <ElmBtnCount btnText="Cliccami" />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { store } from '../store.js';
import ElmBtnCount from './ElmBtnCount.vue'
export default {
    components: { ElmBtnCount },
    data() {
        return {
            store,
        }
    },
}
</script>


<style lang="scss" scoped></style>