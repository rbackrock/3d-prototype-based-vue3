import {
  ref
} from 'vue'
import {
  defineStore
} from 'pinia'
import load from '@/views/home/components/Visualization/ThreeDimensional/resources/index'
import ThreeDimensional from '@/views/home/components/Visualization/ThreeDimensional/index'

export default defineStore('visualization', () => {
  let threeDimensionalInstance = null
  const loading = ref(false)

  async function makeThreeDimensionalInstance() {
    loading.value = true
    const resources = await load()
    threeDimensionalInstance = new ThreeDimensional(document.querySelector('canvas.webgl'), resources)
    loading.value = false
  }

  function getThreeDimensionalInstance() {
    return threeDimensionalInstance
  }

  function threeDimensionalInstanceDestroy() {
    if (threeDimensionalInstance) {
      threeDimensionalInstance.destroy()
    }
  }

  return {
    loading,
    makeThreeDimensionalInstance,
    getThreeDimensionalInstance,
    threeDimensionalInstanceDestroy
  }
})
