<template>
  <div>
    <h1>Socket Test</h1>
    <b-container fluid>
      <b-row>
        <b-col style="text-align: right"></b-col>
        <b-col style="text-align: center">
          <b-form-input v-model="message" placeholder="message" />
          <h5>Chat message</h5>
          <b-form-textarea id="textarea" v-model="messageHistory" rows="7" max-rows="6"></b-form-textarea>
        </b-col>
        <b-col style="text-align: left">
          <b-button variant="primary" @click="sendMessage">Send</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      messageHistory: ''
    }
  },
  created() {
    this.$socket.on('chat', data => {
      this.messageHistory += data + '\n'
    })
  },
  methods: {
    sendMessage() {
      this.$socket.emit('chat', this.message)
      this.message = ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
