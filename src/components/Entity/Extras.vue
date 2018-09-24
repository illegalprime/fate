<template>
<div class="entity__extras" v-if="mode == 'edit' || (entity.extras && entity.extras.length > 0)">
  <h3 class="entity__h3"><div class="entity__h3__inner">Extras</div></h3>
  <div class="entity__extras__inner" v-if="entity.extras || true">
    <textarea-autosize type="text" v-model="entity.extras" :min-height="0" rows="1" v-on:change.native="store.update(entity)"></textarea-autosize>
  </div>
</div>
</template>

<script>
export default {
  props: ['entity', 'store', 'mode'],
}
</script>

<style lang="scss">
@import '../../styles/variables';

.entity__extras {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.entity__extras__inner {
  position: relative;
  background: $color-dark-blue;
  padding: 15px;
  border-left: 5px solid rgba($color-blue, .5);
}

</style>
