import { Mesh, WebGLRenderer } from 'three'
import { sizes } from '../views/helpers'
import { Vue, Component } from 'vue-property-decorator'
import * as THREE from 'three'
import { GUI } from 'dat.gui'
import { textures } from '../three/textures'
import { planets } from '../three/planets'
import { each } from 'lodash'
import { Moon } from '../types/index'
@Component
export default class Root extends Vue {
  canvas!: HTMLCanvasElement
  renderer!: WebGLRenderer
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
  sun!: Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>
  gui = new GUI()

  createSun() {
    const geometry = new THREE.SphereGeometry(0.8)
    const material = new THREE.MeshLambertMaterial({})
    material.map = textures.sun
    this.sun = new THREE.Mesh(geometry, material)

    // this.sun.position.z = -10
    this.scene.add(this.sun)
  }

  createPlanets() {
    each(planets, ({ position, size, texture, moon }) => {
      const geometry = new THREE.SphereBufferGeometry(size)
      const material = new THREE.MeshLambertMaterial({ map: texture })
      const planet = new THREE.Mesh(geometry, material)
      planet.position.x = position
      this.sun.add(planet)

      if (moon) {
        const planetMoon = this.createMoon(moon)
        planet.add(planetMoon)
      }
    })
  }

  createMoon(moon: Moon) {
    const geometry = new THREE.SphereGeometry(moon.size)
    const material = new THREE.MeshStandardMaterial({ map: moon.texture })

    const moonMesh = new THREE.Mesh(geometry, material)
    moonMesh.position.x = moon.position
    return moonMesh
  }

  addSpaceBackground() {
    const spaceGeometry = new THREE.SphereGeometry(10, 20, 20)
    const spaceMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: textures.space,
      side: THREE.BackSide
    })
    const space = new THREE.Mesh(spaceGeometry, spaceMaterial)
    this.scene.add(space)
  }

  animate() {
    requestAnimationFrame(this.animate)
    // this.sun.rotation.y += 0.005
    // this.earth.rotation.y += 0.005
    this.sun.rotation.y += 0.003
    // this.earth.rotation.y += 0.01
    // this.moon.rotation.y += 0.002
    this.renderer.render(this.scene, this.camera)
  }
}
