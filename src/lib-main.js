import Vue from 'vue'
import ColumnsLayout from './components/ColumnsLayout.vue'

const VueColumnsLayout = {
  install (Vue, { pages }) {
    /* componentsの登録 */
    const components = {
      ColumnsLayout
    }
    for(const [name,c] of Object.entries(components)){
      Vue.component(name,c)
    }
    /* オプションの登録 */
    this.pages = pages

    /* オプションの参照 */
    const that = this
    Vue.prototype.$columns_layout = {
      get pages() {
        return that.pages;
      },
    }
  },
  pages: {}
}
export default VueColumnsLayout
