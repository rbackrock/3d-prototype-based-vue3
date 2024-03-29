import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'
import ThreeDimensional from '.'

export default class Css2dRender {
  constructor() {
    this.threeDimensional = new ThreeDimensional()
    this.canvas = this.threeDimensional.canvas
    this.sizes = this.threeDimensional.sizes
    this.scene = this.threeDimensional.scene
    this.camera = this.threeDimensional.camera

    this.create()
  }

  create() {
    this.instance = new CSS2DRenderer()
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.domElement.style.position = 'absolute'
    this.instance.domElement.style.top = '0px'
    this.instance.domElement.style.left = '0px'
    this.instance.domElement.style.pointerEvents = 'none'

    this.canvas.parentElement.appendChild(this.instance.domElement)
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height)
  }

  update() {
    this.instance.render(this.scene, this.camera.activeCamera)
  }

  destroy() {
    this.instance.domElement.remove()
  }
}
