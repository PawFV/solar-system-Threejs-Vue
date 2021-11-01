import * as THREE from 'three'

export const textures = {
  moon: new THREE.TextureLoader().load(require('../assets/moon.jpg')),
  space: new THREE.TextureLoader().load(require('../assets/space.jpg')),
  earth: new THREE.TextureLoader().load(require('../assets/earth.jpg')),
  sun: new THREE.TextureLoader().load(require('../assets/sun.jpg')),
  venus: new THREE.TextureLoader().load(require('../assets/venus.jpg')),
  mars: new THREE.TextureLoader().load(require('../assets/mars.jpg')),
  mercury: new THREE.TextureLoader().load(require('../assets/mercury.jpg')),
  jupiter: new THREE.TextureLoader().load(require('../assets/jupiter.jpg')),
  saturn: new THREE.TextureLoader().load(require('../assets/saturn.jpg')),
  uranus: new THREE.TextureLoader().load(require('../assets/uranus.jpg')),
  neptune: new THREE.TextureLoader().load(require('../assets/neptune.jpg')),
}
