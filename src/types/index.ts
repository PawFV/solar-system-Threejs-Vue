import { MapLike } from 'typescript'
import { Texture } from 'three'
import * as THREE from 'three'

interface Planet {
  size: number
  texture: Texture
  position: OrbPosition
  moon?: Moon
  speed: number
  distance: number
}

export interface Moon {
  size: number
  texture: Texture
  position: OrbPosition
  speed: number
  distance: number
}

export interface OrbPosition {
  x: number
  y: number
  z: number
}

export type Planets = MapLike<Planet>

export type PlanetsMesh<Type> = {
  [Property in keyof Type]: THREE.Object3D
}
