<template>
  <div>
    <b-modal id="modal-user-inform" title="BootstrapVue" @ok="onSubmit">
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label="부서PK"
        label-for="departmentId"
      >
        <b-form-input
          id="departmentId"
          v-model="user.departmentId"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label="이름"
        label-for="name"
      >
        <b-form-input id="name" v-model="user.name"></b-form-input>
      </b-form-group>
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label="아이디"
        label-for="id"
      >
        <b-form-input id="id" v-model="user.id"></b-form-input>
      </b-form-group>
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label="비밀번호"
        label-for="password"
      >
        <b-form-input id="password" v-model="user.password"></b-form-input>
      </b-form-group>
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label="사용자 권한"
        label-for="role"
      >
        <b-form-radio-group
          v-model="user.role"
          :options="userRole.options"
        ></b-form-radio-group>
      </b-form-group>
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label="이메일"
        label-for="email"
      >
        <b-form-input id="email" v-model="user.email"></b-form-input>
      </b-form-group>
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label="전화번호"
        label-for="phone"
      >
        <b-form-input id="phone" v-model="user.phone"></b-form-input>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        id: null,
        departmentId: null,
        name: null,
        userid: null,
        password: null,
        role: null,
        email: null,
        phone: null,
        updatedPwDate: null,
        createdAt: null,
      },
      userRole: {
        default: "member",
        options: [
          { value: "leader", text: "팀장" },
          { value: "member", text: "팀원" },
        ],
      },
    };
  },

  created() {
    // 초기값 세팅 함수 호출
    this.setDefaultValues();
  },
  methods: {
    onSubmit() {
      console.log("onsubmit", this.user);
    },
    setDefaultValues() {
      // 초기값 세팅
      this.user.role = this.userRole.default;
    },
  },
};
</script>

<style lang="scss" scoped></style>
