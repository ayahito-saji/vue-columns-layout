# Vue Columns Layout

## How to install

## Set Up Project
You use vue3.0 cli. this project can't use vue 2.

You can create some project with vue3-cli.
```
$vue create some-project
$cd some-project/
```

Install Vue Columns Layout with npm.
```
npm install -s vue-columns-layout
```

Create `columns.js` as columns-layout config file in `some-project/src`.
```
import Vue from 'vue'
import VueColumnsLayout from 'vue-columns-layout'
import 'vue-columns-layout/dist/vue-columns-layout.css'

import ColumnPageA from './components/ColumnPageA.vue' // of course you can change name and path
import ColumnPageB from './components/ColumnPageB.vue'
import ColumnPageC from './components/ColumnPageC.vue'
...

Vue.use(VueColumnsLayout, {
  pages: {
    ColumnPageA,
    ColumnPageB,
    ColumnPageC,
    ...
  }
})
```

In `some-project/src/main.js`, you add import `columns.js` sentence.
```
import Vue from 'vue'
import App from './App.vue'
import columns from './columns'
```

Install is done. You can use `<ColumnsLayout>` component on any vue file.

## Use ColumnsLayout component

Basic usage
```
<ColumnsLayout ref="cols" :column-width="320"/>
```
You can add column by `addColumn()`.
```
mounted () {
  // add column to column-layout
  this.$refs.cols.addColumn({ name: "ColumnPageA" })
}
```

## Methods for column page
You can use those props in Column Page.
```
export default {
  props: ["column_id", "columns", "addColumn", "removeColumn", "clearColumns", "forwardPage", "backPage", "canBackPage", "dragging", "index"]
}
```
Column is like browser's tab.
Each tab is stack for history of web page.
Each column is stack for history of page.
Pages are vue components that you create and register on `columns.js`.
Each page is like web page.

### addColumn
Type: Function

addColumn is a method add column into columns-layout.
```
this.addColumn({ name: '<<Page Name>>' }, options)
```

#### Options
```
options = {
  uniqueKey: '<<Unique Key>>' // add unique column with << Unique Key >>
}
```

### removeColumn
Type: Function

removeColumn is a method remove column calling this method.
```
this.removeColumn(options)
```

#### Options
```
options = {
  recursive: Boolean // delete columns recursively
}
```

### clearColumns
Type: Function

clearColumns is a method to clear all Columns.

```
this.clearColumns(options)
```
#### Options
```
options = {
  // nothing
}
```

### forwardPage
Type: Function

forwardPage is a method like `location.href`.
this method make page jump into follow page.
```
this.forwardPage({ name: '<<Page Name>>' }, options)
```

#### Options
```
options = {
  replace: Boolean, // forward page without current history
  deleteHistory: Boolean // forward page without all history
}
```

### backPage
Type: Function

backPage is a method like `history.back()`.
this method make page jump back.

```
this.backPage(options)
```
#### Options
```
options = {
  // nothing
}
```

### canBackPage
Type: Boolean

canBackPage is a boolean whether this column have previous page.
If this column have previous page, return true.
### dragging
Type: Boolean

Column is draggable and sortable.
If this column is dragged, return true.
### index
Type: Number

column index.
