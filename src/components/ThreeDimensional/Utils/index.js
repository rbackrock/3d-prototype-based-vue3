import * as THREE from 'three'

/**
 * 归一化鼠标在可视化区域中的坐标
 * @param {Number} containerWidth 画布容器宽度
 * @param {Number} containerHeight 画布容器高度
 * @param {Number} x 鼠标在画布中的 x 坐标
 * @param {Number} y 鼠标在画布中的 Y 坐标
 */
export function covertMousePositionToNDC(containerWidth, containerHeight, x, y) {
  const ndcPosition = new THREE.Vector2()
  ndcPosition.x = (x / containerWidth) * 2 - 1
  ndcPosition.y = -(y / containerHeight) * 2 + 1

  return ndcPosition
}