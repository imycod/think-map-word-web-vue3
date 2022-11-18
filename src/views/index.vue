<template>
  <div class="common-layout bd">
    <div id="main" style="width: 100%; height: 100vh"></div>
    <drawer :drawer2="drawer2" @close="close"></drawer>
  </div>
</template>

<script>
import {onMounted /*getCurrentInstance*/, onUnmounted} from "vue";
import Graph from "@/utils/Graph.js";
import option from "@/assets/data/les-miserables.json";
import useDrawer from "@/combination/element-ui/drawer.js";

export default {
  name: "App",
  components: {},
  setup() {
    // drawer start
    const {drawer2, close} = useDrawer()
    // drawer end

    let graph = null;
    onMounted(() => {
      // const { proxy } = getCurrentInstance();
      graph = new Graph(document.getElementById("main"));
      graph.chart.on("click", handleClick);
      graph.initOption(option);
      window.addEventListener("resize", resize, false);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", resize);
    });

    function resize() {
      graph.chart.resize();
    }

    function handleClick(params) {
      console.log("params---", params);
      console.log(params.data.name);
      console.log('drawer2.value ---', drawer2.value)
      drawer2.value = true
      console.log('drawer2.value ---', drawer2.value)
    }

    return {
      // drawer start
      drawer2,
      close,
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
