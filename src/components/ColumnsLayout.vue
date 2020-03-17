<template>
  <div class="wrapper">
      <draggable class="columns"
        @start="dragStart"
        @end="dragEnd"
        v-bind="{ handle: '.columns-layout-handle', animation: 200 }"
        v-model="columns"
      >
        <div
          class="column"
          :style="{ width: ColumnWidth+'px' }"
          v-for="(column, index) in convertedColumns"
          :key="column.id"
        >
          <components
            :is="column.component"
            :column_id="column.id"
            :addColumn="addColumn"
            :removeColumn="rc(column.id)"
            :forwardPage="fp(column.id)"
            :backPage="bp(column.id)"
            :canBackPage="column.canBackPage"
            :index="index"
            :dragging="index===draggingColumnIndex"
          ></components>
        </div>
      </draggable>
    </div>
  </div>
</template>
<script>
  import draggable from 'vuedraggable'
  export default {
    props: ["ColumnWidth"],
    name: 'ColumnsLayout',
    components: {
      draggable
    },
    data () {
      return {
        columns: [],
        draggingColumnIndex: null
      }
    },
    computed: {
      convertedColumns: function () {
        console.log("CONVERTED!!")
        const convertedColumns = this.columns.map((column) => {
          if (!column) throw new Error("Invalid column data: "+column)
          if (!column.history) throw new Error("Column history is required.")
          if (!(column.history.length && column.history.length > 0)) throw new Error("Column history is invalid.")
          let convertedColumn = Object.assign({}, column.history[column.history.length - 1])
          if (!this.$columns_layout.pages[convertedColumn.name]) throw new ReferenceError("'"+convertedColumn.name+"' is undefined component.")
          convertedColumn.component = this.$columns_layout.pages[convertedColumn.name]
          convertedColumn.id = column.id
          convertedColumn.canBackPage = (column.history.length >= 2)
          return convertedColumn
        })
        return convertedColumns
      }
    },
    methods: {
      getUniqueStr: function () {
        return new Date().getTime().toString(16) + Math.floor(65536*Math.random()).toString(16) + Math.floor(65536*Math.random()).toString(16)
      },
      addColumn (page) {
        console.log("ADD COLUMN")
        if (!page) throw new Error("Invalid column data: "+page)
        if (!page.name) throw new Error("Page name is required.")
        this.columns.push({
          id: this.getUniqueStr(),
          history: [{
            name: page.name
          }]
        })
      },
      removeColumn (id) {
        console.log("REMOVE COLUMN", id)
        if (!id) throw new Error("Id is required: "+id)
        const index = this.columns.findIndex((column) => { return column.id === id })
        if (index == -1) throw new ReferenceError("Column(id: "+id+") is not found")
        this.columns.splice(index, 1)
      },
      forwardPage (id, page) {
        console.log("FORWARD PAGE", id)
        if (!id) throw new Error("Id is required: "+id)
        const index = this.columns.findIndex((column) => { return column.id === id })
        if (index == -1) throw new ReferenceError("Column(id: "+id+") is not found")
        if (page.deleteHistory == true) {
          this.columns[index].history.splice(0)
        } else if (page.replace == true) {
          this.columns[index].history.splice(-1)
        }
        this.columns[index].history.push({
          name: page.name
        })
      },
      backPage (id) {
        console.log("BACK PAGE", id)
        if (!id) throw new Error("Id is required: "+id)
        const index = this.columns.findIndex((column) => { return column.id === id })
        if (index == -1) throw new ReferenceError("Column(id: "+id+") is not found")
        if (this.columns[index].history.length >= 2) {
          this.columns[index].history.splice(this.columns[index].history.length-1, 1)
        }
      },
      rc (id) { return (() => this.removeColumn(id)) },
      fp (id) { return ((page) => this.forwardPage(id, page)) },
      bp (id) { return (() => this.backPage(id)) },
      dragStart (e) {
        console.log("DRAG START", e.oldIndex)
        this.draggingColumnIndex = e.oldIndex
      },
      dragEnd (e) {
        console.log("DRAG END")
        this.draggingColumnIndex = null
      }
    },
    created () {
      console.log("this.$columns_layout", this.$columns_layout)
    }
  }
</script>
<style scoped>
  .wrapper {
    width: 100%;
    height: 100%;
    overflow-x: auto;
  }
  .columns {
    height: 100%;
    display: flex;
  }
  .column {
    flex-grow: 0;
    flex-shrink: 0;
    height: 100%;
    overflow-y: auto;
  }
</style>
