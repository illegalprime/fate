<template>
<div id="screen" ref="screen">
  <Tweener v-for="entity in entities" :component="Entity" :componentProps="{entity}" :mode="'screen'"></Tweener>
</div>
</template>

<script>
import Entity from './Entity';
import Tweener from './Tweener';

export default {
  components: {
    Tweener
  },

  pouch: {
    entities: {}
  },

  data() {
    return {
      Entity,
    };
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
