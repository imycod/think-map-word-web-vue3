<template>
  <el-drawer v-model="drawer2" :direction="'rtl'" :before-close="beforeClose">
    <template #title>
      <h4>set title by slot</h4>
    </template>
    <template #default>
      <div>
        111
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
import {defineEmits, defineProps} from "vue";

const props = defineProps({
  drawer2: {
    type: Boolean,
    default: false,
    required: true,
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
</script>

<style scoped>

</style>
