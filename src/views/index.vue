<template>
  <div class="common-layout">
    <div id="main" style="width: 100%; height: 100vh"></div>
    <element-drawer
        :drawer="drawer"
        @close="close"
        :data="drawerData"
    ></element-drawer>
  </div>
</template>

<script>
import {nextTick, onMounted /*getCurrentInstance*/, onUnmounted, watch} from "vue";
import useDrawer from "@/combination/drawer.js";
import useNetwork from "@/combination/useNetwork";

export default {
  name: "App",
  components: {},
  setup() {
    const {drawer, close, data: drawerData} = useDrawer();

    function onNetworkClick(params) {
      console.log('params---->', params)
    }

    function onNetworkDoubleClick(params) {
      console.log(params.node)
      drawer.value = true;
      drawerData.title = params.node.label
    }

    const networkOptions = {
      id: 'main',
      on: {onNetworkClick, onNetworkDoubleClick}
    }
    useNetwork(networkOptions);

    return {
      drawer,
      drawerData,
      close,
    };
  },
};
</script>

<style lang="less">
.common-layout {
  .aside {
    height: 100vh;
  }

  .main-container {
    width: calc(100% - 200px);

    .fixed-header {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 9;
      width: calc(100% - 200px);
      transition: width 0.28s;
    }

    #main {
      width: 100%;
      height: 100%;
    }
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
}
</style>
