<template>
<div id="mobile">
  <div class="entities">
    <form @submit.prevent="$pouch.post('entities', {name, type})">
      <input v-model="name" placeholder="Name">
      <input v-model="type" placeholder="Type">
      <input type="submit" value="Save Entity">
    </form>
    <div v-for="entity in entities">
      <input v-model="entity.name" @change="$pouch.put('entities', entity)">
      <input v-model="entity.type" @change="$pouch.put('entities', entity)">
      <button @click="$pouch.remove('entities', entity)">Remove</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      type: '',
    };
  },

  pouch: {
    entities: {}
  },
}
</script>
