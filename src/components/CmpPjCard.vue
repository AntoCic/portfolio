<template>
    <div class="ms_card">

        <img :src="pj.img ? pj.img : logo404" class="logo-pj" alt="logo-project">
        <div class="overlay"></div>
        <div class="ms_content px-3">
            <h5 class="card-title">{{ pj.name }}</h5>
            <p class="card-text small">{{ pj.rule }}</p>
            <div class="mb-2">
                <img v-for="technology in pj.technologies" :src="`/img/skills/${technology.toLowerCase()}.svg`"
                    :alt="technology" width="25" class="me-1">
            </div>

            <p v-if="descriptionBtn" class="card-text">{{ pj.shortDescription }}<span
                    class="ms_btn-description text-gold" v-if="descriptionBtn"
                    @click="descriptionBtn = !descriptionBtn">...</span> </p>
            <p v-else class="card-text">{{ pj.description }} <span class="ms_btn-description text-gold"
                    v-if="descriptionBtn === false" @click="descriptionBtn = !descriptionBtn">&blacktriangle;</span>
            </p>

            <p>Data: {{ pj.dateStart }} <template v-if="pj.dateEnd">- {{ pj.dateEnd }}</template> </p>
            <div class="mt-auto">
                <a v-if="pj.site_link" :href="pj.site_link" target="_blank" class="ms_btn">
                    <img src="/img/site.png" alt="Site to try">
                </a>
                <RouterLink v-if="pj.video" :to="{ name: 'pj.show', params: { id: pj.id } }" class="ms_btn">
                    <img src="/img/video.png" alt="video preview">
                </RouterLink>
                <a v-if="pj.git_link" :href="pj.git_link" target="_blank" class="ms_btn">
                    <img src="/img/repo.png" alt="Github repo">
                </a>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        pj: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            logo404: '/img/logo404.png',
            descriptionBtn: null,
        }
    },
    methods: {

    },
    mounted() {
        if (this.pj.description.length > 240) {
            this.descriptionBtn = true;
            this.pj.shortDescription = this.pj.description.slice(0, 225);
        }
    }
}
</script>


<style lang="scss" scoped>
.ms_btn-description {
    cursor: pointer;
    user-select: none;
}

.ms_card {
    position: relative;
    width: 100%;
    display: flex;
    min-height: 500px;
    align-items: center;

    .logo-pj {
        width: 40%;
        min-height: 400px;

        object-fit: cover;
        object-position: left;
    }

    .overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, rgba(28, 64, 93, 0) 10%, rgba(28, 64, 93, 1) 40%);
    }

    .ms_content {
        width: 60%;
        position: relative;
        z-index: 1;
    }

    &:hover .ms_btn:first-child {
        animation: btn_shake 0.3s linear both;
        animation-iteration-count: 2;
    }

    .ms_btn {
        display: inline-block;
        width: 2em;
        margin-right: 8px;

        &:hover {
            opacity: 0.7;
        }
    }

    @keyframes btn_shake {
        0% {
            -webkit-transform: translate(0);
            transform: translate(0);
        }

        20% {
            -webkit-transform: translate(-1.5px, 1.5px);
            transform: translate(-1.5px, 1.5px);
        }

        40% {
            -webkit-transform: translate(-1.5px, -1.5px);
            transform: translate(-1.5px, -1.5px);
        }

        60% {
            -webkit-transform: translate(1.5px, 1.5px);
            transform: translate(1.5px, 1.5px);
        }

        80% {
            -webkit-transform: translate(1.5px, -1.5px);
            transform: translate(1.5px, -1.5px);
        }

        100% {
            -webkit-transform: translate(0);
            transform: translate(0);
        }
    }

}
</style>