import { Mesh, WebGLRenderer } from 'three'
import { sizes } from '../views/helpers'
import { Vue, Component } from 'vue-property-decorator'
import * as THREE from 'three'
import { GUI } from 'dat.gui'

@Component
export default class Root extends Vue {
  canvas!: HTMLCanvasElement
  renderer!: WebGLRenderer
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
  earth!: Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>
  moon!: Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>
  sun!: Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>
  moonTexture = new THREE.TextureLoader().load(require('../assets/moon.jpg'))
  spaceTexture = new THREE.TextureLoader().load(require('../assets/space.jpg'))
  earthTexture = new THREE.TextureLoader().load(require('../assets/earth.jpg'))
  sunTexture = new THREE.TextureLoader().load(require('../assets/sun.jpg'))
  gui = new GUI()

  createSun() {
    const geometry = new THREE.SphereGeometry(0.8)
    const material = new THREE.MeshLambertMaterial({})
    material.map = this.sunTexture
    this.sun = new THREE.Mesh(geometry, material)

    // this.sun.position.z = -10
    this.scene.add(this.sun)
  }

  createEarth() {
    const geometry = new THREE.SphereGeometry(0.2)
    const material = new THREE.MeshLambertMaterial({})
    material.map = this.earthTexture
    this.earth = new THREE.Mesh(geometry, material)
    this.earth.position.x = -2
    this.sun.add(this.earth)
  }

  createMoon() {
    const geometry = new THREE.SphereGeometry(0.05)
    const material = new THREE.MeshStandardMaterial({})
    material.map = this.moonTexture
    this.moon = new THREE.Mesh(geometry, material)
    this.moon.position.x = 0.5
    this.earth.add(this.moon)
  }

  addSpaceBackground() {
    const worldGeometry = new THREE.SphereGeometry(10, 20, 20)
    const worldMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: this.spaceTexture,
      side: THREE.BackSide
    })
    const world = new THREE.Mesh(worldGeometry, worldMaterial)
    this.scene.add(world)
  }

  animate() {
    requestAnimationFrame(this.animate)
    this.sun.rotation.y += 0.005
    this.earth.rotation.y += 0.005
    this.moon.rotation.y += 0.002
    this.renderer.render(this.scene, this.camera)
  }
}
