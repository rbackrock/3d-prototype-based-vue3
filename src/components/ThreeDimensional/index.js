/**
 * @auther yhuan
 *
 * # canvas 元素外面需要包裹一个父级以适应不同固定宽高的显示需求
 *
 * # 场景元素分为固定3d物体和操作3d物体，操作3d物体列表在 World 对象中的 actors 属性中
 *
 * # 控制元素需要 gsap 动画时，需要在对应该类实现 destroy 方法用作释放资源使用，该方法需要 .kill() 之外，还需要将引用设置为 null，其他需要清理的事件对象也在该方法编写
 *
 */

import * as THREE from 'three'

import Debug from './Utils/Debug'
import Sizes from './Utils/Sizes'
import Camera from './Camera/index.js'
import Renderer from './Renderer'
import World from './World/World'
import Postprocessing from './Postprocessing/Postprocessing'
import Css2dRender from './Css2dRender'
import Css3dRender from './Css3dRender'
import Raycaster from './Raycaster'

let instance = null

export class ThreeDimensional {
  constructor(_canvas, sources) {
    if (instance) {
      return instance
    }

    // 设置 3d 场景实例
    instance = this

    // 设置 canvas
    this.canvas = _canvas

    // debug
    this.debug = new Debug()

    // 设置 3d 所需的实例
    this.resources = sources
    this.sizes = new Sizes(this.canvas)
    this.scene = new THREE.Scene()
    this.camera = new Camera(this.sizes, this.scene, this.canvas)
    this.renderer = new Renderer()

    // css2drender
    this.css2dRender = new Css2dRender()

    // css3drender
    this.css3dRender = new Css3dRender()

    // 后期处理
    this.postprocessingRender = new Postprocessing()
    this.outlinePass = this.postprocessingRender.outlinePass

    // world
    this.world = new World()

    // 射线
    this.raycaster = new Raycaster(this.canvas)

    this.sizes.on('resize', () => {
      this.resize()
    })

    this.renderer.on('timeLoop', () => {
      this.update()
    })
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
    this.css2dRender.resize()
    this.css3dRender.resize()
    this.postprocessingRender.resize()
  }

  update() {
    this.camera.update()
    this.postprocessingRender.update()
    this.css2dRender.update()
    this.css3dRender.update()

    // 射线
    this.raycaster.update()
  }

  destroy() {
    this.wolrd.trigger('destroy')
    this.wolrd.off('destroy')
    this.wolrd = null

    if (this.debug.active) {
      this.debug.ui.destroy()
    }

    this.sizes.off('resize')
    this.renderer.off('timeLoop')

    this.scene.traverse(child => {
      if (child.geometry) {
        child.geometry.dispose()
      }

      for (const key in child.material) {
        const value = child.material[key]

        if (value && typeof value.dispose === 'function') {
          value.dispose()
        }
      }
    })

    this.postprocessingRender.destroy()
    this.camera.destroy()
    this.renderer.destroy()
    this.css2dRender.destroy()
    this.css3dRender.destroy()
    this.raycaster.destroy()

    instance = null
  }
}

export default ThreeDimensional
