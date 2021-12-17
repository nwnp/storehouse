<template>
  <div>
    <h1>Event Test</h1>
    <h3>1. 클릭/더블클릭 이벤트</h3>
    <div>
      <div>
        <p>나의 나이는: {{ age }}</p>
        <button @click="addAge(1)">1살 추가</button>
        <button @click="deleteAge(1)">1살 삭제</button>
        <button @dblclick="addAge(10)">10살씩 추가(더블클릭)</button>
        <button @click.once="addAge(1)">1살 추가(한 번만)</button>
      </div>
      <div style="margin-top: 20px">
        <input v-model="message" />
        <button @click="printMessage()">콘솔 프린트</button>
      </div>
    </div>
    <div>
      <h3>2. 마우스 추적 이벤트</h3>
      <div @mousemove="mouseTrack">X: {{ mouseX }} Y: {{ mouseY }}</div>
    </div>
    <div>
      <h3>3. 키보드 이벤트</h3>
      <div>
        <div>
          이름:
          <input
            v-model="inputName"
            @keyup.enter="setMyName(inputName)"
          />EnterEvent
        </div>
        <div>
          아이디:<input
            v-model="inputId"
            @keyup.ctrl.enter="setMyId(inputId)"
          />Ctrl+EnterEvent
        </div>
        <p>나의 이름: {{ myName }}</p>
        <p>나의 아이디: {{ myId }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      age: 20,
      message: null,
      mouseX: 0,
      mouseY: 0,
      inputName: null,
      inputId: null,
      myName: null,
      myId: null,
    };
  },
  methods: {
    addAge: function (year) {
      this.age += year;
    },
    deleteAge: function (year) {
      this.age -= year;
    },
    printMessage() {
      console.log(this.message);
    },
    mouseTrack(e) {
      console.log(e);
      this.mouseX = e.offsetX;
      this.mouseY = e.offsetY;
    },
    setMyName(inputName) {
      this.myName = inputName;
    },
    setMyId(inputId) {
      this.myId = inputId;
    },
  },
};
</script>

<style lang="scss" scoped></style>
