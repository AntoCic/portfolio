<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-7">
                <h5>{{ exp.name }}</h5>
                <p>{{ exp.rule }}</p>
            </div>
            <div class="col-5">
                <p class="text-end"><span class="material-symbols-rounded"> location_on </span> {{ exp.location }}</p>
            </div>
            <div class="col-12">
                <p>{{ exp.description }}</p>
                <p class="text-end mb-0">{{ exp.dateStart }} - {{ exp.dateEnd }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        exp: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
        }
    },
    methods: {

    },
    mounted() {
    }
}
</script>


<style lang="scss" scoped>
@use '../assets/scss/partials/_variables.scss' as *;

.container-fluid {
    // border: 1px solid $gold;
    background-color: #1B3F5B;
    padding: 8px 16px;
    margin-top: 16px;
    position: relative;
    border-radius: 0.375rem;
    box-shadow: 5px 5px 10px rgb(19, 43, 63),
        -5px -5px 10px rgb(32, 72, 105);

}
</style>