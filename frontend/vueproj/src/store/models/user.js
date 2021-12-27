// import api from "../apiUtil";

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
  },
  getters: {
    UserList: (state) => state.UserList,
    User: (state) => state.User,
    UserInputMode: (state) => state.InputMode,
    UserInsertedResult: (state) => state.InsertedResult,
    UserUpdatedResult: (state) => state.UpdatedResult,
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
      state.UpdatedResult = data;
    },
  },
  actions: {
    // 사용자 리스트
    actUserList(context, payload) {
      console.log(payload);
      const UserList = [
        {
          id: 1,
          departmentId: 1,
          name: "홍길동",
          userid: "hong",
          role: "leader",
          email: "hong@email.com",
          phone: "010-1234-5678",
          createdAt: "2021-12-01T00:00:00.000Z",
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
          createdAt: "2021-12-01T00:00:00.000Z",
          Department: {
            id: 2,
            name: "영업팀",
            code: "sales",
            createdAt: "2021-12-01T00:00:00.000Z",
          },
        },
      ];

      context.commit("setUserList", UserList);
    },
    // 등록
    actUserInsert(context, payload) {
      console.log("actUserInsert", payload);

      // 결과값 초기화
      context.commit("setInsertedResult", null);

      // back-end 호출(결과값 수신)를 해야 하는데 여기서는 안 함
      // watch에서 감지를 하기 전에 초기화가 끝날 수 있기 때문에
      // delay를 하기 때문에 watch에서 감지를 할 수 있음
      setTimeout(() => {
        const insertedResult = 1;
        context.commit("setInsertedResult", insertedResult);
      }, 300);

      // axios api
      // api.get("/serverApi/users").then((response) => {
      //   const insertedResult = response && response.data;
      //   context.commit("setInsertedResult", insertedResult);
      // });

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

      /* 테스트 데이터 세팅 */
      setTimeout(() => {
        const UserList = [
          {
            id: 1,
            departmentId: 1,
            name: "홍길동",
            userid: "hong",
            role: "leader",
            email: "hong@email.com",
            phone: "010-1234-5678",
            updatedPwDate: "2021-12-01T00:00:00.000Z",
            createdAt: "2021-12-01T00:00:00.000Z",
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
            updatedPwDate: "2021-12-01T00:00:00.000Z",
            createdAt: "2021-12-01T00:00:00.000Z",
            Department: {
              id: 2,
              name: "영업팀",
              code: "sales",
              createdAt: "2021-12-01T00:00:00.000Z",
            },
          },
        ];

        let User = { ...stateInit.User };
        for (let i = 0; i < UserList.length; i += 1) {
          if (payload === UserList[i].id) {
            User = { ...UserList[i] };
          }
        }
        context.commit("setUser", User);
      }, 300);
    },
    actUserUpdate(context, payload) {
      context.commit("setUpdatedResult", payload);

      setTimeout(() => {
        const updatedResult = 1;
        context.commit("setUpdatedResult", updatedResult);
      }, 300);
    },
  },
};
