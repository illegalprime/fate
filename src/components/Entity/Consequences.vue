<template>
<div class="entity__consequences">
  <h3 class="entity__h3"><div class="entity__h3__inner">Consequences</div></h3>
  <div v-for="consequence in entity.consequences" class="consequence" v-if="mode == 'edit' || (consequence.name && consequence.name.length > 0)">
    <div class="consequence__severity">{{consequence.severity}}</div>
    <div class="consequence__name">
      <textarea-autosize type="text" v-model="consequence.name" :min-height="0" rows="1" v-on:change.native="store.update(entity)"></textarea-autosize>
    </div>
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

.entity__consequences {
  .entity__h3 {
    margin-bottom: 10px;
  }
}

.consequence {
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

.consequence__severity {
  display: flex;
  align-items: center;
  padding-left: 15px;
  margin-right: 20px;
  color: $color-blue;
  white-space: nowrap;
}

.consequence__severity {
  display: flex;
  align-items: center;
  padding-left: 15px;
  margin-right: 20px;
  color: $color-blue;
  white-space: nowrap;
}

.consequence__name {
  position: relative;
  display: flex;
  align-items: center;
  padding: 5px 15px 5px 15px;
  width: 100%;

  textarea {
    width: 100%;
  }

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

@media only screen and (max-width: 500px) {
  .consequence {
    overflow: visible;
    margin-top: 40px;

    &:first-of-type {
      margin-top: 30px;
    }
  }

  .consequence__name {
    &:before {
      display: none;
    }
  }

  .consequence__severity {
    position: absolute;
    top: -28px;
    left: -15px;
  }

  .consequence__invocations {
    overflow: hidden;
  }
}

</style>
