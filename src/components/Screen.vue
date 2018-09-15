<template>
<transition-group id="screen" name="list-complete">
  <Entity v-for="entity in entities" v-bind:key="entity._id" :entity="entity" class="list-complete-item"></Entity>
</transition-group>
</template>

<script>
import Entity from './Entity'

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
}

.list-complete-item {
  transition: all 1s;
  margin-right: 10px;
}
.list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}

</style>
