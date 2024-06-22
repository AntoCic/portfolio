<template>
    <main class="">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <RouterView />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { store } from '../store.js';
export default {
    data() {
        return {
            store,
        }
    },
}
</script>


<style lang="scss" scoped></style>