<template>
  <div class="bg-light bg-opacity-25 shadow">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-12 col-md-8">
          <h3 class="mt-3">{{ store.user.rule }}</h3>
          <p class="mb-3">{{ store.user.description }}</p>
        </div>
        <div class="d-none d-md-block col-md-4">
          <img src="/img/profilo_no_bg.png" class="img-fluid object-fit-cover" alt="foto profilo personale">
        </div>
      </div>
    </div>
  </div>

  <div class="container pt-4 pb-2 overflow-hidden" >
    <div ref="skillContainer" class="w-100 text-center" style="min-height: 104px;">
      <template v-for="(key, index) in skillsToShow">
        <div v-if="index < skillsPerRow"
          :class="['d-inline-block', sequenceAnimation[index] ? 'animate-skill-down' : 'animate-skill-up']"
          style="width: 100px;">
          <img :src="`/img/skills/${store.user.technologies[key].toLowerCase()}.svg`"
            :alt="store.user.technologies[key]" class="skills-img me-1">
          <span>{{ store.user.technologies[key] }}</span>
        </div>
      </template>
    </div>
  </div>

  <div class="container py-4">
    <div class="row">
      <div class="col-12">
        <h2 class="text-center" @dblclick="toggleModal">PROJECT</h2>
        <input class="login" type="password" v-if="modalPass" v-model="userKey"
          @dblclick="store.user.login(userKey); toggleModal()">
      </div>

      <div class="col-12">
        <hr class="mt-0">
        <h3 class="">Main</h3>
      </div>
    </div>
    <div class="row">
      <template v-for="(pj, key) in store.visiblePj" :key="key + 'pjV'">
        <div v-if="pj.priority <= 2"
          :class="['col-6 col-md-4 col-lg-3 p-2', key === 2 ? 'd-none d-md-block' : '', key >= 4 ? 'd-none d-lg-block' : '', pj.priority === 2 ? 'order-2' : 'order-1']">
          <CmpPjTemplate :pj="pj" />
        </div>
      </template>
    </div>
    <div class="row">
      <template v-if="store.hiddenPj">
        <div class="col-12 mt-3">
          <h3 class="text-end">Hidden</h3>
        </div>
        <div class="col-6 col-md-4 col-lg-3 p-2" v-for="(pj, key) in store.hiddenPj" :key="key + 'pjH'">
          <CmpPjTemplate :pj="pj" />
        </div>
      </template>

      <div class="col-12 mt-2">
        <hr class="mt-0">
      </div>
      <div class="col-12 mt-2">
        <h3 class="text-center mb-0">Libreria di creatività</h3>
      </div>

      <div class="col-12">
        <div id="caroselAutoplay" class="carousel slide" data-bs-ride="carousel" data-bs-interval="2500">
          <div class="carousel-indicators">
            <button v-for="(pj, key) in store.visiblePj" :key="key + 'pjAllBtn'" type="button"
              data-bs-target="#caroselAutoplay" :data-bs-slide-to="key" :aria-current="{ true: key === 0 }"
              :class="{ active: key === 0 }" :aria-label="'Slide ' + (key + 1)"></button>
          </div>

          <div class="carousel-inner">
            <div v-for="(pj, key) in store.visiblePj" :key="key + 'pjAllInner'"
              :class="['carousel-item', key === 0 ? 'active' : '']">
              <CmpPjCard :pj="pj" />
            </div>

          </div>

          <button type="button" class="carousel-control-prev" href="#caroselAutoplay" role="button"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon opacity-0" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button type="button" class="carousel-control-next" href="#caroselAutoplay" role="button"
            ref="caroselAutoplay" data-bs-slide="next">
            <span class="carousel-control-next-icon opacity-0" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

      </div>

    </div>
  </div>
  <hr class="m-0">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-auto p-2" v-for="(technology, index) in store.user.technologies">
        <img :src="`/img/skills/${technology.toLowerCase()}.svg`" :alt="technology" class="" width="30">
      </div>
    </div>
  </div>
  <div class="bg-light bg-opacity-25 shadow">
    <div class="container py-4">
      <div class="row">
        <div class="col-12">
          <h2>Project Template</h2>
        </div>
        <div class="col-6 col-md-4 col-lg-3 p-2" v-for="(pj, key) in store.template" :key="key + 'pjT'">
          <CmpPjTemplate :pj="pj" />
        </div>
      </div>

    </div>
  </div>
  <div class="container py-4">
    <div class="row">
      <div class="col-12">
        <h2 class="text-center">EXPERIENCE</h2>
        <hr class="mt-0">
        <CmpExperiance v-for="(experience, key) in store.experiences" :key="key + 'exp'" :exp="experience" />
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store.js';
import CmpPjCard from '../components/CmpPjCard.vue';
import CmpExperiance from '../components/CmpExperiance.vue';
import CmpPjTemplate from '../components/CmpPjTemplate.vue';
export default {
  components: { CmpPjCard, CmpExperiance, CmpPjTemplate },
  data() {
    return {
      store,
      modalPass: false,
      userKey: '',
      animationIntervall: null,
      randomSkillSequence: [],
      skillsToShow: [],
      sequenceAnimation: [],
      skillsPerRow: 0,
      intervalCounter: 1,
      currentSkillIndex: 0,
      isFirstRound: true,
    }
  },
  methods: {
    toggleModal() {
      this.userKey = '';
      if (store.user.isLogged) {
        this.modalPass = false;
      } else {
        this.modalPass = !this.modalPass;
      }
    },
    createSequenceRandomSkill() {
      for (let i = 0; i < this.store.user.technologies.length; i++) {
        let j;
        do {
          j = Math.floor(Math.random() * (this.store.user.technologies.length));
        } while (this.randomSkillSequence.includes(j));
        this.randomSkillSequence.push(j)
      }
    },
    getSkillsPerRow() {
      let qt = Math.floor(Number(this.$refs.skillContainer.offsetWidth) / 100);
      if (qt > 8) {
        qt = 7
      }
      return qt
    },

    animationSkills() {
      this.skillsPerRow = this.getSkillsPerRow()

      const targetIndex = this.intervalCounter + this.currentSkillIndex;

      if (targetIndex <= this.skillsPerRow + this.currentSkillIndex) {
        let skillToAdd;
        if (targetIndex > this.randomSkillSequence.length) {
          skillToAdd = this.randomSkillSequence[this.intervalCounter - 1]
          this.currentSkillIndex = 0
        } else {
          skillToAdd = this.randomSkillSequence[targetIndex - 1];
        }

        if (this.isFirstRound === true) {
          this.skillsToShow.push(skillToAdd);
          if (this.sequenceAnimation.length === 0) {
            this.sequenceAnimation.push(true);
          } else {
            this.sequenceAnimation.push(!this.sequenceAnimation[this.sequenceAnimation.length - 1]);
          }
        } else {
          this.skillsToShow.splice(this.intervalCounter - 1, 1, skillToAdd);
          this.sequenceAnimation[this.intervalCounter - 1] = !this.sequenceAnimation[this.intervalCounter - 1]
        }
      } else if (targetIndex === this.skillsPerRow + this.currentSkillIndex + 1) {
        this.currentSkillIndex = targetIndex - 1;
        this.isFirstRound = false
      }

      this.intervalCounter = (this.intervalCounter % 8) + 1;
    },

    startAnimationSkills() {
      this.skillsPerRow = this.getSkillsPerRow()
      this.createSequenceRandomSkill();
      this.animationIntervall = setInterval(this.animationSkills, 500)
    },

    stopAnimationSkills() {
      clearInterval(this.animationIntervall)
    }
  },
  mounted() {
    this.startAnimationSkills()
    this.$refs.caroselAutoplay.click();
  },
  unmounted() {
    this.stopAnimationSkills()
  }
}

</script>

<style lang="scss">
@use '../assets/scss/partials/_variables.scss' as *;

.btn-us {
  opacity: 0;
  user-select: none;
}

.login {
  margin-bottom: 8px;
  padding: 0 4px;
  background: $bg-color;
  border: 1px solid $gold;
  border-radius: 3px;
}

.skills-img {
  width: 80px;
}

.animate-skill-down {
  animation: skill_to_down 4s ease-in-out both;
  animation-iteration-count: 1;
}

@keyframes skill_to_down {
  0% {
    opacity: 0;
    transform: translate(0px, -100%);
  }

  10% {
    opacity: 0.5;
    transform: translate(0);
  }

  20% {
    opacity: 1;
    transform: translate(0);
  }

  80% {
    opacity: 1;
    transform: translate(0);
  }

  90% {
    opacity: 0.5;
    transform: translate(0);
  }

  100% {
    opacity: 0;
    transform: translate(0px, 100%);
  }
}

.animate-skill-up {
  animation: skill_to_up 4s ease-in-out both;
  animation-iteration-count: 1;
}

@keyframes skill_to_up {
  0% {
    opacity: 0;
    transform: translate(0px, 100%);
  }

  10% {
    opacity: 0.5;
    transform: translate(0);
  }

  20% {
    opacity: 1;
    transform: translate(0);
  }

  80% {
    opacity: 1;
    transform: translate(0);
  }

  90% {
    opacity: 0.5;
    transform: translate(0);
  }

  100% {
    opacity: 0;
    transform: translate(0px, -100%);
  }
}
</style>