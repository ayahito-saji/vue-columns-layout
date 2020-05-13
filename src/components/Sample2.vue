<template>
  <div>
    <div class="columns-layout-handle">sample component2</div>
    <button @click='addColumn({ name: "Sample" })'>add</button>
    <button @click='removeColumn()'>remove</button>
    <button @click='forwardPage({ name: "Sample" })'>forward</button>
    <button @click='forwardPage({ name: "Sample" }, { deleteHistory: true })'>forward delete history</button>
    <button @click='forwardPage({ name: "Sample" }, { replace: true })'>replace</button>
    <button @click='backPage()' :disabled="!canBackPage">back</button>
  </div>
</template>
<script>
  export default {
    props: ["column", "addColumn", "removeColumn", "forwardPage", "backPage", "canBackPage"]
  }
</script>
