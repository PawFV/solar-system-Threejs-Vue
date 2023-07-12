import { Mesh, WebGLRenderer } from 'three'
import { sizes } from '../views/helpers'
import { Vue, Component } from 'vue-property-decorator'
import * as THREE from 'three'
import { GUI } from 'dat.gui'
import { textures } from '../three/textures'
import { planets } from '../three/planets'
import _, { each, random } from 'lodash'
import { Moon, PlanetsMesh } from '../types/index'

@Component
export default class Root extends Vue {
  canvas!: HTMLCanvasElement
  renderer!: WebGLRenderer
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
  solarSystem!: THREE.Object3D
  sun!: Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>
  planetOrbits: PlanetsMesh<typeof planets> = {}
  gui = new GUI()

  createSolarSystem() {
    this.solarSystem = new THREE.Object3D()
    this.scene.add(this.solarSystem)
  }

  createSun() {
    const geometry = new THREE.SphereGeometry(0.6)
    const material = new THREE.MeshLambertMaterial({map: textures.sun})
    this.sun = new THREE.Mesh(geometry, material)
    this.solarSystem.add(this.sun)
  }

  createPlanets() {
    each(planets, (planet, key) => {
      const planetOrbit = new THREE.Object3D()
      planetOrbit.position.x = planet.position.x
      planetOrbit.position.z = planet.position.z

      this.solarSystem.add(planetOrbit)

      const geometry = new THREE.SphereBufferGeometry(planet.size)
      const material = new THREE.MeshLambertMaterial({ map: planet.texture })
      const planetMesh = new THREE.Mesh(geometry, material)
      planetOrbit.add(planetMesh)

      if (planet.moon) {
        const moonOrbit = new THREE.Object3D()
        moonOrbit.position.x = planet.moon.position.x
        planetOrbit.add(moonOrbit)

        const moonMesh = this.createMoon(planet.moon)
        moonOrbit.add(moonMesh)
      }

      Vue.set(this.planetOrbits, key, planetOrbit)
    })
  }

  createMoon(moon: Moon) {
    const geometry = new THREE.SphereGeometry(moon.size)
    const material = new THREE.MeshStandardMaterial({ map: moon.texture })
    return new THREE.Mesh(geometry, material)
  }

  animate() {
    requestAnimationFrame(this.animate)
    const time = Date.now() * 0.0001 // get the current time

    each(this.planetOrbits, (orbit, key) => {
      const planetInfo = planets[key]
      const orbitRadius = planetInfo.distance
      const speed = planetInfo.speed

      // calculate the new position of the planet
      const x = Math.cos(time * speed) * orbitRadius
      const z = Math.sin(time * speed) * orbitRadius

      // update the position of the planet
      orbit.position.set(x, 0, z)

      // continue rotating the planet on its own axis
      orbit.children[0].rotation.y += 0.01
    })

    this.renderer.render(this.scene, this.camera)
  }
}
