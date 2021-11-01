import { textures } from './textures'
import { Planets } from '../types/index'

export const planets: Planets = {
  mercury: {
    size: 0.2,
    texture: textures.mercury,
    position: 1
  },
  venus: {
    size: 0.2,
    texture: textures.venus,
    position: 2
  },
  earth: {
    size: 0.2,
    texture: textures.earth,
    position: 3,
    moon: {
      size: 0.05,
      texture: textures.moon,
      position: 0.5
    }
  },
  mars: {
    size: 0.2,
    texture: textures.mars,
    position: 4
  },
  jupiter: {
    size: 0.2,
    texture: textures.jupiter,
    position: 5
  },
  saturn: {
    size: 0.2,
    texture: textures.saturn,
    position: 6
  },
  uranus: {
    size: 0.2,
    texture: textures.uranus,
    position: 7
  },
  neptune: {
    size: 0.2,
    texture: textures.neptune,
    position: 8
  }
}
