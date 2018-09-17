<template>
<div id="screen" ref="screen">
  <Entity v-for="entity in entities" :entity="entity"></Entity>
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

#mobile {
  display: flex;
  flex-direction: column;
}

</style>
