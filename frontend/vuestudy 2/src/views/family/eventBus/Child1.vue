<template>
  <div>
    <h3>Hi, I am Alice</h3>
    <p>
      I said: Hey Bob. where's my stuff??
      <b-button size="sm" variant="primary" @click="whatIsaid">send to Bob</b-button>
    </p>
    <p>Bob said:</p>
  </div>
</template>

<script>
import { EventBus } from './eventBus'

export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    whatIsaid: function () {
      this.count += 1
      EventBus.$emit('aliceSaid', `Give me my stuff ! x ${this.count}`)
    }
  }
}
</script>

<style lang="scss" scoped></style>
