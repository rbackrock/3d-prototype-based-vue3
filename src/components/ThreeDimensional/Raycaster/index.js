import * as THREE from 'three'
import ThreeDimensional from '../index'
import {
  covertMousePositionToNDC
} from '../Utils/index'

export default class Raycaster {
  constructor(canvas) {
    this.canvas = canvas
    this.raycaster = new THREE.Raycaster()
    this.clientX = 0
    this.clientY = 0

    this.setClientXy = this.setClientXy.bind(this)
    this.canvas.addEventListener('pointermove', this.setClientXy)
  }

  setClientXy(evt) {
    this.clientX = evt.offsetX
    this.clientY = evt.offsetY
  }

  update() {
    this.threeDimensional = new ThreeDimensional()
    this.canvas = this.threeDimensional.canvas
    const sizes = this.threeDimensional.sizes
    const camera = this.threeDimensional.camera.activeCamera
    const mousePositionNDC = covertMousePositionToNDC(
      sizes.width,
      sizes.height,
      this.clientX,
      this.clientY
    )

    this.raycaster.setFromCamera(mousePositionNDC, camera)
  }

  getIntersectsObject(object3d) {
    return this.raycaster.intersectObjects(object3d)
  }

  destroy() {
    this.canvas.removeEventListener('pointermove', this.setClientXy)
    this.raycaster = null
  }
}
