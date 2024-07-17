<template>
    <div :class="store.isTeam(this.$route.fullPath) ? 'team' : 'd-contents'">
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

    </div>
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
    },

}
</script>


<style lang="scss" scoped>
.team {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #010409;
    min-height: 100vh;
    width: 100%;
    padding: 16px;
}

video {
    width: 100%;
}
</style>
