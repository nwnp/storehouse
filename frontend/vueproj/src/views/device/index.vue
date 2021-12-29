<template>
  <div>
    <h1>장비 관리</h1>
    <div style="margin-bottom: 5px">
      <b-row>
        <b-col style="text-align: left">
          <b-input-group style="width: 250px">
            <b-form-input
              placeholder="검색"
              size="sm"
              @keyup.enter="searchDeviceList"
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" size="sm" @click="searchDeviceList"
                >검색</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col style="text-align: right">
          <b-button variant="success" size="sm" @click="onClickAddNew"
            >신규등록</b-button
          >
        </b-col>
      </b-row>
    </div>
    <b-table striped hover :items="deviceList" :fields="fields">
      <template #cell(Device)="data">
        {{ data.item.Device.name }}
      </template>
      <template #cell(updatedBtn)="data">
        <b-button variant="success" size="sm" @click="onClickEdit(data.item.id)"
          >수정</b-button
        >
      </template>
      <template #cell(deletedBtn)="data">
        <b-button
          variant="danger"
          size="sm"
          @click="onClickDelete(data.item.id)"
          >삭제</b-button
        >
      </template>
    </b-table>

    <!-- 입력 폼 -->
    <inform />
  </div>
</template>

<script>
import Inform from "./inform.vue";

export default {
  components: {
    inform: Inform,
  },
  data() {
    return {
      bool: false,
      searchParams: null,
      fields: [
        { key: "id", label: "id" },
        { key: "name", label: "이름" },
        { key: "deviceModelName", label: "장비모델명" },
        { key: "manufacturer", label: "모델명" },
        { key: "location", label: "설치위치" },
        { key: "edgeSerialNumber", label: "시리얼 넘버" },
        { key: "networkInterface", label: "통신인터페이스" },
        { key: "networkConfig", label: "통신설정정보" },
        { key: "description", label: "상세정보" },
        { key: "createdAt", label: "등록일" },
        { key: "updatedAt", label: "수정일" },
        { key: "deletedAt", label: "삭제일" },
        { key: "updatedBtn", label: "수정" },
        { key: "deletedBtn", label: "삭제" },
      ],
    };
  },
  computed: {
    deviceList() {
      return this.$store.getters.DeviceList;
    },
    insertedResult() {
      return this.$store.getters.DeviceInsertedResult;
    },
    updatedResult() {
      return this.$store.getters.DeviceUpdatedResult;
    },
    deletedResult() {
      return this.$store.getters.DeviceDeletedResult;
    },
  },
  watch: {
    insertedResult(value) {
      if (value !== null) {
        if (value > 0) {
          this.$bvToast.toast("등록 되었습니다.", {
            title: "SUCCESS",
            variant: "success",
            solid: true,
          });
          this.searchDeviceList();
        } else {
          this.$bvToast.toast("등록이 실패하였습니다.", {
            title: "ERROR",
            variant: "danger",
            solid: true,
          });
        }
      }
    },
    updatedResult(value) {
      if (value !== null) {
        if (value > 0) {
          this.$bvToast.toast("수정 되었습니다.", {
            title: "SUCCESS",
            variant: "success",
            solid: true,
          });
          this.searchDeviceList();
        } else {
          this.$bvToast.toast("수정이 실패하였습니다.", {
            title: "ERROR",
            variant: "danger",
            solid: true,
          });
        }
      }
    },
    deletedResult(value) {
      if (value !== null) {
        if (value > 0) {
          this.$bvToast.toast("삭제 되었습니다.", {
            title: "SUCCESS",
            variant: "success",
            solid: true,
          });
          this.searchDeviceList();
        } else {
          this.$bvToast.toast("삭제가 실패하였습니다.", {
            title: "ERROR",
            variant: "danger",
            solid: true,
          });
        }
      }
    },
  },
  created() {
    this.searchDeviceList();
  },
  methods: {
    searchDeviceList() {
      this.$store.dispatch("actionDeviceList");
      const deviceList = this.$store.getters.DeviceList;
      console.log(deviceList);
    },
    onClickAddNew() {
      // console.log("onClickAddNew");
      this.$store.dispatch("actionDeviceInputMode", "insert");
      this.$store.dispatch("actionDeviceInit");
      this.$bvModal.show("modal-device-inform");
    },
    onClickEdit(id) {
      this.$store.dispatch("actionDeviceInputMode", "update");
      this.$store.dispatch("actionDeviceInfo", id);
      this.$bvModal.show("modal-device-inform");
    },
    onClickDelete(id) {
      this.$bvModal.msgBoxConfirm("삭제 하시겠습니까?").then((value) => {
        if (value) {
          this.$store.dispatch("actionDeviceDelete", id);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
