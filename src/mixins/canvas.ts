import { Component } from 'vue-property-decorator'
import * as THREE from 'three'
import Home from './root'
import { textures } from '../three/textures'
import { each } from 'lodash'

@Component
export default class Canvas extends Home {
  isDragging = false
  previousMousePosition = {
    x: 0,
    y: 0
  }

  setRenderer() {
    this.canvas = document.querySelector<HTMLCanvasElement>('#canvas')!
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  setCamera() {
    this.camera.position.set(0, 10, 0)
    this.camera.up.set(0, 0, 7)
    this.camera.lookAt(0, 0, 0)
  }

  addGui() {
    this.gui.addFolder('Zoom').add(this.camera.position, 'z').min(2)
    each(this.planetOrbits, (planet, key) => {
      const planetGui = this.gui.addFolder(key)
      planetGui.add(planet.position, 'x')
      planetGui.add(planet.position, 'y')
      planetGui.add(planet.position, 'z')
    })
  }

  addLight() {
    const pointLight1 = new THREE.PointLight(0xffffff, 1.3)
    pointLight1.position.set(2.3, 14.2, -0.1)
    this.scene.add(pointLight1)

    const light1 = this.gui.addFolder('Light')
    light1.add(pointLight1.position, 'y')
    light1.add(pointLight1.position, 'x')
    light1.add(pointLight1.position, 'z')
    light1.add(pointLight1, 'intensity').min(0).max(10)

    const pointLightHelper = new THREE.PointLightHelper(pointLight1, 0.3, 0x00000)
    this.scene.add(pointLightHelper)
  }

  addSpaceBackground() {
    const spaceGeometry = new THREE.SphereGeometry(20, 40, 40)
    const spaceMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: textures.space,
      side: THREE.BackSide
    })
    const space = new THREE.Mesh(spaceGeometry, spaceMaterial)
    this.scene.add(space)
  }

  mounted() {
    this.setRenderer()
    this.createSolarSystem()
    this.createSun()
    this.createPlanets()
    this.addLight()
    this.addSpaceBackground()
    this.addGui()
    this.setCamera()
    this.animate()
    this.addEventListeners()
  }

  addEventListeners() {
    window.addEventListener('wheel', this.onScroll, false)
    window.addEventListener('mousedown', this.startDragging, false)
    window.addEventListener('mousemove', this.dragAround, false)
    window.addEventListener('mouseup', this.stopDragging, false)
  }

  startDragging(event: MouseEvent) {
    this.isDragging = true
    this.previousMousePosition = {
      x: event.clientX,
      y: event.clientY
    }
    document.body.style.cursor = "grabbing"
  }

  stopDragging() {
    this.isDragging = false
    document.body.style.cursor = "grab"
  }

  dragAround(event: MouseEvent) {
    if (!this.isDragging) return

    const deltaMove = {
      x: event.clientX - this.previousMousePosition.x,
      y: event.clientY - this.previousMousePosition.y
    }

    const dragSpeed = 0.005

    this.camera.position.x -= deltaMove.x * dragSpeed
    this.camera.position.y += deltaMove.y * dragSpeed

    this.previousMousePosition = {
      x: event.clientX,
      y: event.clientY
    }
  }

  onScroll(event: WheelEvent) {
    const fovMax = 200
    const fovMin = 1
    if (event.deltaY < 0) {
      // Zoom in
      this.camera.fov = Math.max(this.camera.fov - 1, fovMin)
    } else if (event.deltaY > 0) {
      // Zoom out
      this.camera.fov = Math.min(this.camera.fov + 1, fovMax)
    }
    this.camera.updateProjectionMatrix() // Necessary to update the camera after changing FOV
  }

  beforeDestroy() {
    window.removeEventListener('wheel', this.onScroll, false)
    window.removeEventListener('mousedown', this.startDragging, false)
    window.removeEventListener('mousemove', this.dragAround, false)
    window.removeEventListener('mouseup', this.stopDragging, false)
  }
}