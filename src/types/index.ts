import { MapLike } from 'typescript'
import { Texture } from 'three'

interface Planet {
  size: number
  texture: Texture
  position: number
  moon?: Moon
}

export interface Moon {
  size: number
  texture: Texture
  position: number
}

export type Planets = MapLike<Planet>
