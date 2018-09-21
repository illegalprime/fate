<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',

  created: function() {
    this.$pouch.sync('fatedb', 'http://10.0.0.167:5984/fatedb');
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

input {
  background: none !important;
  border: none;
  font-family: Space Mono;
  color: $color-text;
  padding: 0;
  margin: 0;
}

textarea {
  width: 100%;
  background: none !important;
  border: none;
  font-family: Space Mono;
  color: $color-text;
  padding: 0;
  margin: 0;
  font-size: 20px;
  height: 0px;
}

</style>
