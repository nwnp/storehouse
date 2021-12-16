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
        <li v-for="(fruit, index) in fruits" :key="`fruit-${index}`">{{ fruit }}</li>
      </ul>
      <h3>사용자 리스트</h3>
      1) 그대로 출력
      <div v-for="(user, index) in users" :key="`user-${index}`">
        {{ user }}
      </div>
      2) 항목별 출력
      <div v-for="(user, index) in users" :key="index">
        <span>{{ user.name }}: {{ user.age }}, {{ user.gender }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fruits: ['apple', 'orange', 'banana', 'mango'],
      users: [
        { name: '홍길동', age: 20, gender: 'male' },
        { name: '김길동', age: 23, gender: 'male' },
        { name: '고길순', age: 25, gender: 'female' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
