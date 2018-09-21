<template>
<div class="entity" ref="entity" :class="{ expanded }">
  <div class="entity__type">{{entity.type}}</div>
  <input type="text" class="entity__name" v-model="entity.name" @change="store.update(entity)">
  <div class="col">
    <Aspects :entity="entity" :noAnimation="noAnimation" :store="store"></Aspects>
    <Skills :entity="entity" v-if="shouldShowSkills"></Skills>
  </div>
  <div class="col">

  </div>
</div>
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
      return this.expanded
    }
  },

  props: ['entity', 'mode', 'noAnimation', 'expanded', 'store'],
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

  &.expanded {
    width: 1000px;

    .col {
      width: 50%;
    }
  }
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
  text-align: right;
  width: calc(100% - 150px);

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
