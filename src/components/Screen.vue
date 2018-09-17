<template>
<div id="screen" ref="screen">
  <Entity v-for="entity in entities" :entity="entity" :mode="'screen'"></Entity>
</div>
</template>

<script>
import Entity from './Entity';

export default {
  components: {
    Entity,
  },

  pouch: {
    entities: {}
  },
}
</script>

<style lang="scss">
@import '../styles/variables';

#screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: $padding;
}

</style>
