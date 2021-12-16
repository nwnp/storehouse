<template>
  <div>
    <h1>Event Bus Test</h1>
    <h2>I am Parent</h2>
    <p>Let's listen to the children's conversation.</p>
    <div style="border: 1px solid red">
      <alice />
    </div>
    <div style="border: 1px solid blue">
      <bob />
    </div>
  </div>
</template>

<script>
import Alice from './Child1.vue'
import Bob from './Child2.vue'

export default {
  components: {
    Alice,
    Bob
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
