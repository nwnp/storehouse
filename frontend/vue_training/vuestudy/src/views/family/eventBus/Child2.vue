<template>
  <div>
    <h3>Greeting to you, I am Bob</h3>
    <p>Alice said to me: {{ aliceMessage }}</p>
    <p>
      <b-button size="sm" variant="success" @click="whatIsaid"
        >Reply to Alice</b-button
      >
    </p>
  </div>
</template>

<script>
import { EventBus } from "./eventBus";
export default {
  data() {
    return {
      aliceMessage: "",
      count: 0,
    };
  },
  created() {
    EventBus.$on("aliceSaid", (message) => {
      this.aliceMessage = message;
    });
  },
  methods: {
    whatIsaid: function () {
      this.count += 1;
      EventBus.$emit("bobSaid", `I don't know X ${this.count}`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
