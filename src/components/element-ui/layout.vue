<template>
  <el-container>
    <el-header>
      <el-row class="row-bg" :gutter="20" justify="center">
        <el-col class="left" :span="12">
          <div>111</div>
        </el-col>
        <el-col class="middle" :span="6">
          <el-input
            v-model="input1"
            @keydown.enter="toSearch"
            class="w-50 m-2"
            size="large"
            placeholder="Please Input"
            :prefix-icon="Search"
          />
        </el-col>
        <el-col class="right" :span="2" :offset="4">
          <el-avatar
            src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
          />
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script setup>
/* eslint-disable */
// import { defineComponent } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useLayoutSearch as useSearch } from "@/combination/element-ui/search.js";
// export default defineComponent({
//   name: "layout",
//   setup() {
    const { input1, toSearch } = useSearch();
    // return {
    //   Search,
    //   input1,
    //   toSearch,
    // };
  // },
// });
</script>

<style lang="less" scoped>
</style>
