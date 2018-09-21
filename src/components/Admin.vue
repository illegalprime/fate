<template>
<div id="admin">
  <button @click="command('screen', 'clearFocus')">Clear Focus</button>
  <div class="entities">
    create entity
    <form @submit.prevent="createEntity">
      <input v-model="entityName" placeholder="Name">
      <input v-model="entityType" placeholder="Type">
      <input type="submit" value="Save Entity">
    </form>
    <hr>
    <div v-for="entity in entities">
      entity
      <br>
      <input v-model="entity.type" @change="store.update(entity)">
      <input v-model="entity.name" @change="store.update(entity)">
      <button @click="store.destroy(entity)">Remove Entity</button>
      <button @click="command('screen', 'focusEntity', entity._id)">Focus Entity</button>
      <br>
      aspects
      <div v-for="(aspect, index) in entity.aspects">
        <input v-model="aspect.type" placeholder="Type" @change="store.update(entity)">
        <input v-model="aspect.name" placeholder="Name" @change="store.update(entity)">
        <input v-model="aspect.invocationsCount" placeholder="Invocations" type="number" @change="store.update(entity)">
        <input v-model="aspect.invocationsUsedCount" placeholder="Invocations Used" type="number" @change="store.update(entity)">
        <button @click="removeAspect(entity, index)">Remove Aspect</button>
      </div>
      create aspect
      <form @submit.prevent="addAspect(entity, {name: aspectName, type: aspectType, invocationsCount, invocationsUsedCount: 0})">
        <input v-model="aspectType" placeholder="Type">
        <input v-model="aspectName" placeholder="Name">
        <input v-model="invocationsCount" placeholder="Invocations" type="number">
        <input type="submit" value="Save Aspect">
      </form>
      <hr>
    </div>
  </div>
</div>
</template>

<script>
import Store from '../Store';
let store = new Store();

const Admin = {
  created() {
    store.setPouch(this.$pouch);
  },

  data() {
    return {
      store,
      entityName: '',
      entityType: '',
      aspectName: '',
      aspectType: '',
      invocationsCount: 0,
    };
  },

  pouch: {
    entities: store.pouch('entity')
  },

  methods: {
    createEntity() {
      let entity = store.create('entity', {
        name: this.entityName,
        type: this.entityType,
      });

      entity.set('skills', [
        ['Athletics', 'Burglary', 'Contacts', 'Crafts'],
        ['Deceive', 'Drive', 'Empathy'],
        ['Fight', 'Investigate'],
        ['Notice'],
        []
      ])

     entity.save();
    },

    command(target, methodName, ...args) {
      store.create('command', {target, methodName, args}).save();
    },

    addAspect(entity, aspect) {
      entity.aspects = entity.aspects ? entity.aspects : [];
      entity.aspects.push(aspect);
      store.save(entity);
    },

    removeAspect(entity, index) {
      entity.aspects.splice(index, 1);
      store.save(entity);
    },
  }
}

export default Admin
</script>

<style lang="scss">
@import '../styles/variables';

#admin {
  input {
    background-color: $color-dark-blue !important;
    padding: 5px;
    text-align: left;
  }
}

</style>
