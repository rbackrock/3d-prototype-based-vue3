import { defineStore } from 'pinia'
import load from '@/views/home/components/Visualization/ThreeDimensional/resources/index'
import ThreeDimensional from '@/views/home/components/Visualization/ThreeDimensional/index'

export default defineStore('visualization', () => {
  let threeDimensionalInstance = null

  async function makeThreeDimensionalInstance() {
    const resources = await load()
    threeDimensionalInstance = new ThreeDimensional(document.querySelector('canvas.webgl'), resources)
  }

  function getThreeDimensionalInstance() {
    return threeDimensionalInstance
  }

  function threeDimensionalInstancedestroy() {
    if (threeDimensionalInstance) {
      threeDimensionalInstance.destroy()
    }
  }

  return {
    threeDimensionalInstance,
    makeThreeDimensionalInstance,
    getThreeDimensionalInstance,
    threeDimensionalInstancedestroy
  }
})
