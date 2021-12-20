<template>
  <div>
    <h3>Greeting to you, I am Bob</h3>
    <p>I have to {{ job }}</p>
    <h2>Object props test: {{ jin.name }}</h2>
    <p>age : {{ jin.age }}</p>
    <p>location : {{ jin.location }}</p>
    <p>variable test: {{ variable }}</p>
  </div>
</template>

<script>
export default {
  props: {
    job: {
      type: String,
      required: false,
      default: "Nothing",
    },
    jin: {
      type: Object,
      required: false,
      default: null,
    },
    variable: {
      type: String,
      required: false,
      default: "nothing",
    },
  },
};
</script>

<style lang="scss" scoped></style>
