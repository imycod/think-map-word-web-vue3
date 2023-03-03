<template>
  <div class="graph-main-wrapper">
    <div id="main" style="width: 100%; height: 100vh"></div>
  </div>
</template>

<script>
import useEchartGraph from "@/components/graph/useEchartGraph";

export default {
  name: "graph",
  setup() {
    const {graph} = useEchartGraph('main')
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.graph-main-wrapper {

}
</style>
