import {
  onMounted,
  onBeforeUnmount
} from 'vue'

import load from '../ThreeDimensional/resources/index'
import ThreeDimensional from '../ThreeDimensional'

export default function use3d() {
  let threeDimensional = null

  onMounted(async () => {
    const resources = await load()
    threeDimensional = new ThreeDimensional(document.querySelector('canvas.webgl'), resources)
  })
  
  onBeforeUnmount(() => {
    if (threeDimensional) {
      threeDimensional.destroy()
    }
  })

  return {
    threeDimensional
  }
}