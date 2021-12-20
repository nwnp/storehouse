<template>
  <div>
    <h1>Emit Test</h1>
    <h2>I am Parent</h2>
    <p>I have to do something for my children</p>
    <div style="border: 1px solid red">
      <alice @updateTodoAlice="updateTodoAlice($event)" />
      <p>{{ todoAlice }}</p>
    </div>
    <div style="border: 1px solid blue">
      <bob @updateTodoBob="updateTodoBob($event)" />
      <p>{{ todoBob }}</p>
    </div>
  </div>
</template>

<script>
import Alice from "../emit/Child1.vue";
import Bob from "../emit/Child2.vue";

export default {
  components: {
    Alice,
    Bob,
  },
  data() {
    return {
      todoAlice: "do nothing",
      todoBob: "do nothing",
    };
  },
  methods: {
    updateTodoAlice: function (newTodo) {
      this.todoAlice = newTodo;
    },
    updateTodoBob: function (newTodo) {
      this.todoBob = newTodo;
    },
  },
};
</script>

<style lang="scss" scoped></style>
