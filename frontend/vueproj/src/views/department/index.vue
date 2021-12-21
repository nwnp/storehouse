<template>
  <div>
    <h1>부서 관리</h1>
    <div style="margin-bottom: 5px">
      <b-row>
        <b-col style="text-align: left"
          ><b-button variant="primary" size="sm" @click="searchDepartmentList"
            >검색</b-button
          ></b-col
        >
        <b-col style="text-align: right"
          ><b-button variant="success" size="sm" @click="onClickAddNew"
            >신규등록</b-button
          ></b-col
        >
      </b-row>
    </div>
    <div>
      <b-table
        small
        hover
        striped
        :items="departmentList"
        :fields="fields"
      ></b-table>
    </div>
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
      fields: [
        { key: "id", label: "id" },
        { key: "name", label: "부서명" },
        { key: "code", label: "부서코드" },
        { key: "createdAt", label: "생성일" },
      ],
    };
  },
  computed: {
    departmentList() {
      return this.$store.getters.DepartmentList;
    },
    insertedResult() {
      return this.$store.getters.DepartmentInsertedResult;
    },
  },
  watch: {
    insertedResult(value) {
      if (value !== null) {
        if (value > 0) {
          this.$bvToast.toast("등록 되었습니다", {
            title: "SUCCESS",
            variant: "success",
            solid: true,
          });
          this.searchDepartmentList();
        } else {
          this.$bvToast.toast("등록이 실패했습니다.", {
            title: "ERROR",
            variant: "danger",
            solid: true,
          });
        }
      }
    },
  },
  created() {
    this.searchDepartmentList();
  },
  methods: {
    searchDepartmentList() {
      this.$store.dispatch("actDepartmentList");
    },
    onClickAddNew() {
      this.$bvModal.show("modal-department-inform");
    },
  },
};
</script>

<style lang="scss" scoped></style>
