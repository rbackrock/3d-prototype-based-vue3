import * as THREE from 'three'

export default function() {
  const geometry = new THREE.BoxGeometry(30, 30, 30)
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000
  })

  return new THREE.Mesh(geometry, material)
}
