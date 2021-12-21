<template>
  <div>
    <div class="separate-body"></div>
    <b-container fluid style="padding-left: 0px">
      <b-row>
        <!-- Side bar -->
        <b-col cols="2" style="padding-right: 0px">
          <app-sidebar />
        </b-col>
        <!-- Body contents -->
        <b-col style="padding-left: 0px; padding-right: 0px">
          <div class="content-body"></div>
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Sidebar from "../components/layout/Sidebar.vue";

export default {
  components: {
    "app-sidebar": Sidebar,
  },
  data() {
    return {
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
};
</script>

<style lang="scss" scoped></style>
