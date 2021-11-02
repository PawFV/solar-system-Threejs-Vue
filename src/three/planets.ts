import { textures } from './textures'
import { Planets } from '../types/index'

export const planets: Planets = {
  mercury: {
    size: 0.2,
    texture: textures.mercury,
    position: {
      y: 1,
      x: 1,
      z: -1
    }
  },
  venus: {
    size: 0.2,
    texture: textures.venus,
    position: {
      y: 2,
      x: 2,
      z: 1
    }
  },
  earth: {
    size: 0.2,
    texture: textures.earth,
    position: {
      y: 3,
      x: 3,
      z: 3
    },
    moon: {
      size: 0.05,
      texture: textures.moon,
      position: {
        y: 1,
        x: 0.5,
        z: 0
      }
    }
  },
  mars: {
    size: 0.2,
    texture: textures.mars,
    position: {
      x: 4,
      y: 0.5,
      z: 5
    }
  },
  jupiter: {
    size: 0.2,
    texture: textures.jupiter,
    position: {
      x: 5,
      y: 0.5,
      z: 7
    }
  },
  saturn: {
    size: 0.2,
    texture: textures.saturn,
    position: { x: 6, y: 0.5, z: 8 }
  },
  uranus: {
    size: 0.2,
    texture: textures.uranus,
    position: {
      x: 7,
      y: 0.5,
      z: 9
    }
  },
  neptune: {
    size: 0.2,
    texture: textures.neptune,
    position: {
      x: 8,
      y: 0.5,
      z: 10
    }
  }
}
