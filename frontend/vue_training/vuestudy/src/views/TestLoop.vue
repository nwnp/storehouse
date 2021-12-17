<template>
  <div>
    <h1>v-for Test</h1>
    <h2>원본 출력</h2>
    <div>
      <div>{{ fruits }}</div>
      <div>{{ users }}</div>
    </div>
    <h2>다듬어서 출력</h2>
    <div>
      <h3>과일 리스트</h3>
      <ul>
        <li v-for="(fruit, index) in fruits" v-bind:key="index">
          {{ fruit }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fruits: ["apple", "orange", "banana", "mango"],
      users: [
        { name: "홍길동", age: 20, gender: "male" },
        { name: "김길동", age: 23, gender: "male" },
        { name: "고길순", age: 25, gender: "female" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
