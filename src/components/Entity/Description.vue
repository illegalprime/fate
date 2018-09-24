<template>
<div class="entity__description">
  <h3 class="entity__h3" v-if="mode != 'screen'"><div class="entity__h3__inner">Description</div></h3>
  <div class="entity__description__inner" v-if="entity.description || true">
    <textarea-autosize type="text" v-model="entity.description" :min-height="0" rows="1" v-on:change.native="store.update(entity)"></textarea-autosize>
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

.entity__description__inner {
  position: relative;
  background: $color-dark-blue;
  padding: 15px;
  border-left: 5px solid rgba($color-blue, .5);
}

</style>
