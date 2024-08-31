<template>

    <div class="card shadow text-azul">
        <img :src="pj.img ? pj.img : logo404" class="card-img-top" alt="logo-project">
        <div class="card-body">
            <h5 class="card-title">{{ pj.name }}</h5>
            <div class="list-group-item">
                <img v-for="technology in pj.technologies" :src="`/img/skills/${technology.toLowerCase()}.svg`"
                    :alt="technology" width="20" class="me-1">
            </div>
        </div>

        <div class="list-group list-group-flush flex-grow-1">
            <div class="list-group-item text-azul">
                <p v-if="descriptionBtn" class="card-text">{{ pj.shortDescription }}<span class="text-gold"
                        v-if="descriptionBtn" @click="descriptionBtn = !descriptionBtn">...</span> </p>
                <p v-else class="card-text">{{ pj.description }} <span class="ms_btn-description text-gold"
                        v-if="descriptionBtn === false" @click="descriptionBtn = !descriptionBtn">&blacktriangle;</span>
                </p>
            </div>
        </div>

        <div class="card-body">
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
        if (this.pj.description.length > 100) {
            this.descriptionBtn = true;
            this.pj.shortDescription = this.pj.description.slice(0, 85);
        }
    }
}
</script>


<style lang="scss" scoped>
.card {
    height: 100%;
    background-color: transparent;

    &:hover .ms_btn:first-child {
        animation: btn_shake 0.3s linear both;
        animation-iteration-count: 2;
    }

    .ms_btn {
        display: inline-block;
        width: 1.7em;
        margin-right: 12px;

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

.card-body {
    flex-grow: 0;
}

.list-group-item {
    background-color: transparent;
}

.ms_btn-description {
    cursor: pointer;
    user-select: none;
}
</style>