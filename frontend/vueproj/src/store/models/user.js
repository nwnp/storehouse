import api from "../apiUtil";

// 초기값 선언
const stateInit = {
  User: {
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
    updatedAt: null,
  },
};

export default {
  state: {
    UserList: [],
    User: { ...stateInit.User },
    InsertedResult: null,
    InputMode: null, // 입력모드(등록: insert, 수정: update)
    UpdatedResult: null,
    DeleteResult: null,
  },
  getters: {
    UserList: (state) => state.UserList,
    User: (state) => state.User,
    UserInputMode: (state) => state.InputMode,
    UserInsertedResult: (state) => state.InsertedResult,
    UserUpdatedResult: (state) => state.UpdatedResult,
    UserDeletedResult: (state) => state.DeleteResult,
  },
  mutations: {
    setUserList(state, data) {
      state.UserList = data;
    },
    setUser(state, data) {
      state.User = data;
    },
    setInputMode(state, data) {
      state.InputMode = data;
    },
    setInsertedResult(state, data) {
      state.InsertedResult = data;
    },
    setUpdatedResult(state, data) {
      state.UserUpdatedResult = data;
    },
    setDeletedResult(state, data) {
      state.DeleteResult = data;
    },
  },
  actions: {
    // 사용자 리스트 조회
    actUserList(context, payload) {
      console.log(payload);

      api.get("/serverApi/users").then((response) => {
        const userList = response && response.data;
        context.commit("setUserList", userList);
      });
    },
    // 등록
    actUserInsert(context, payload) {
      console.log("actUserInsert", payload);

      // axios api
      api.post("/serverApi/users").then((response) => {
        const insertedResult = response && response.data;
        context.commit("setInsertedResult", insertedResult);
      });

      // 결과갑 세팅
    },
    // 초기화
    actUserInit(context, payload) {
      console.log(payload);
      context.commit("setUser", { ...stateInit.User });
    },
    // 입력모드 설정
    actUserInputMode(context, payload) {
      context.commit("setInputMode", payload);
    },
    // 사용자 정보 조회
    actUserInfo(context, payload) {
      console.log("actUserInfo", payload);

      api.get(`/serverApi/users/${payload}`).then((response) => {
        const updatedResult = response && response.updatedCount;
        context.commit("setUpdatedResult", updatedResult);
      });
    },
    actUserUpdate(context, payload) {
      context.commit("setUpdatedResult", payload);

      // console.log(payload);
      setTimeout(() => {
        const updatedResult = 1;
        context.commit("setUpdatedResult", updatedResult);
      }, 300);
    },
    actUserDelete(context, payload) {
      context.commit("setDeletedResult", payload);

      api.delete(`/serverApi/users/${payload}`).then((response) => {
        const deletedResult = response && response.deletedCount;
        context.commit("setDeletedResult", deletedResult);
      });
    },
  },
};
