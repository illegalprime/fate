<template>

<transition-group appear v-on:enter="enter" v-on:beforeEnter="beforeEnter" v-on:leave="leave">
  <slot></slot>
</transition-group>

</template>

<script>
import anime from 'animejs'

export default {

  methods: {
    beforeEnter(el) {
      el = el.querySelector('.tweener-animated') || el;
      if (this.noAnimation) return;

      let keyframes = anime({
        targets: [el, el.querySelectorAll('div:not(.no-transform)')],
        opacity: 0,
        translateY: -200,
        duration: 0,
      });
    },

    enter(el, done) {
      if (this.noAnimation) return;
      el = el.querySelector('.tweener-animated') || el;

      return anime.timeline()
        .add({
          targets: [el],
          opacity: [0, 1],
          duration: 400,
          easing: 'easeInQuad',
          delay: 200,
        })
        .add({
          targets: [el.querySelectorAll('div:not(.no-transform)')],
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 400,
          easing: 'linear',
          delay: (el, i, l) => i * 10,
          offset: "-=200",
        })
        .finished.then(done);
    },

    leave(el, done) {
      if (this.noAnimation) return;
      el = el.querySelector('.tweener-animated') || el;

      return anime.timeline()
        .add({
          targets: [el.querySelectorAll('div')],
          translateY: [0, 20],
          opacity: [1, 0],
          duration: 400,
          easing: 'linear',
          delay: (el, i, l) => (l - i) * 10,
        })
        .add({
          targets: [el],
          opacity: [1, 0],
          duration: 400,
          easing: 'easeInQuad',
          offset: "-=200"
        })
        .finished.then(done)
    }
  }
}

</script>
