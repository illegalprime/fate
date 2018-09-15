<template>
<transition v-on:enter="enter" v-on:beforeEnter="beforeEnter">
  <div class="entity">
    <div class="entity__type">{{entity.type}}</div>
    <div class="entity__name">{{entity.name}}</div>
    <div class="entity__aspects" ref="aspects">
      <h3>Aspects</h3>
      <div v-for="aspect in entity.aspects">
        {{aspect.type}}: {{aspect.name}}
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import anime from 'animejs'
import smoothReflow from 'vue-smooth-reflow';

export default {
  mixins: [smoothReflow],

  props: ['entity'],

  mounted(){
    this.$smoothReflow({
      el: this.$refs.aspects
    });
  },

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
        delay: (el, i, l) => i * 100,
      });

      keyframes.finished.then(done);
    },
  }
}
</script>

<style lang="scss">
@import '../styles/variables';

.entity {
  position: relative;
  font-size: 20px;
  border: 5px solid $color-dark-blue;
  padding: 45px 15px 15px 15px;
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

.entity-grid__row {

}

.entities-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
