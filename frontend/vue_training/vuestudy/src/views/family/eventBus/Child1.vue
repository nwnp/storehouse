<template>
  <div>
    <h3>Hi, I am Alice</h3>
    <p>I said: Hey Bob, Where's my stuff?</p>
    <p>Bob said: {{ bobMessage }}</p>
    <b-button size="sm" variant="primary" @click="whatIsaid"
      >Send to Bob</b-button
    >
  </div>
</template>

<script>
import { EventBus } from "./eventBus";

export default {
  data() {
    return {
      count: 0,
      bobMessage: "",
    };
  },
  created() {
    EventBus.$on("bobSaid", (message) => {
      this.bobMessage = message;
    });
  },
  methods: {
    whatIsaid: function () {
      this.count += 1;
      EventBus.$emit("aliceSaid", `Give me my stuff! X ${this.count}`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
