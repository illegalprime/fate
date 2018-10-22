<template>
<div id="screen" ref="screen" @click="rollDice()">
  <div id="dice-surface">
    <EntityTransitionGroup id="board">
      <Tweener v-for="entity in entities"
               :component="Entity"
               :componentProps="{entity, mode}"
               :key="entity._id"
               :mode="'screen'"></Tweener>
    </EntityTransitionGroup>

    <transition v-on:enter="enterFocused" v-on:leave="leaveFocused">
      <EntityTransitionGroup v-if="showFocusedEntities" id="focused">
        <Tweener v-for="entity in focusedEntities"
                 :component="Entity"
                 :componentProps="{entity, expanded: true, mode}"
                 :key="entity._id"
                 :mode="'screen'">
        </Tweener>
      </EntityTransitionGroup>
    </transition>

  </div>

  <transition v-on:leave="leaveDice">
    <Dice v-if="dice" @doneRolling="doneRolling"></Dice>
  </transition>
</div>
</template>

<script>
import Entity from './Entity';
import Tweener from './Tweener';
import Dice from './Dice';
import Store from '../Store'
import _ from 'lodash';
import anime from 'animejs'
import EntityTransitionGroup from './EntityTransitionGroup'

let store = new Store();

let Screen = {
  created() {
    store.setPouch(this.$pouch);

    this._liveFinds.commands.on('update', event => {
      this.handleCommand(event.doc);
    });
  },

  components: {
    Tweener,
    EntityTransitionGroup,
    Dice,
  },

  data() {
    return {
      Entity,
      console,
      focusedEntityIds: [],
      showFocusedEntities: false,
      mode: 'screen',
      dice: false,
    };
  },

  computed: {
    focusedEntities() {
      let ids = this.focusedEntityIds;
      return this.entities && this.entities.filter(entity => _.includes(ids, entity._id))
    },
  },

  watch: {
    focusedEntityIds() {
      if (this.focusedEntityIds.length > 0) {
        this.showFocusedEntities = true;
      } else {
        setTimeout(() => {
          if (this.focusedEntityIds.length == 0) {
            this.showFocusedEntities = false;
          }
        }, 20);
      }
    },
  },

  pouch: {
    entities: store.pouch('entity'),
    commands: store.pouch('command', {target: 'screen', run: null}),
  },

  methods: {
    handleCommand(command) {
      try {
        this[command.methodName](...command.args);
        command = store.model(command);
        command.set('run', true);
        command.save();
      } catch(error) {
        // console.log(error);
      }
    },

    focusEntity(entityId) {
      this.focusedEntityIds.push(entityId);
      this.focusedEntityIds = _.uniq(this.focusedEntityIds);
    },

    clearFocus() {
      this.focusedEntityIds = [];
    },

    isFocused(entity) {
      return _.includes(this.focusedEntityIds, entity._id);
    },

    enterFocused(el, done) {
      anime({
        targets: [el],
        opacity: [0, 1],
        scale: [1.5, 1],
        easing: 'easeInQuad',
        duration: 400,
      }).finished.then(done);
    },

    leaveFocused(el, done) {
      anime({
        targets: [el],
        opacity: [1, 0],
        scale: [1, 1.5],
        easing: 'easeInQuad',
        duration: 400,
        delay: 400,
      }).finished.then(done);
    },

    leaveDice(el, done) {
      let keyframes = anime({
        targets: [el],
        opacity: 0,
        translateY: -200,
        easing: 'easeOutQuad',
        duration: 400,
      }).finished.then(done);
    },

    rollDice() {
      anime({
        targets: document.getElementById('dice-surface'),
        rotateX: '50deg',
        translateY: -100,
        opacity: .5,
        easing: "easeInOutSine",
        duration: 300,
      });

      this.dice = true;
    },

    doneRolling(total) {
      anime({
        targets: document.getElementById('dice-surface'),
        rotateX: 0,
        translateY: 0,
        opacity: 1,
        easing: "easeInOutSine",
        duration: 300,
      });

      this.dice = false;
    }
  }
}

export default Screen
</script>

<style lang="scss">
@import '../styles/variables';

#screen {
  perspective: 1000px;
}

.dice-surface {
  transform-style: preserve-3d;
}

#board {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100vw - 60px);
  height: calc(100vh - 60px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: $padding;
}

#focused {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $padding;
  z-index: 1;
  box-shadow: inset 0 0 100vh 0 $color-darker-blue;
  background-color: rgba(#000, .95);
}

</style>
