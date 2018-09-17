<template>
<transition v-on:enter="enter" v-on:beforeEnter="beforeEnter">
  <div class="entity">
    <div class="entity__type">{{entity.type}}</div>
    <div class="entity__name">{{entity.name}}</div>
    <Aspects :entity="entity"></Aspects>
    <transition v-on:enter="enter" v-on:beforeEnter="beforeEnter" v-on:leave="leave">
      <Skills :entity="entity" v-if="shouldShowSkills"></Skills>
    </transition>
  </div>
</transition>
</template>

<script>
import anime from 'animejs'
import Aspects from './Entity/Aspects';
import Skills from './Entity/Skills';


export default {
  components: {
    Aspects,
    Skills,
  },

  computed: {
    shouldShowSkills() {
      if (this.entity.type == "NPC") {
        return false;
      }

      return true;
    }
  },

  props: ['entity', 'mode'],

  methods: {
    beforeEnter(el) {
      let keyframes = anime({
        targets: [el, el.querySelectorAll('div')],
        opacity: 0,
        duration: 0,
      });
    },

    enter(el, done) {
      let keyframes = anime({
        targets: [el, el.querySelectorAll('div')],
        opacity: [0,1,0,1],
        duration: 200,
        delay: (el, i, l) => i * 20,
      });

      keyframes.finished.then(done);
    },

    leave(el, done) {
      let keyframes = anime({
        targets: [el, el.querySelectorAll('div')],
        opacity: [1,0,1,0],
        duration: 200,
        delay: (el, i, l) => i * 20,
      });

      keyframes.finished.then(done);
    }
  }
}
</script>

<style lang="scss">
@import '../styles/variables';

.entity__h3 {
  position: relative;
  color: $color-dark-blue;
  font-size: 20px;
  margin: 15px 0 0 15px;
  background-color: $color-darker-blue;
  display: flex;

  &:after{
    content: "";
    position: absolute;
    width: 100%;
    height: 5px;
    background-color: $color-dark-blue;
    top: calc(50% - 2.5px);
    left: -15px;
    z-index: 0;
  }
}

.entity__h3__inner {
  position: relative;
  z-index: 2;
  background-color: $color-darker-blue;
  padding: 0 15px 0 15px;
}

.entity {
  position: relative;
  font-size: 20px;
  border: 5px solid $color-dark-blue;
  padding: 75px 15px 15px 15px;
  width: 500px;
  overflow: hidden;
  background-color: $color-darker-blue;
  margin: 0 $padding $padding 0;
}

.entity__type {
  position: absolute;
  top: -5px;
  left: -5px;
  background-color: $color-dark-blue;
  padding: 5px 10px 5px 30px;
  color: white;
  z-index: 0;

  &:after {
    content: "";
    width: 50px;
    height: 50px;
    background-color: $color-dark-blue;
    position: absolute;
    right: 0;
    bottom: 0;
    transform: rotate(45deg);
    transform-origin: 100% 100%;
    z-index: -1;
  }
}

.entity__name {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 15px;
  padding: 5px;
  font-size: 32px;

  border-bottom: 5px solid $color-dark-blue;
}

.entity-grid {
  padding: 0 $padding 0 $padding;
  max-height: 100vh;
}

.entities-container {
  display: flex;
  flex-wrap: wrap;
}

</style>
