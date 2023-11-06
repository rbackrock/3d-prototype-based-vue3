/**

  相机列表结构数据如下
  {
    // 相机名称
    name: 'defaultCamera',
    // 相机实例
    camera,
    // 控制器实例
    controls,
    // 视角列表
    viewList,
    // 层数
    layersIndex: 1
  }

 */

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import {
  cameraType,
  cameraViewType
} from './consts.js'

function createDefaultCamera(sizes, canvas) {
  const camera = new THREE.PerspectiveCamera(
    35,
    sizes.width / sizes.height,
    0.01,
    10000
  )
  const controls = new OrbitControls(camera, canvas)
  const layersIndex = 1
  const viewList = {
    // 标准视角
    [cameraViewType.CAMERA_DEFAULT.STANDARD]: {
      position: {
        x: 9,
        y: 9,
        z: 9
      },
      quaternion: {
        x: 0,
        y: 0,
        z: 0,
        w: 0
      },
      controlTarget: {
        x: 0,
        y: 0,
        z: 0
      }
    }
  }
  controls.target = new THREE.Vector3(
    viewList[cameraViewType.CAMERA_DEFAULT.STANDARD].controlTarget.x,
    viewList[cameraViewType.CAMERA_DEFAULT.STANDARD].controlTarget.y,
    viewList[cameraViewType.CAMERA_DEFAULT.STANDARD].controlTarget.z,
  )
  camera.position.set(
    viewList[cameraViewType.CAMERA_DEFAULT.STANDARD].position.x,
    viewList[cameraViewType.CAMERA_DEFAULT.STANDARD].position.y,
    viewList[cameraViewType.CAMERA_DEFAULT.STANDARD].position.z,
  )
  camera.quaternion.set(
    viewList[cameraViewType.CAMERA_DEFAULT.STANDARD].quaternion.x,
    viewList[cameraViewType.CAMERA_DEFAULT.STANDARD].quaternion.y,
    viewList[cameraViewType.CAMERA_DEFAULT.STANDARD].quaternion.z,
    viewList[cameraViewType.CAMERA_DEFAULT.STANDARD].quaternion.w
  )
  camera.layers.mask = layersIndex
  camera.updateProjectionMatrix()

  return {
    name: 'defaultCamera',
    camera,
    controls,
    viewList,
    layersIndex
  }
}

export default function createCameraList(sizes, canvas) {
  return {
    [cameraType.CAMERA_DEFAULT]: createDefaultCamera(sizes, canvas)
  }
}
