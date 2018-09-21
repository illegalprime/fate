<template>
<div class="entity__aspects" ref="aspects">
  <div v-for="aspect in entity.aspects" class="aspect">
    <div class="aspect__type">{{aspect.type}}</div>
    <div class="aspect__name">
      <textarea-autosize type="text" v-model="aspect.name" :min-height="0" rows="1" v-on:change.native="store.update(entity)"></textarea-autosize>
    </div>
    <div class="aspect__invocations no-transform" v-if="aspect.invocationsCount > 0">
      <div v-for="n in parseInt(aspect.invocationsCount)"
           class="invocation-checkbox"
           :class="n <= aspect.invocationsUsedCount ? 'invocation-checkbox--checked' : ''"
           v-on:click="checkInvocation(aspect, n)">
      </div>
    </div>
  </div>
</div>

</template>

<script>
import smoothReflow from 'vue-smooth-reflow';

export default {
  mixins: [smoothReflow],
  props: ['entity', 'noAnimation', 'store'],

  pouch: {
    entities: {}
  },

  mounted() {
    if (this.noAnimation) return;

    this.$smoothReflow({
      el: this.$refs.aspects
    });
  },

  methods: {
    checkInvocation(aspect, n) {
      n <= aspect.invocationsUsedCount ? aspect.invocationsUsedCount-- : aspect.invocationsUsedCount++;
      this.$pouch.put('fatedb', this.entity);
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/variables';

.aspect {
  position: relative;
  display: flex;
  background-color: $color-dark-blue;
  overflow: hidden;
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }

  &:after {
    content: "";
    position: absolute;
    height: 1000px;
    top: -500px;
    width: 100px;
    right: -100px;
    background-color: $color-darker-blue;
    transform: rotate(15deg);
  }

}

.aspect__type {
  display: flex;
  align-items: center;
  padding-left: 15px;
  margin-right: 20px;
  color: $color-blue;
  white-space: nowrap;
}

.aspect__name {
  position: relative;
  display: flex;
  align-items: center;
  padding: 5px 15px 5px 15px;
  flex-grow: 999;
  // min-width: 50%;
  &:before {
    content: "";
    position: absolute;
    height: 1000px;
    top: -500px;
    width: 5px;
    left: 5px;
    background-color: $color-darker-blue;
    transform: rotate(15deg);
  }
}

.aspect__invocations {
  position: relative;

  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  justify-content: center;
  align-content: flex-start;

  margin-right: 15px;
  padding: 5px 10px 5px 5px;
  transform: skew(-15deg);


  &:before {
    content: "";
    position: absolute;
    height: 1000px;
    top: -500px;
    width: 5px;
    left: 0;
    background-color: $color-darker-blue;
    // transform: rotate(15deg);
  }
}

@keyframes invocation {
  0% {
    transform: scaleX(1);
    background-color: $color-darker-blue;
  }

  50% {
    transform: scaleX(0);
    background-color: $color-darker-blue;
  }
  51% {
    transform: scaleX(0);
    background-color: $color-blue;
  }

  100% {
    transform: scaleX(1);
    background-color: $color-blue;
  }
}

@keyframes invocation-reverse {
  0% {
    transform: scaleX(1);
    background-color: $color-blue;
  }

  50% {
    transform: scaleX(0);
    background-color: $color-blue;
  }
  51% {
    transform: scaleX(0);
    background-color: $color-darker-blue;
  }

  100% {
    transform: scaleX(1);
    background-color: $color-darker-blue;
  }
}

.invocation-checkbox {
  position: relative;
  left: 8px;
  border: 2px solid $color-blue;
  width: 14px;
  min-width: 14px;
  height: 14px;
  margin: 5px;
  display: inline-block;
  animation: invocation-reverse 1s;
  cursor: pointer;
}

.invocation-checkbox--checked {
  background-color: $color-blue;
  animation: invocation 1s;
}

@media only screen and (max-width: 500px) {
  .entity {
    width: auto;
    margin: 0 0 10px 0;
    padding-top: 75px;
  }

  .entity__name {
    font-size: 20px;
  }

  .aspect {
    overflow: visible;
    margin-bottom: 40px;
  }

  .aspect__name {
    &:before {
      display: none;
    }
  }

  .aspect__type {
    position: absolute;
    top: -28px;
    left: -15px;
  }

  .aspect__invocations {
    overflow: hidden;
  }
}
</style>
