<template>
  <div>
    <h1>binding test</h1>
    <div>영문: <input v-model="engText" /></div>
    <div>한글: <input v-model="korText" @input="typingKor" /></div>
    <div>
      <h3>바인딩 영문: {{ engText }}</h3>
      <h3>바인딩 한글: {{ korText }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      engText: '',
      korText: ''
    }
  },
  methods: {
    typingKor(e) {
      this.korText = e.target.value
    }
  }
  /*
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  beforeDestroy() {
    console.log('beforeDestroy')
  },
  destroyed() {
    console.log('destroyed')
  }
  */
}
</script>

<style lang="scss" scoped></style>
