<template>
  <div>
    <h1>사용자 관리</h1>
    <div style="margin-bottom: 5px">
      <b-row>
        <b-col style="text-align: left">
          <b-input-group style="width: 250px">
            <b-form-input
              v-model="searchParams"
              placeholder="검색"
              size="sm"
              @keyup.ctrl.enter="searchUserList"
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" size="sm" @click="searchUserList"
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
    <b-table striped hover :items="userList" :fields="fields">
      <template #cell(Department)="data">
        {{ data.item.Department.name }}
      </template>
      <template #cell(updateBtn)="data">
        <b-button variant="success" size="sm" @click="onClickEdit(data.item.id)"
          >수정</b-button
        >
      </template>
      <template #cell(deleteBtn)="data">
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
      searchParams: null,
      fields: [
        { key: "id", label: "id" },
        { key: "name", label: "이름" },
        { key: "Department", label: "부서" },
        { key: "userid", label: "아이디" },
        { key: "role", label: "권한" },
        { key: "email", label: "이메일" },
        { key: "createdAt", label: "생성일" },
        { key: "updateBtn", label: "수정" },
        { key: "deleteBtn", label: "삭제" },
      ],
    };
  },
  computed: {
    userList() {
      return this.$store.getters.UserList;
    },
    insertedResult() {
      return this.$store.getters.UserInsertedResult;
    },
    updatedResult() {
      return this.$store.getters.UserUpdatedResult;
    },
  },
  watch: {
    insertedResult(value) {
      if (value !== null) {
        if (value > 0) {
          // 등록이 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast("등록 되었습니다.", {
            title: "SUCCESS",
            variant: "success",
            solid: true,
          });

          // 2. 리스트 재 검색
          this.searchUserList();
        } else {
          // 등록이 실패한 경우
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
          // 등록이 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast("수정 되었습니다.", {
            title: "SUCCESS",
            variant: "success",
            solid: true,
          });

          // 2. 리스트 재 검색
          this.searchUserList();
        } else {
          // 등록이 실패한 경우
          this.$bvToast.toast("수정이 실패하였습니다.", {
            title: "ERROR",
            variant: "danger",
            solid: true,
          });
        }
      }
    },
  },
  created() {
    this.searchUserList();
    // this.$store.dispatch("actDepartmentList");
  },
  methods: {
    searchUserList() {
      this.$store.dispatch("actUserList", this.searchParams);
    },
    onClickAddNew() {
      // 1. 입력모드 설정
      this.$store.dispatch("actUserInputMode", "insert");

      // 초기화 설정
      this.$store.dispatch("actUserInit");

      // this.$store.dispatch("actUserInsert");

      // 입력 모달 띄우기
      this.$bvModal.show("modal-user-inform");
    },
    onClickEdit(id) {
      // 1. 입력모드 설정
      this.$store.dispatch("actUserInputMode", "update");

      // 2. 사용자 정보 조회
      this.$store.dispatch("actUserInfo", id);

      // this.$store.dispatch("actUserInit", id);

      // 입력 모달 띄우기
      this.$bvModal.show("modal-user-inform");
    },
    onClickDelete(id) {
      console.log("onClickDelete", id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
