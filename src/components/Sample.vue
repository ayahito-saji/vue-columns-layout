<template>
  <div :class="{ dragging: dragging }">
    <div class="columns-layout-handle">sample component</div>
    <button @click='addColumn({ name: "Sample" })'>add</button>
    <button @click='addColumn({ name: "Sample" }, { unique: "uniqueId" })'>add unique</button>
    <button @click='removeColumn()'>remove</button>
    <button @click='removeColumn({ recursive: true })'>remove recursive</button>
    <button @click='forwardPage({ name: "Sample2" })'>forward</button>
    <button @click='forwardPage({ name: "Sample2" }, { deleteHistory: true })'>forward delete history</button>
    <button @click='forwardPage({ name: "Sample2" }, { replace: true })'>replace</button>
    <button @click='backPage()' :disabled="!canBackPage">back</button>
    <button @click='clearColumns()'>reset</button><br/>
    <button @click='growColumn()'>grow</button>
    <button @click='shrinkColumn()'>shrink</button>
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
    props: ["column_id", "columns", "addColumn", "removeColumn", "growColumn", "shrinkColumn", "clearColumns", "forwardPage", "backPage", "canBackPage", "dragging", "index"],
    methods: {
      resetColumns () {
        this.clearColumns()
        this.addColumn({ name: "Sample" })
      }
    }
  }
</script>
<style>
  .dragging {
    background-color: #ffeeee;
  }
</style>
