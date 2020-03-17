<template>
  <div id="app">
    <ColumnsLayout ref="cols" :column-width="240"/>
  </div>
</template>

<script>
import ColumnsLayout from './components/ColumnsLayout.vue'

export default {
  name: 'App',
  components: {
    ColumnsLayout
  },
  mounted: function () {
    this.$refs.cols.addColumn({ name: "Sample" })
  }
}
</script>

<style>
  html, body, #app {
     width: 100%;
     height: 100%;
     padding: 0;
     margin: 0;
  }
</style>
