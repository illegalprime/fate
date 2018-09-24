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

@keyframes stress-box {
  0% {
    transform: scaleX(1);
    background-color: $color-darker-blue;
    color: white;
  }

  50% {
    transform: scaleX(0);
    background-color: $color-darker-blue;
    color: white;
  }
  51% {
    transform: scaleX(0);
    background-color: $color-blue;
    color: $color-darker-blue;
  }

  100% {
    transform: scaleX(1);
    background-color: $color-blue;
    color: $color-darker-blue;
  }
}

@keyframes stress-box-reverse {
  0% {
    transform: scaleX(1);
    background-color: $color-blue;
    color: $color-darker-blue;
  }

  50% {
    transform: scaleX(0);
    background-color: $color-blue;
    color: $color-darker-blue;
  }
  51% {
    transform: scaleX(0);
    background-color: $color-darker-blue;
    color: white;
  }

  100% {
    transform: scaleX(1);
    background-color: $color-darker-blue;
    color: white;
  }
}

.stress-track__box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin-left: 15px;
  border: 2px solid $color-blue;
  cursor: pointer;
  background-color: $color-darker-blue;

  animation: stress-box-reverse 1s;
}

.stress-track__box--checked {
  background-color: $color-blue;
  color: $color-dark-blue;

  animation: stress-box 1s;
}

</style>
