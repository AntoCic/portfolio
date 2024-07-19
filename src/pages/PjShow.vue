<template>
    <template v-if="pj !== undefined">
        <h1 class="text-white mt-2">{{ pj.name }}</h1>
        <video controls>
            <source :src="pj.video" type="video/mp4">
        </video>
        <div class="mb-2 text-white text-end me-1s">
            <img v-for="technology in pj.technologies" :src="`/img/skills/${technology.toLowerCase()}.svg`"
                :alt="technology" width="25" class="me-1">
            {{ pj.dateStart }} <template v-if="pj.dateEnd">- {{ pj.dateEnd }}</template>
        </div>
        <p class="text-white">{{ pj.description }}</p>
    </template>
    <h2 v-else class="text-center">Carico i dati</h2>

</template>

<script>
import { store } from '../store.js';
export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            store,
            pj: {}
        }
    },
    mounted() {
        this.pj = this.store.visiblePj.find((e) => e.id === this.id);
        if (!this.pj) {
            this.pj = this.store.hiddenPj.find((e) => e.id === this.id);
        }
    },

}
</script>


<style lang="scss" scoped>
video {
    width: 100%;
}
</style>
