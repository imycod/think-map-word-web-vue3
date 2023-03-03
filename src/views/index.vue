<template>
  <div class="common-layout">
    <div id="main" style="width: 100%; height: 100vh"></div>
    <element-drawer
      :drawer2="drawer2"
      @close="close"
      :drawerContent="drawerContent"
    ></element-drawer>
  </div>
</template>

<script>
import { onMounted /*getCurrentInstance*/, onUnmounted,watch } from "vue";
import Graph from "@/utils/Graph.js";
import useDrawer from "@/combination/home/drawer.js";

import { useSearch as useSearchStore } from "@/stores/search.js";

export default {
  name: "App",
  components: {},
  setup() {
    // drawer start
    const { drawer2, close, drawerContent } = useDrawer();
    // drawer end

    // stores start
    const searchStore = useSearchStore();
    // stores end

    let graph = null;
    onMounted(() => {
      // const { proxy } = getCurrentInstance();
      graph = new Graph(document.getElementById("main"));
      graph.chart.on("click", handleClick);
      graph.setOption(searchStore.option);
      window.addEventListener("resize", resize, false);
    });

    watch(()=>searchStore.option,(newVal,oldVal)=>{
       graph.initOption(newVal);
    },{deep:true})

    onUnmounted(() => {
      window.removeEventListener("resize", resize);
    });

    function resize() {
      graph.chart.resize();
    }

    function handleClick(params) {
      // 点击echarts的nodes
      const nodeName = params.name;
      drawer2.value = true;
      drawerContent.content = option.sentence[nodeName];
    }

    return {
      // drawer start
      drawer2,
      close,
      drawerContent,
      //  drawer end
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
