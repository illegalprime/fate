<template>
<div class="entity__skills">
  <h3 class="entity__h3"><div class="entity__h3__inner">Skills</div></h3>
  <div v-for="(skillGroup, skillGroupNum) in entity.skills" v-if="skillGroup.length > 0" class="skill-group">
    <div class="skill-group__name">
      <div class="skill-group__name__rank">
        {{ranks[skillGroupNum + 1]}}
      </div>
      <div class="skill-group__name__value">
        +{{skillGroupNum + 1}}
      </div>
    </div>
    <div v-for="skill in skillGroup" class="skill" :class="skill ? '' : 'skill--blank'">
      {{skill || "Select"}}
    </div>
  </div>
</div>
</template>

<script>
import Ladder from '../../Ladder';

export default {
  props: ['entity'],

  data() {
    return {
      ranks: Ladder.ranks,
    }
  },

}
</script>

<style lang="scss">
@import '../../styles/variables';
.skill-group {
  position: relative;
  width: 100%;
  margin-bottom: 25px;

  &:first-of-type {
    margin-top: 25px;
  }
}

.skill {
  display: inline-block;
  align-items: center;
  flex: 1 0;
  position: relative;
  background-color: $color-dark-blue;
  text-align: center;
  border-radius: 500px;
  padding: 5px 15px 5px 15px;
  margin-top: 15px;
}

.skill-group__name {
  display: inline-block;
  align-items: center;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    top: -4px;
    background: linear-gradient(-90deg, $color-darker-blue, $color-dark-blue, $color-darker-blue);
    z-index: 1;
  }
}

.skill-group__name__value {
  color: $color-blue;
}

.skill-group__name__rank {
  position: absolute;
  // display: none;
  font-size: 12px;
  top: -14px;
  left: 0;
  color: $color-dark-blue;
  font-weight: bolder;
  background-color: $color-darker-blue;
  padding-right: 15px;
  z-index: 2;
}

.skill {
  border: 1px solid $color-darker-blue;
  margin-left: 5px;
  min-width: 10%;
}

.skill--blank {
  border: 1px solid $color-dark-blue;
  background-color: $color-darker-blue;
  color: $color-dark-blue;
}

</style>
