<template>
  <div>
    <h1>Computed Test</h1>
    <button @click="a++">Add to A</button>
    <button @click="b++">Add to B</button>
    <p>A - {{ a }}</p>
    <p>B - {{ b }}</p>
    <p>Age({{ age }}) + A({{ a }}) = {{ addToA }}</p>
    <p>Age({{ age }}) + B({{ b }}) = {{ addToB }}</p>
    <p>-> {{ kind }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: 0,
      b: 0,
      age: 13,
    };
  },
  computed: {
    addToA: function () {
      console.log("addToA");
      return this.a + this.age;
    },
    addToB: function () {
      console.log("addToB");
      return this.b + this.age;
    },
    kind: function () {
      if (this.addToA >= 20 && this.addToB >= 20) {
        return "Adult";
      } else {
        return "Minor";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
