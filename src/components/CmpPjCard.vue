<template>
    <div class="ms_card">

        <img :src="pj.img" class="logo-pj" alt="logo-project">
        <div class="overlai"></div>
        <div class="ms_content p-3">
            <h5 class="card-title">{{ pj.name }}</h5>
            <p class="card-text small">{{ pj.rule }}</p>
            <div class="mb-2">
                <img v-for="technology in pj.technologies" :src="`/img/skills/${technology.toLowerCase()}.svg`" :alt="technology" width="25" class="me-1">
                
            </div>
            <p class="card-text">{{ pj.description }}</p>
            <p>Data: {{ pj.dateStart }} <template v-if="pj.dateEnd">- {{ pj.dateEnd }}</template> </p>
            <div class="mt-auto">
                <a v-if="pj.site_link" :href="pj.site_link" target="_blank" class="btn btn-link">Stite To
                    Try</a>
                <a v-if="pj.git_link" :href="pj.git_link" target="_blank" class="btn btn-link">Github</a>
            </div>
        </div>

    </div>
    <!-- <div class="card mb-3 text-azul bg-light bg-opacity-10 border-0 rounded">
        <div class="row g-0">
            <div class="col-md-4">
                <img :src="pj.img" class="object-fit-cover  rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ pj.name }}</h5>
                    <p class="card-text small">{{ pj.rule }}</p>
                    <div class="mb-2">
                        <span v-for="technology in pj.technologies" class="badge text-bg-primary me-2">{{ technology
                            }}</span>
                    </div>
                    <p class="card-text">{{ pj.description }}</p>
                    <p>Data: {{ pj.dateStart }} <template v-if="pj.dateEnd">- {{ pj.dateEnd }}</template> </p>
<div class="mt-auto">
    <a v-if="pj.site_link" :href="pj.site_link" target="_blank" class="btn btn-link">Stite To
        Try</a>
    <a v-if="pj.git_link" :href="pj.git_link" target="_blank" class="btn btn-link">Github</a>
</div>
</div>
</div>
</div>
</div> -->
</template>

<script>
export default {
    props: {
        pj: {
            type: Object,
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
}
</style>