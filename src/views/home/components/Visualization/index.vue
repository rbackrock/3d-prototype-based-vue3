<script setup>
import use3d from './composables/use3d'

const {
  threeDimensional
} = use3d()
</script>

<template>
  <div class="canvas-3d-container">
    <canvas class="webgl"></canvas>
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
