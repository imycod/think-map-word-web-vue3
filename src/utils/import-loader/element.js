/*
 * @Author: lpj 1248708823@qq.com
 * @Date: 2022-07-13 14:59:50
 * @LastEditors: lpj 1248708823@qq.com
 * @LastEditTime: 2022-07-15 16:03:43
 * @FilePath: \college-teaching\src\common\element-load.js
 * @Description: 饿了么组件按需引入
 */
import { Carousel, CarouselItem, Tabs, TabPane } from 'element-ui';
function elementLoader (Vue) {
  Vue.use(Carousel);
  Vue.use(CarouselItem);
  Vue.use(Tabs)
  Vue.use(TabPane)
}
export default elementLoader
