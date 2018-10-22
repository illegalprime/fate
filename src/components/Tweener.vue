<template>

<div class="tweener">
  <component class="tweener-reflow" ref="reflowEl" v-bind="componentProps" v-bind:is="component" :noAnimation="true"></component>
  <component class="tweener-animated" ref="animateEl" v-bind="componentProps" v-bind:is="component"></component>
</div>

</template>

<script>
import anime from 'animejs'

export default {
  props: ['component', 'componentProps'],

  data() {
    return {
      offsetLeft: 0,
      offsetTop: 0,
    };
  },

  watch: {
    offsetLeft() {
      this.animateElement()
    },

    offsetTop() {
      this.animateElement()
    },
  },

  mounted() {
    this.keepUpdating = true;
    this.positionedOnce = false;
    this.updatePosition()
  },

  beforeDestroy() {
    this.keepUpdating = false
  },

  methods: {
    updatePosition() {
      setTimeout(() => {
        if (this.$refs.reflowEl) {
          this.offsetTop = this.$refs.reflowEl.$el.offsetTop
          this.offsetLeft = this.$refs.reflowEl.$el.offsetLeft
        }

        if (this.keepUpdating)
          this.updatePosition();
      }, 20);
    },

    animateElement() {
      let duration = this.positionedOnce ? 500 : 0;

      anime({
        targets: this.$refs.animateEl.$el,
        translateX: this.offsetLeft,
        translateY: this.offsetTop,
        easing: 'easeInOutSine',
        duration,
      });

      this.$refs.animateEl.$el.style.visibility = 'visible';

      this.positionedOnce = true;
    }
  },
}
</script>

<style lang="scss">
.tweener {
  .tweener-animated {
    position: fixed;
    top: 0;
    left: 0;
    visibility: hidden;
  }

  .tweener-reflow {
    visibility: hidden;
  }
}
</style>
