<template>
  <div>
    <h3>Hi, I am Alice</h3>
    <p>I want my parent to give me money</p>
    <b-button variant="primary" @click="updateTodoAlice">Money</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    updateTodoAlice: function () {
      this.$emit("updateTodoAlice", "give to Alice money");
    },
  },
};
</script>

<style lang="scss" scoped></style>
