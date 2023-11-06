import * as THREE from 'three'
import gsap from 'gsap'
import createCameraList from './list'
import {
  cameraType,
  cameraViewType
} from './consts'

export default class Camera {
  constructor(sizes, scene, canvas) {
    this.sizes = sizes
    this.scene = scene
    this.canvas = canvas

    // 准备当前活动摄像机
    this.activeCamera = null
    // 准备当前活动摄像机的控制器，如果有的话
    this.activeControls = null
    this.activeCameraInfo = null
    // 加载摄像机列表
    this.cameraList = createCameraList(this.sizes, this.canvas)

    this.setActiveCamera(cameraType.CAMERA_DEFAULT)
  }

  resize(cameraType, viewType) {
    if (cameraType) {
      const cameraInfo = this.cameraList[cameraType]
      const cameraDefaultPosition = cameraInfo.viewList[viewType].position
      const cameraDefaultQuaternion = cameraInfo.viewList[viewType].quaternion
      const camera = cameraInfo.camera
      camera.aspect = this.sizes.width / this.sizes.height
      camera.position.set(cameraDefaultPosition.x, cameraDefaultPosition.y, cameraDefaultPosition.z)
      camera.quaternion.set(cameraDefaultQuaternion.x, cameraDefaultQuaternion.y, cameraDefaultQuaternion.z, cameraDefaultQuaternion.w)
      camera.updateProjectionMatrix()
    } else {
      for (const cameraKey in this.cameraList) {
        const cameraInfo = this.cameraList[cameraKey]
        const cameraDefaultPosition = cameraInfo.viewList[cameraViewType.CAMERA_DEFAULT.STANDARD].position
        const cameraDefaultQuaternion = cameraInfo.viewList[cameraViewType.CAMERA_DEFAULT.STANDARD].quaternion
        const camera = cameraInfo.camera
        camera.aspect = this.sizes.width / this.sizes.height
        camera.position.set(cameraDefaultPosition.x, cameraDefaultPosition.y, cameraDefaultPosition.z)
        camera.quaternion.set(cameraDefaultQuaternion.x, cameraDefaultQuaternion.y, cameraDefaultQuaternion.z, cameraDefaultQuaternion.w)
        camera.updateProjectionMatrix()
      }
    }
  }

  update() {
    if (this.activeControls) {
      this.activeCamera.updateProjectionMatrix()
      this.activeControls.update()
    }
  }

  /**
   * 设置活动摄像机
   * @param {String} cameraName 摄像机名称
   */
  setActiveCamera(cameraType) {
    this.activeCameraInfo = this.cameraList[cameraType]
    this.activeCamera = this.cameraList[cameraType].camera
    this.activeControls = this.cameraList[cameraType].controls
  }

  /**
   * 添加额外摄像机，额外指比如 Blender 添加的摄像机
   * @param {String} cameraType 摄像机类型名称
   * @param {Object} camera 摄像机 Object3d 对象
   * @param {Object} controls 对用相机控制器对象
   */
  addExtraCamera(cameraType, camera, controls = null, positionList) {
    // TODO
  }

  /**
   * 对当前相机进行位置转化，并且支持重新设置控制器 target
   * @param {Object} targetPosition 切换视角的位置对象
   * @param {Object} targetQuaternion 切换视角的局部旋转四元数
   * @param {Object} controlTarget 轨道控制的位置对象
   */
  changeCurrentCameraViewPosition(targetPosition, targetQuaternion, controlTarget) {
    return new Promise((resolve, reject) => {
      const start = {
        positionX: this.activeCamera.position.x,
        positionY: this.activeCamera.position.y,
        positionZ: this.activeCamera.position.z,
        quaternionX: this.activeCamera.quaternion.x,
        quaternionY: this.activeCamera.quaternion.y,
        quaternionZ: this.activeCamera.quaternion.z,
        quaternionW: this.activeCamera.quaternion.w
      }
      const end = {
        positionX: targetPosition.x,
        positionY: targetPosition.y,
        positionZ: targetPosition.z
      }

      if (targetQuaternion) {
        end.quaternionX = targetQuaternion.x
        end.quaternionY = targetQuaternion.y
        end.quaternionZ = targetQuaternion.z
        end.quaternionW = targetQuaternion.w
      }

      // control
      if (controlTarget) {
        this.activeControls.target = new THREE.Vector3(controlTarget.x, controlTarget.y, controlTarget.z)
      }

      let animation = gsap.to(start, {
        ...end,
        duration: 0.9,
        ease: 'none',
        onUpdate: () => {
          this.activeCamera.position.set(start.positionX, start.positionY, start.positionZ)

          if (targetQuaternion) {
            this.activeCamera.quaternion.set(start.quaternionX, start.quaternionY, start.quaternionZ, start.quaternionW)
          }
        },
        onComplete: () => {
          animation.kill()
          animation = null
          this.activeCamera.updateProjectionMatrix()

          resolve()
        }
      })
    })
  }

  changeCurrentCameraViewByType(viewType, isAnimation = true) {
    const currentActiveCameraInfo = this.activeCameraInfo
    const {
      position,
      quaternion,
      controlTarget
    } = currentActiveCameraInfo.viewList[viewType]

    // 改变控制器旋转轴焦点，必须放这里，如果放整个方法末尾，会抖动
    this.activeControls.target = new THREE.Vector3(
      controlTarget.x,
      controlTarget.y,
      controlTarget.z,
    )

    if (isAnimation) {
      const start = {
        positionX: this.activeCamera.position.x,
        positionY: this.activeCamera.position.y,
        positionZ: this.activeCamera.position.z,
        quaternionX: this.activeCamera.quaternion.x,
        quaternionY: this.activeCamera.quaternion.y,
        quaternionZ: this.activeCamera.quaternion.z,
        quaternionW: this.activeCamera.quaternion.w
      }
      const end = {
        positionX: position.x,
        positionY: position.y,
        positionZ: position.z,
        quaternionX: quaternion.x,
        quaternionY: quaternion.y,
        quaternionZ: quaternion.z,
        quaternionW: quaternion.w
      }

      let animation = gsap.to(start, {
        ...end,
        duration: 0.6,
        ease: 'none',
        // repeat: 1,
        onUpdate: () => {
          this.activeCamera.position.set(start.positionX, start.positionY, start.positionZ)
          this.activeCamera.quaternion.set(start.quaternionX, start.quaternionY, start.quaternionZ, start.quaternionW)
        },
        onComplete: () => {
          animation.kill()
          animation = null

          this.activeCamera.updateProjectionMatrix()
        }
      })
    } else {
      this.activeCamera.position.set(
        position.x,
        position.y,
        position.z
      )
      this.activeCamera.quaternion.set(
        quaternion.x,
        quaternion.y,
        quaternion.z,
        quaternion.w,
      )
    }
  }

  changeCameraView(cameraType, viewType, isAnimation = true) {
    const currentCameraInfo = this.cameraList[cameraType]
    const {
      controls,
      camera,
      viewList
    } = currentCameraInfo
    const {
      position,
      quaternion,
      controlTarget
    } = viewList[viewType]

    // 改变控制器旋转轴焦点，必须放这里，如果放整个方法末尾，会抖动
    controls.target = new THREE.Vector3(
      controlTarget.x,
      controlTarget.y,
      controlTarget.z,
    )

    if (isAnimation) {
      const start = {
        positionX: camera.position.x,
        positionY: camera.position.y,
        positionZ: camera.position.z,
        quaternionX: camera.quaternion.x,
        quaternionY: camera.quaternion.y,
        quaternionZ: camera.quaternion.z,
        quaternionW: camera.quaternion.w
      }
      const end = {
        positionX: position.x,
        positionY: position.y,
        positionZ: position.z,
        quaternionX: quaternion.x,
        quaternionY: quaternion.y,
        quaternionZ: quaternion.z,
        quaternionW: quaternion.w
      }

      let animation = gsap.to(start, {
        ...end,
        duration: 0.6,
        ease: 'none',
        // repeat: 1,
        onUpdate: () => {
          camera.position.set(start.positionX, start.positionY, start.positionZ)
          camera.quaternion.set(start.quaternionX, start.quaternionY, start.quaternionZ, start.quaternionW)
        },
        onComplete: () => {
          animation.kill()
          animation = null

          camera.updateProjectionMatrix()
        }
      })
    } else {
      camera.position.set(
        position.x,
        position.y,
        position.z
      )
      camera.quaternion.set(
        quaternion.x,
        quaternion.y,
        quaternion.z,
        quaternion.w,
      )
    }
  }

  destroy() {
    for (const cameraKey in this.cameraList) {
      const currentCamera = this.cameraList[cameraKey]
      if (currentCamera.controls) {
        currentCamera.controls.dispose()
      }
    }
  }
}
