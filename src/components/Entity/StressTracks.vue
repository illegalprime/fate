<template>
<div class="entity__stress-tracks">
  <h3 class="entity__h3"><div class="entity__h3__inner">Stress Tracks</div></h3>
  <div v-for="stressTrack in entity.stressTracks" class="stress-track">
    <div class="stress-track__name">
      {{stressTrack.name}}
    </div>
    <div class="stress-track__boxes">
      <div v-for="box in stressTrack.boxes">
        <div class="stress-track__box"
             :class="box.checked ? 'stress-track__box--checked' : ''"
             v-on:click="box.checked = !box.checked; store.update(entity)">
          {{ box.value }}
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['entity', 'store'],
}
</script>

<style lang="scss">
@import '../../styles/variables';

.stress-track {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.stress-track__name {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.stress-track__boxes {
  display: flex;
}

.stress-track__box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin-left: 15px;
  border: 2px solid $color-blue;
  cursor: pointer;
  background-color: $color-darker-blue;
  overflow: hidden;
  cursor: pointer;

  transition: color .2s ease,
              border-color .2s ease;

  &:after {
    content: "";
    position: absolute;
    top: 50%;
    width: 50px;
    height: 2px;
    background-color: $color-dark-blue;
    transform: rotate(45deg) scaleX(0);
    transition: transform .2s ease;
  }
}

.stress-track__box--checked {
  border-color: $color-dark-blue;
  color: $color-dark-blue;

  &:after {
    transform: rotate(45deg) scaleX(1);
  }
}

</style>
