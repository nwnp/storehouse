<template>
  <div>
    <b-modal id="modal-department-inform" title="부서정보 입력" @ok="onSubmit">
      <div>
        <b-form-group label="부서이름" label-for="name" label-cols="3">
          <b-form-input id="name" v-model="department.name"></b-form-input>
        </b-form-group>
        <b-form-group
          label="부서코드"
          label-for="code"
          label-cols="3"
          description="중복코드는 허용되지 않습니다."
        >
          <b-form-input id="code" v-model="department.code"></b-form-input>
        </b-form-group>
        <b-form-group label="상세설명" label-for="description" label-cols="3">
          <b-form-textarea
            id="description"
            v-model="department.description"
            rows="5"
          />
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      department: {
        name: null,
        code: null,
        description: null,
      },
    };
  },
  computed: {
    infoData() {
      return this.$store.getters.Department;
    },
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.department = { ...value };
    },
  },
  created() {
    // 모달이 최초 열릴때 감지됨
    this.department = { ...this.infoData };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("actDepartmentInsert", this.department);
    },
  },
};
</script>
