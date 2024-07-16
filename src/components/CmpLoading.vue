<template>
    <div @click="store.infoLoad = true" class="container position-relative">
        <div class="spinner-box my-5 mx-auto">
            <div class="spinner"></div>
            <img src="../assets/img/notion.svg" alt="">
        </div>
        <div class="text-center text-azul px-4">
            <h3 v-if="!store.user">Getting data from notion</h3>
            <p>Il portfolio è interamente modificabile tramite una pagina di Notion. Utilizzando le API fornite da
                Notion
            </p>
            <p>Il sito è stato realizzato utilizzando Vite, Vue, Vue Router, Bootstrap, Sass e Netlify CLI per la
                gestione
                delle chiamate API.</p>
        </div>

        <div class="ms_btn-close" v-if="store.user">
            x
        </div>
    </div>

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
.spinner-box {
    max-width: 300px;
    max-height: 300px;
    width: 50vw;
    height: 50vw;
    position: relative;

    .spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        width: 70%;
        height: 70%;
        cursor: not-allowed;
        border-radius: 70px;
        box-shadow: -50px -50px 50px #6359f8, 0px -50px 50px 0px #9c32e2, 50px -50px 50px #f36896, 50px 0 50px #ff0b0b, 50px 50px 50px 0px#ff5500, 0 50px 50px 0px #ff9500, -50px 50px 50px 0px #ffb700;
        animation: rotation360 1.5s linear infinite;
    }

    img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
}

@keyframes rotation360 {
    to {
        transform: rotate(360deg);
    }
}

.ms_btn-close {
    position: absolute;
    top: 0;
    right: 0;
    width: 26px;
    height: 26px;
    padding: 0.5px;
    margin-right: 16px;
    border: 2px solid #9D7B33;
    border-radius: 50%;
    color: #9D7B33;
    line-height: 100%;
    text-align: center;
    cursor: pointer;

    &:hover {
        opacity: 0.6;
    }
}
</style>