<template>
    <div class="ms_card">

        <img :src="pj.img" class="logo-pj" alt="logo-project">
        <div class="overlai"></div>
        <div class="ms_content p-3">
            <h5 class="card-title">{{ pj.name }}</h5>
            <p class="card-text small">{{ pj.rule }}</p>
            <div class="mb-2">
                <img v-for="technology in pj.technologies" :src="`/img/skills/${technology.toLowerCase()}.svg`"
                    :alt="technology" width="25" class="me-1">

            </div>
            <p class="card-text">{{ pj.description }}</p>
            <p>Data: {{ pj.dateStart }} <template v-if="pj.dateEnd">- {{ pj.dateEnd }}</template> </p>
            <div class="mt-auto">
                <a v-if="pj.site_link" :href="pj.site_link" target="_blank" class="ms_btn">
                    <img src="/img/site.png" alt="Site to try">
                </a>
                <RouterLink v-if="pj.video" :to="{ name: 'pj.show', params: { id: pj.id } }" class="ms_btn">
                    <img src="/img/video.png" alt="video preview">
                </RouterLink>
                <!-- <a v-if="pj.video" :href="pj.video" target="_blank" class="ms_btn">
                    <img src="/img/video.png" alt="video preview">
                </a> -->
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
        },
        i: {
            type: Number,
            required: true
        }
    },
}
</script>


<style lang="scss" scoped>
.ms_card {
    position: relative;
    width: 100%;
    display: flex;

    .logo-pj {
        width: 40%;
        object-fit: cover;
        object-position: left;
    }

    .overlai {
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