<template>
  <div class="wrapper">
    <draggable class="columns"
      @start="dragStart"
      @end="dragEnd"
      v-bind="{ handle: '.columns-layout-handle', animation: '200' }"
      v-model="columns"
    >
      <div
        class="column"
        v-for="(column, index) in convertedColumns"
        :style="{ width: Math.max(Math.min(column.width, column.maxWidth), column.minWidth)+'px' }"
        :key="column.id"
      >
        <div
          class="column-inner"
          :style="{ width: Math.max(Math.min(column.width, column.maxWidth), column.minWidth)+'px' }"
        >
          <components
            :is="column.component"
            :column_id="column.id"
            :columns="columns"
            :addColumn="ac(column.id)"
            :removeColumn="rc(column.id)"
            :growColumn="gc(column.id)"
            :shrinkColumn="sc(column.id)"
            :clearColumns="clearColumns"
            :forwardPage="fp(column.id)"
            :backPage="bp(column.id)"
            :canBackPage="column.canBackPage"
            :width="column.width"
            :index="index"
            :params="column.params"
            :dragging="index===draggingColumnIndex"
          ></components>
        </div>
      </div>
    </draggable>
  </div>
</template>
<script>
  import nanoid from 'nanoid'
  import draggable from 'vuedraggable'

  const log = ( ...args ) => { if (process.env.NODE_ENV === 'development')console.log(...args) }
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
        log("CONVERTED!!")
        const convertedColumns = this.columns.map((column) => {
          if (!column) throw new Error("Invalid column data: "+column)
          if (!column.history) throw new Error("Column history is required.")
          if (!(column.history.length && column.history.length > 0)) throw new Error("Column history is invalid.")
          let convertedColumn = Object.assign({}, column.history[column.history.length - 1])
          if (!this.$columns_layout.pages[convertedColumn.name]) throw new ReferenceError("'"+convertedColumn.name+"' is undefined component.")
          convertedColumn.component = this.$columns_layout.pages[convertedColumn.name]
          convertedColumn.id = column.id
          convertedColumn.canBackPage = (column.history.length >= 2)
          convertedColumn.width = column.width
          convertedColumn.maxWidth = column.maxWidth
          convertedColumn.minWidth = column.minWidth
          return convertedColumn
        })
        return convertedColumns
      }
    },
    methods: {
      addColumn (page, options, parentId) {
        log("ADD COLUMN")
        if (!page) throw new Error("Invalid column data: "+page)
        if (!page.name) throw new Error("Page name is required.")
        const columnId = nanoid()

        // ユニークなカラム
        const parentColumn = this.columns.find((column) => { return column.id === parentId })
        if (options && options.unique && parentColumn) {
          const uniqueColumnId = parentColumn.uniqueKeys[options.unique]
          if (uniqueColumnId && this.columns.find((column) => { return column.id === uniqueColumnId }) != null) return
            parentColumn.uniqueKeys[options.unique] = columnId
        }

        const column = {
          id: columnId,
          width: options && options.width ? options.width : 320,
          minWidth: options && options.minWidth ? options.minWidth : 320,
          maxWidth: options && options.maxWidth ? options.maxWidth : 640,
          deltaWidth: options && options.deltaWidth ? options.deltaWidth : 160,
          history: [{
            name: page.name,
            params: page.params || {}
          }],
          parentId: null,
          children: [],
          uniqueKeys: {}
        }
        if (parentId != undefined) {
          const parentColumn = this.columns.find((column) => { return column.id === parentId })
          if (parentColumn != null) {
            parentColumn.children.push(columnId)
            column.parentId = parentColumn.id
          }
        }
        this.columns.push(column)
      },
      removeColumn (id, options) {
        log("REMOVE COLUMN", id)
        if (!id) throw new Error("Id is required: "+id)
        const column = this.columns.find((column) => { return column.id === id })
        if (column == null) throw new ReferenceError("Column(id: "+id+") is not found")
        if (options) {
          if (options.recursive) {
            column.children.concat().forEach((childId) => {
              this.removeColumn(childId, options)
            })
          }
        }

        const parentId = column.parentId
        if (parentId) {
          const parentColumn = this.columns.find((column) => { return column.id === parentId })
          if (parentColumn != null) parentColumn.children.splice(parentColumn.children.indexOf(id), 1)
        }
        const index = this.columns.findIndex((column) => { return column.id === id })
        this.columns.splice(index, 1)
      },
      growColumn (id, options) {
        log("GROW COLUMN", id)
        if (!id) throw new Error("Id is required: "+id)
        const column = this.columns.find((column) => { return column.id === id })
        if (column == null) throw new ReferenceError("Column(id: "+id+") is not found")
        if (column.width < column.maxWidth) column.width += column.deltaWidth
      },
      shrinkColumn (id, options) {
        log("SHRINK COLUMN", id)
        if (!id) throw new Error("Id is required: "+id)
        const column = this.columns.find((column) => { return column.id === id })
        if (column == null) throw new ReferenceError("Column(id: "+id+") is not found")
        if (column.width > column.minWidth) column.width -= column.deltaWidth
      },
      clearColumns (options) {
        log("CLEAR COLUMNS")
        this.columns = []
      },
      forwardPage (id, page, options) {
        log("FORWARD PAGE", id)
        if (!id) throw new Error("Id is required: "+id)
        const index = this.columns.findIndex((column) => { return column.id === id })
        if (index == -1) throw new ReferenceError("Column(id: "+id+") is not found")
        if (options) {
          if (options.deleteHistory == true) {
            this.columns[index].history.splice(0)
          } else if (options.replace == true) {
            this.columns[index].history.splice(-1)
          }
        }
        this.columns[index].history.push({
          name: page.name,
          params: page.params || {}
        })
      },
      backPage (id, options) {
        log("BACK PAGE", id)
        if (!id) throw new Error("Id is required: "+id)
        const index = this.columns.findIndex((column) => { return column.id === id })
        if (index == -1) throw new ReferenceError("Column(id: "+id+") is not found")
        if (this.columns[index].history.length >= 2) {
          this.columns[index].history.splice(this.columns[index].history.length-1, 1)
        }
      },
      ac (parentId) { return ((page, options) => this.addColumn(page, options, parentId)) },
      rc (id) { return ((options) => this.removeColumn(id, options)) },
      gc (id) { return ((options) => this.growColumn(id, options)) },
      sc (id) { return ((options) => this.shrinkColumn(id, options)) },
      fp (id) { return ((page, options) => this.forwardPage(id, page, options)) },
      bp (id) { return ((options) => this.backPage(id, options)) },
      dragStart (e) {
        log("DRAG START", e.oldIndex)
        this.draggingColumnIndex = e.oldIndex
      },
      dragEnd (e) {
        log("DRAG END")
        this.draggingColumnIndex = null
      }
    },
    created () {
      log("this.$columns_layout", this.$columns_layout)
    },
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
  }
  .column-inner {
    transition-duration: 200ms;
    height: 100%;
    overflow-y: auto;
  }
</style>
