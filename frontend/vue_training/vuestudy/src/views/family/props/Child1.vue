<template>
  <div>
    <h3>Hi, I am Alice</h3>
    <p>I have to {{ job }}</p>
    <p>{{ user.name }} {{ user.who }}</p>
    <p>this is props test : {{ test }}</p>
    <p>Object Test: {{ object.test1 }}</p>
    <p>Object Test: {{ object.test2 }}</p>
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
    user: {
      type: Object,
      required: false,
      default: null,
    },
    test: {
      type: String,
      required: false,
      default: "Nothing",
    },
    object: {
      type: Object,
      required: false,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped></style>
