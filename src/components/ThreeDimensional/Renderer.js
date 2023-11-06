import * as THREE from 'three'
import EventEmitter from './Utils/EventEmitter'
import ThreeDimensional from '.'

export default class Renderer extends EventEmitter {
  constructor() {
    super()

    this.threeDimensional = new ThreeDimensional()
    this.canvas = this.threeDimensional.canvas
    this.sizes = this.threeDimensional.sizes
    this.scene = this.threeDimensional.scene
    this.camera = this.threeDimensional.camera

    this.setInstance()
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      logarithmicDepthBuffer: true,
      alpha: true,
      physicallyCorrectLights: true
    })
    // this.instance.useLegacyLights = true
    this.instance.outputColorSpace = THREE.SRGBColorSpace
    // this.instance.toneMapping = THREE.CineonToneMapping
    this.instance.toneMapping = THREE.ACESFilmicToneMapping
    // this.instance.toneMappingExposure = 1.75
    this.instance.toneMappingExposure = 1.75
    // this.instance.shadowMap.enabled = true
    // this.instance.shadowMap.type = THREE.PCFSoftShadowMap
    // this.instance.sortObjects = false
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))

    this.instance.setAnimationLoop(() => {
      this.trigger('timeLoop')
    })
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
  }

  update() {
    this.instance.render(this.scene, this.camera.activeCamera)
  }

  destroy() {
    this.instance.dispose()
  }
}
