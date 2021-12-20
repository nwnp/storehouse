<template>
  <div>
    <h1>Event Bus Test</h1>
    <h2>I am parent</h2>
    <p>Let's listen to the children's conversion</p>
    <div style="border: 1px solid red">
      <alice />
    </div>
    <div style="border: 1px solid red">
      <bob />
    </div>
  </div>
</template>

<script>
import Alice from "./Child1.vue";
import Bob from "./Child2.vue";

export default {
  components: {
    Alice,
    Bob,
  },
};
</script>

<style lang="scss" scoped></style>
