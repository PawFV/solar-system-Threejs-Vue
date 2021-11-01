<template>
  <div>
    <canvas id="canvas" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'

import Root from '@/mixins/root'
import canvas from '@/mixins/canvas'

@Component
export default class Home extends Mixins(Root, canvas) {}
</script>

<style lang="scss" scoped>
canvas {
  width: 500;
  height: 500;
}
</style>
