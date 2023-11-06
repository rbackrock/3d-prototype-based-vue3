<script setup>
import load from '@/components/ThreeDimensional/resources/index'
import ThreeDimensional from '@/components/ThreeDimensional/index'
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

const canvasRef = ref(null)
let threeDimensionalInstance = null

onMounted(async () => {
  const resources = await load()
  threeDimensionalInstance = new ThreeDimensional(canvasRef.value, resources)
})

onBeforeUnmount(() => {
  if (threeDimensionalInstance) {
    threeDimensionalInstance.destroy()
    threeDimensionalInstance = null
  }
})
</script>

<template>
  <div class="canvas__3d__container">
    <div class="canvas__3d__container__wrapper">
      <canvas ref="canvasRef" class="webgl__content" />
    </div>
  </div>
</template>

<style lang="less" scoped>
  .canvas__3d__container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .canvas__3d__container__wrapper {
      position: relative;
      width: 100%;
      height: 100%;

      .webgl__content {
        display: block;
      }
    }
  }
</style>
