<template>
  <div :class="{ dragging: dragging }">
    <div class="columns-layout-handle">sample component</div>
    {{ index }}
    <button @click='addColumn({ name: "Sample" })'>add</button>
    <button @click='removeColumn()'>remove</button>
    <button @click='forwardPage({ name: "Sample2" })'>forward</button>
    <button @click='forwardPage({ name: "Sample2", deleteHistory: true })'>forward delete history</button>
    <button @click='forwardPage({ name: "Sample2", replace: true })'>replace</button>
    <button @click='backPage()' :disabled="!canBackPage">back</button>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>
    sample component<br/>

  </div>
</template>
<script>
  export default {
    props: ["column", "addColumn", "removeColumn", "forwardPage", "backPage", "canBackPage", "dragging", "index"]
  }
</script>
<style>
  .dragging {
    background-color: #ffeeee;
  }
</style>
