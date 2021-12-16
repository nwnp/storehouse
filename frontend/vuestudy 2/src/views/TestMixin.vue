<template>
  <div>
    <h1>Mixin Test</h1>
    <p>{{ mixin.test }}</p>
  </div>
</template>

<script>
import commonMx from '@/components/mixin/commonMixin'

export default {
  mixins: [commonMx],
  data() {
    return {}
  },
  created() {
    this.mixinTest()
  }
}
</script>

<style lang="scss" scoped></style>
