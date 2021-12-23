<template>
  <div>
    <h1>사용자 관리</h1>
    <div style="margn-bottom: 5px">
      <b-row>
        <b-col>
          <b-input-group>
            <b-form-input
              v-model="searchParams"
              placeholder="검색"
              @keyup.enter="searchUserList"
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="outline-success" @click="searchUserList()"
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
    <div>
      <!-- data -> items(userList) => item(Department) -> (name) ->  -->
      <b-table striped hover :items="userList" :fields="fields">
        <template #cell(Department)="data">
          {{ data.item.Department.name }}
        </template>
        <template #cell(updateBtn)="data">
          <b-button variant="success" @click="onClickEdit(data.item.id)"
            >수정</b-button
          >
          {{ data.item.update }}
        </template>
        <template #cell(deleteBtn)="data">
          <b-button variant="danger" @click="onClickDelete(data.item.id)"
            >삭제</b-button
          >
          {{ data.item.delete }}
        </template>
      </b-table>
    </div>
    <!-- 입력 폼 -->
    <inform />
  </div>
</template>

<script>
import inform from "./inform.vue";
export default {
  components: {
    inform: inform,
  },
  data() {
    return {
      searchParams: null,
      fields: [
        { key: "id", label: "id" },
        { key: "name", label: "이름" },
        { key: "Department", label: "부서Id" },
        { key: "userid", label: "아이디" },
        { key: "role", label: "권한" },
        { key: "email", label: "이메일" },
        { key: "createdAt", label: "생성일" },
        { key: "updateBtn", label: "수정" },
        { key: "deleteBtn", label: "삭제" },
      ],

      userList: [
        {
          id: 1,
          departmentId: 1,
          name: "홍길동",
          userid: "hong",
          role: "leader",
          email: "hong@email.com",
          phone: "010-1234-5678",
          createdAt: "2021-12-01T00:00:00.000Z".substring(0, 10),
          Department: {
            id: 1,
            name: "개발팀",
            code: "dev",
            createdAt: "2021-12-01T00:00:00.000Z",
          },
        },

        {
          id: 2,
          departmentId: 2,
          name: "김길동",
          userid: "kim",
          role: "member",
          email: "kim@email.com",
          phone: "010-9876-5432",
          createdAt: "2021-12-01T00:00:00.000Z".substring(0, 10),
          Department: {
            id: 2,
            name: "영업팀",
            code: "sales",
            createdAt: "2021-12-01T00:00:00.000Z",
          },
        },
      ],
    };
  },
  methods: {
    searchUserList() {
      console.log("searchUserList");
    },
    onClickAddNew() {
      console.log("onClickAddNew", this.searchParams);
      this.$bvModal.show("modal-user-inform");
    },
    onClickEdit(id) {
      console.log(id);
    },
    onClickDelete(id) {
      console.log(id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
