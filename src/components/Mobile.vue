<template>
<div id="screen" ref="screen">
  <Entity v-for="entity in entities" :entity="entity" :key="entity._id" :store="store"></Entity>
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
}
</script>

<style lang="scss">
@import '../styles/variables';

#mobile {
  display: flex;
  flex-direction: column;
}

</style>
