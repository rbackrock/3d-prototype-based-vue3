import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass'
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass'

import ThreeDimensional from '..'

export default class Postprocessing {
  constructor() {
    this.threeDimensional = new ThreeDimensional()
    this.sizes = this.threeDimensional.sizes
    this.renderer = this.threeDimensional.renderer
    this.scene = this.threeDimensional.scene
    this.camera = this.threeDimensional.camera

    this.create()
  }

  create() {
    this.composer = new EffectComposer(this.renderer.instance)
    this.renderPass = new RenderPass(this.scene, this.camera.activeCamera)
    this.composer.addPass(this.renderPass)

    // 添加 OutLine 特效
    this.outlinePass = new OutlinePass(
      new THREE.Vector2(this.sizes.width, this.sizes.height),
      this.scene,
      this.camera.activeCamera
    )
    // 线条效果
    this.outlinePass.edgeStrength = 10
    this.outlinePass.edgeGlow = 1
    this.outlinePass.edgeThickness = 4
    this.outlinePass.pulsePeriod = 0
    // 设置颜色
    this.outlinePass.visibleEdgeColor.set('#087c96')
    this.outlinePass.hiddenEdgeColor.set('#087c96')
    this.composer.addPass(this.outlinePass)

    //
    // this.fxaaPass = new ShaderPass(FXAAShader)
    // this.composer.addPass(this.fxaaPass)

    const pass = new SMAAPass(
      this.sizes.width * this.renderer.instance.getPixelRatio(),
      this.sizes.height * this.renderer.instance.getPixelRatio()
    )
    this.composer.addPass(pass)
  }

  resize() {
    this.composer.setSize(this.sizes.width, this.sizes.height)
    this.composer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
  }

  update() {
    this.renderPass.camera = this.camera.activeCamera
    this.outlinePass.renderCamera = this.camera.activeCamera
    this.composer.render()
  }

  restore() {
    this.outlinePass.selectedObjects = []
    this.outlinePass.renderScene = this.scene
  }

  destroy() {
    this.outlinePass.dispose()
    this.renderPass.dispose()
    this.composer.dispose()
  }
}
