import { textures } from './textures'
import { Planets } from '../types/index'

export const planets: Planets = {
  mercury: {
    size: 0.05,
    texture: textures.mercury,
    position: {
      y: 1,
      x: 1,
      z: -1
    },
    speed: 2,
    distance: 1
  },
  venus: {
    size: 0.12,
    texture: textures.venus,
    position: {
      y: 2,
      x: 2,
      z: 1
    },
    speed: 1.6,
    distance: 2
  },
  earth: {
    size: 0.13,
    texture: textures.earth,
    position: {
      y: 3,
      x: 3,
      z: 3
    },
    speed: 1.3,
    distance: 3,
    moon: {
      size: 0.03,
      texture: textures.moon,
      position: {
        y: 1,
        x: 0.5,
        z: 0
      },
      speed: 2.3,
      distance: 0.5
    }
  },
  mars: {
    size: 0.07,
    texture: textures.mars,
    position: {
      x: 5,
      y: 0.5,
      z: 5
    },
    speed: 0.7,
    distance: 5
  },
  jupiter: {
    size: 0.7,
    texture: textures.jupiter,
    position: {
      x: 8,
      y: 0.5,
      z: 8
    },
    speed: 0.3,
    distance: 8
  },
  saturn: {
    size: 0.6,
    texture: textures.saturn,
    position: { x: 12, y: 0.5, z: 12 },
    speed: 0.23,
    distance: 12
  },
  uranus: {
    size: 0.25,
    texture: textures.uranus,
    position: {
      x: 16,
      y: 0.5,
      z: 16
    },
    speed: 0.18,
    distance: 16
  },
  neptune: {
    size: 0.24,
    texture: textures.neptune,
    position: {
      x: 20,
      y: 0.5,
      z: 20
    },
    speed: 0.14,
    distance: 18
  }
}
