<template>
  <div>
    <b-modal
      id="modal-device-inform"
      :title="`사용자 ${inputMode === 'insert' ? '등록' : '수정'}`"
      @ok="onSubmit"
    >
      <b-form-group label-cols="3" label="장비이름" label-for="name">
        <b-form-input id="name"></b-form-input>
      </b-form-group>
      <b-form-group
        label-cols="3"
        label="장비모델명"
        label-for="deviceModelName"
      >
        <b-form-input id="deviceModelName"></b-form-input>
      </b-form-group>
      <b-form-group label-cols="3" label="모델명" label-for="manufacturer">
        <b-form-input id="manufacturer"></b-form-input>
      </b-form-group>
      <b-form-group label-cols="3" label="설치위치" label-for="location">
        <b-form-input id="location"></b-form-input>
      </b-form-group>
      <b-form-group
        label-cols="3"
        label="엣지 시리얼 넘버"
        label-for="edgeSerialNumber"
      >
        <b-form-input id="edgeSerialNumber"></b-form-input>
      </b-form-group>
      <b-form-group
        label-cols="3"
        label="통신인터페이스"
        label-for="networkInterface"
      >
        <b-form-input id="networkInterface"></b-form-input>
      </b-form-group>
      <b-form-group
        label-cols="3"
        label="통신설정정보"
        label-for="networkConfig"
      >
        <b-form-input id="networkConfig"></b-form-input>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      device: {
        id: null,
        name: null,
        deviceModelName: null,
        manufacturer: null,
        edgeSerialNumber: null,
        networkInterface: null,
        networkConfig: null,
        description: null,
      },
    };
  },
  computed: {
    infoData() {
      return this.$store.getters.Device;
    },
    inputMode() {
      return this.$store.getters.DeviceInputMode;
    },
    deviceList() {
      return this.$store.getters.DeviceList;
    },
  },
  watch: {
    infoData(value) {
      this.device = { ...value };
    },
  },
  created() {
    this.device = { ...this.infoData };
    this.$store.dispatch("actionDeviceList");
  },
  methods: {
    onSubmit() {
      if (this.inputMode === "insert") {
        this.$store.dispatch("actionDeviceInsert", this.device);
      }

      if (this.inputMode === "update") {
        this.$store.dispatch("actionDeviceUpdate", this.device);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
