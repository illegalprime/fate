<template>
<div id="admin">
  <div class="entities">
    create entity
    <form @submit.prevent="$pouch.post('entities', {name: entityName, type: entityType})">
      <input v-model="entityName" placeholder="Name">
      <input v-model="entityType" placeholder="Type">
      <input type="submit" value="Save Entity">
    </form>
    <hr>
    <div v-for="entity in entities">
      entity
      <br>
      <input v-model="entity.type" @change="$pouch.put('entities', entity)">
      <input v-model="entity.name" @change="$pouch.put('entities', entity)">
      <button @click="$pouch.remove('entities', entity)">Remove Entity</button>
      <br>
      aspects
      <div v-for="(aspect, index) in entity.aspects">
        <input v-model="aspect.type" placeholder="Type" @change="$pouch.put('entities', entity)">
        <input v-model="aspect.name" placeholder="Name" @change="$pouch.put('entities', entity)">
        <button @click="deleteAspect(entity, index)">Remove Aspect</button>
      </div>
      create aspect
      <form @submit.prevent="createAspect(entity, {name: aspectName, type: aspectType})">
        <input v-model="aspectType" placeholder="Type">
        <input v-model="aspectName" placeholder="Name">
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
    };
  },

  pouch: {
    entities: {}
  },

  methods: {
    createAspect(entity, aspect) {
      entity.aspects = entity.aspects ? entity.aspects : [];
      entity.aspects.push(aspect);
      this.$pouch.post('entities', entity);
    },

    deleteAspect(entity, index) {
      entity.aspects.splice(index, 1);
      this.$pouch.post('entities', entity);
    }
  }
}
</script>
