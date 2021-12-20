import api from "../apiUtil";

export default {
  state: {
    // state에 사용할 모델이나 값을 선언
    User: {
      id: 0,
      name: null,
      username: null,
      email: null,
    },
    UserList: [],
  },
  getters: {
    // getters를 통해 state 값을 호출
    User: (state) => state.User,
    UserList: (state) => state.UserList,
  },
  mutations: {
    // mutations는 동기적이어야 함
    setUser(state, data) {
      state.User = data;
    },
    setUserList(state, data) {
      state.user = data;
    },
  },
  actions: {
    // action은 비동기적 사용이 가능함
    actionUserInfo(context, payload) {
      console.log("User.id", payload);

      // const testUserInfo = {
      //   id: payload,
      //   name: "test",
      //   username: "testUser",
      //   email: "test@email.com",
      // };

      // context.commit("setUser", testUserInfo);

      api
        .get(`https://jsonplaceholder.typicode.com/users/${payload}`)
        .then((res) => {
          console.log("res", res);

          const userInfo = res && res.data;
          context.commit("setUser", userInfo);
        });
    },

    actionUserList(context, payload) {
      console.log("searchParams", payload);

      // const testUserList = ["user1", "user2", "user3"];
      // context.commit("setUserList", testUserList);

      api.get("https://jsonplaceholder.typicode.com/users/").then((res) => {
        console.log("res", res);

        console.log(payload);

        const userList = res && res.data;
        context.commit("setUserList", userList);
      });
    },
  },
};
