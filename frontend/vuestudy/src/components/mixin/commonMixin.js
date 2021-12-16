export default {
  data() {
    return {
      mixin: {
        test: 'mixinTest'
      }
    }
  },
  methods: {
    mixinTest() {
      console.log('This is mixin method')
    }
  }
}
