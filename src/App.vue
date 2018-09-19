<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',

  created: function() {
    this.$pouch.sync('entities', 'http://10.0.0.167:5984/fate-entities');
    this.$pouch.sync('commands', 'http://10.0.0.167:5984/fate-commands');
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Space+Mono');
@import 'styles/variables';

body {
  background-color: $color-bg;
  color: $color-text;
  font-family: Space Mono;
}

</style>
