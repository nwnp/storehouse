const stateInt = {
  Department: {
    id: null,
    name: null,
    code: null,
    description: null,
    createdAt: null,
    updatedAt: null,
  },
};

export default {
  state: {
    DepartmentList: [],
    Department: { ...stateInt.Department },
    // 전역으로 초기화한 stateInt 객체의 property를 각각 풀어서 값만 할당
    // 값을 한 번 할당 받으면 그 후에 새롭게 stateInt의 프로퍼티 값이 바뀌어도 이 값은 첫 번째 값만을 가지고 있음
    InsertedResult: null, // 입력 처리 후 결과
  },
  getters: {
    DepartmentList: (state) => state.DepartmentList,
    Department: (state) => state.Department,
    DepartmentInsertedResult: (state) => state.InsertedResult,
  },
  mutations: {
    setDepartmentList(state, data) {
      state.DepartmentList = data;
    },
    setDepartment(state, data) {
      state.Department = data;
    },
    setInsertedResult(state, data) {
      state.InsertedResult = data;
    },
  },
  actions: {
    // 부서 리스트 조회
    actDepartmentList(context) {
      console.log("actDepartmentList", departmentList);

      const departmentList = [
        {
          id: 1,
          name: "개발팀",
          code: "dev",
          createdAt: "2021-12-01T00:00:00.000Z",
        },
        {
          id: 2,
          name: "영업팀",
          code: "sales",
          createdAt: "2021-12-01T00:00:00.000Z",
        },
      ];
      context.commit("setDepartmentList", departmentList);

      /* RestAPI 호출 */
      /*
      api.get('/serverApi/departments').then(response => {
        const departmentList = response && response.data
        context.commit('setDepartmentList', departmentList)
      })
      */
    },
    actDepartmentInsert(context, payload) {
      console.log(payload);

      // 상태값 초기화
      context.commit("setInsertedResult", null);

      setTimeout(() => {
        const insertedResult = 1;
        context.commit("setInsertedResult", insertedResult);
      }, 300);
    },
  },
};
