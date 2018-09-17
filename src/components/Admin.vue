<template>
<div id="admin">
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
      <input v-model="entity.type" @change="updateEntity(entity)">
      <input v-model="entity.name" @change="updateEntity(entity)">
      <button @click="deleteEntity(entity)">Remove Entity</button>
      <br>
      aspects
      <div v-for="(aspect, index) in entity.aspects">
        <input v-model="aspect.type" placeholder="Type" @change="updateEntity(entity)">
        <input v-model="aspect.name" placeholder="Name" @change="updateEntity(entity)">
        <input v-model="aspect.invocationsCount" placeholder="Invocations" type="number" @change="updateEntity(entity)">
        <input v-model="aspect.invocationsUsedCount" placeholder="Invocations Used" type="number" @change="updateEntity(entity)">
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
export default {
  data() {
    return {
      entityName: '',
      entityType: '',
      aspectName: '',
      aspectType: '',
      invocationsCount: 0,
    };
  },

  pouch: {
    entities: {}
  },

  methods: {
    createEntity() {
      let entity = {
        name: this.entityName,
        type: this.entityType,
        aspects: [],
        skills: [
          [null, null, null, null],
          [null, null, null],
          [null, null],
          [null],
          [],
        ],
        extras: [],
        stunts: [],

      };

      entity.skills = [
        ['Athletics', 'Burglary', 'Contacts', 'Crafts'],
        ['Deceive', 'Drive', 'Empathy'],
        ['Fight', 'Investigate'],
        ['Notice'],
        []
      ]

      this.$pouch.post('entities', entity);
    },

    updateEntity(entity) {
      this.$pouch.put('entities', entity);
    },

    deleteEntity(entity) {
      this.$pouch.remove('entities', entity);
    },

    addAspect(entity, aspect) {
      entity.aspects = entity.aspects ? entity.aspects : [];
      entity.aspects.push(aspect);
      this.$pouch.post('entities', entity);
    },

    removeAspect(entity, index) {
      entity.aspects.splice(index, 1);
      this.$pouch.post('entities', entity);
    },
  }
}
</script>
