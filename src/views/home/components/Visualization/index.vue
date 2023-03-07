<script setup>
import {
  onMounted,
  onUnmounted
} from 'vue'

import HelloWorld from '@/components/HelloWorld.vue'
import use3dVisualizationStore from '@/store/visualization'

const store = use3dVisualizationStore()

onMounted(async () => {
  await store.makeThreeDimensionalInstance()
})

onUnmounted(() => {
  store.threeDimensionalInstancedestroy()
})
</script>

<template>
  <div class="canvas-3d-container">
    <canvas class="webgl"></canvas>
    <HelloWorld />
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;

  .canvas-3d-container {
    position: relative;
    width: 100%;
    height: 100%;

    .webgl {
      display: block;
    }
  }
}
</style>
