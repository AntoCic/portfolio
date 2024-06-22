<template>
    <main class="main">
        <div class="container">
            <RouterView />
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


<style lang="scss" scoped> 
.hjufshduih{
    display: inline-block;
min-height: 500px;
}
</style>