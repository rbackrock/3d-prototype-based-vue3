<script setup>

import useThreeDimensionalStore from '@/store/visualization'
const store = useThreeDimensionalStore()

function handleClick() {
  console.log(store.getThreeDimensionalInstance())
}

</script>

<template>
  <div class="hello-container">
    <button @click="handleClick">click</button>
  </div>
</template>

<style scoped>
  .hello-container {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
