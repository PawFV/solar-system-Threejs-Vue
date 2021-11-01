import { Component } from 'vue-property-decorator'
import * as THREE from 'three'
import Home from './root'

@Component
export default class Canvas extends Home {
  setRenderer() {
    this.canvas = document.querySelector<HTMLCanvasElement>('#canvas')!
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  addGui() {
    this.gui.add(this.camera.position, 'z').min(5)
  }

  addLight() {
    const pointLight1 = new THREE.PointLight(0xffffff, 1)
    pointLight1.position.set(1.5, 1.2, 2.8)
    this.scene.add(pointLight1)

    const light1 = this.gui.addFolder('Light 1')
    light1.add(pointLight1.position, 'y')
    light1.add(pointLight1.position, 'x')
    light1.add(pointLight1.position, 'z')
    light1.add(pointLight1, 'intensity').min(0).max(10)

    const pointLightHelper = new THREE.PointLightHelper(pointLight1, 0.3, 0x00000)
    this.scene.add(pointLightHelper)
  }

  mounted() {
    this.setRenderer()
    this.createSun()
    this.createEarth()
    this.createMoon()
    this.addLight()
    this.addSpaceBackground()
    this.addGui()
    this.camera.position.z = 3
    this.animate()
  }
}
