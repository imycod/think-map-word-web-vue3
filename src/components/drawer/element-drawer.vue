<template>
  <el-drawer class="drawer-container" v-model="drawer" :direction="'rtl'" :before-close="beforeClose">
    <template #title>
      <h4>{{data.title}}</h4>
    </template>
    <template #default>
      <div class="default">
        <ul>
          <li class="content" v-for="(content,index) in data.content" :key="index">
            <div class="video" style="width: 400px;height: 200px">
              <video controls preload="auto" style="object-fit: fill;width: 100%;height: 100%;" :src="content.av"></video>
            </div>
            <div>
              {{content.name}}
              <button @click="play(content.soundUrl)">play</button>
            </div>
          </li>
        </ul>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">cancel</el-button>
        <el-button type="primary" @click="confirmClick">confirm</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
/* eslint-disable */

const props = defineProps({
  drawer: {
    type: Boolean,
    default: false,
    required: true,
  },
  data:{
    type:Object,
    default:true,
    required:true
  }
})
const emit = defineEmits(['close'])

function cancelClick() {
  emit('close', {type: 'cancelClick', value: false})
}

function confirmClick() {
  emit('close', {type: 'confirmClick', value: false})
}

function beforeClose() {
  emit('close', {type: 'beforeClose', value: false})
}

function play(url) {
  const sound = new Howl({
    src: [url]
  });
  sound.play()
}
</script>

<style lang="less" scoped>
.drawer-container{

}
</style>
