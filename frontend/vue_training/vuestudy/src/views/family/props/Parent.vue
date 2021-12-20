<template>
  <div>
    <h1>Props Test</h1>
    <h2>I am Parent</h2>
    <p>I will make my children do something</p>
    <div style="border: 1px solid red">
      <alice
        job="homework"
        :user="myAlice"
        test="variable test"
        :object="objectTest"
      />
    </div>
    <div style="border: 1px solid blue">
      <bob job="clean my room" :jin="jin" variable="VARIABLE TEST" />
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
  data() {
    return {
      myAlice: {
        name: "Alice",
        who: "My daughter",
      },
      objectTest: {
        test1: "object test- property 1",
        test2: "object test- property 2",
      },
      jin: {
        name: "jin",
        location: "incheon",
        age: 28,
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
