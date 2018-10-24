<template>
<div id="mobile" ref="mobile">
  <Entity v-for="entity in entities" :entity="entity" :key="entity._id" :store="store" :mode="'edit'"></Entity>
  <div class="fab-container">
    <div class="fab roll-dice" @click="command('screen', 'rollDice')">
      <font-awesome-icon icon="dice-d6" />
    </div>
    <div class="fab roll-dice">
      <font-awesome-icon :icon="['fab', 'galactic-senate']" />
    </div>
  </div>
</div>
</template>

<script>
import Entity from './Entity';
import Store from '../Store'

let store = new Store();

export default {
  components: {
    Entity,
  },

  created() {
    store.setPouch(this.$pouch);
  },

  pouch: {
    entities: store.pouch('entity'),
  },

  data() {
    return { store };
  },

  methods: {
    command(target, methodName, ...args) {
      store.create('command', {target, methodName, args}).save();
    },
  }
}
</script>

<style lang="scss">
@import '../styles/variables';

#mobile {
  display: flex;
  flex-direction: column;
  margin: -8.5px;
}

.fab-container {
  z-index: 999;
  backtround-color: red;
  position: fixed;
  bottom: 15px;
  right: 15px;
  display: flex;
}

.fab {
  margin-left: 15px;

  width: 80px;
  height: 80px;
  border-radius: 100%;
  background-color: $color-darker-blue;
  box-shadow: 0 0px 5px $color-blue;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 3em;
  color: $color-blue;
}

</style>
