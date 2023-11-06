import * as THREE from 'three'
import EventEmitter from '../Utils/EventEmitter'
import ThreeDimensional from '..'
import Environment from './Environment'

export default class World extends EventEmitter {
  constructor() {
    super()

    this.threeDimensional = new ThreeDimensional()
    this.canvas = this.threeDimensional.canvas
    this.camera = this.threeDimensional.camera
    this.scene = this.threeDimensional.scene
    this.sizes = this.threeDimensional.sizes
    this.outlinePass = this.threeDimensional.outlinePass
    this.resources = this.threeDimensional.resources
    this.renderer = this.threeDimensional.renderer
    this.environment = new Environment()

    this.createScene()

    // 接收 destroy 事件
    this.on('destroy', () => {
      this.destroy()
    })
  }

  createScene() {
    const geometry = new THREE.BoxGeometry(3, 3, 3)
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000
    })
    const cubeMesh = new THREE.Mesh(geometry, material)

    this.scene.add(cubeMesh)
  }

  /**
   * 重置默认场景状态
   */
  restore() {
  }

  destroy() {
    // 删除并且置空控制物体的 gsap 动画对象让垃圾回收，或者其他事件对象
    // ES 类规范没有接口特性，需要清除 gsap 动画需要自己记得实现 destroy 方法
    for (const actorKey in this.actors) {
      this.controls[actorKey].destroy && this.controls[actorKey].destroy()
    }
  }
}
