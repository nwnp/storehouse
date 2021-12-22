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
    UpdatedResult: null,
    InputMode: null,
  },
  getters: {
    DepartmentList: (state) => state.DepartmentList,
    Department: (state) => state.Department,
    DepartmentInsertedResult: (state) => state.InsertedResult,
    UpdatedResult: (state) => state.UpdatedResult,
    InputMode: (state) => state.InputMode,
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
    setUpdatedResult(state, data) {
      state.UpdatedResult = data;
    },
    setInputMode(state, data) {
      state.InputMode = data;
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

    // 부서정보 초기화
    actDepartmentInit(context) {
      context.commit("setDepartment", { ...stateInt.Department });
    },

    // 입력모드 설정
    actDepartmentInputMode(context) {
      context.commit("setInputMode", { ...stateInt.InputMode });
    },

    // 부서 상세정보 조회
    actDepartmentInfo(context, payload) {
      context.commit("setDepartment", { ...stateInt.Department });

      /* 테스트 데이터 세팅 */
      setTimeout(() => {
        const departmentList = [
          {
            id: 1,
            name: "개발팀",
            code: "dev",
            description: "개발팀 테스트",
            createdAt: "2021-12-01T00:00:00.000Z",
          },
          {
            id: 2,
            name: "영업팀",
            code: "sales",
            description: "영업팀 테스트",
            createdAt: "2021-12-01T00:00:00.000Z",
          },
        ];

        let department = { ...stateInt.department };
        for (let i = 0; i < departmentList.length; i += 1) {
          if (payload === departmentList[i].id) {
            department = { ...departmentList[i] };
          }
        }
        context.commit("setDepartment", department);
      }, 300);

      /* RestAPI 호출 */
      /*
      api.get('/serverApi/departments/${payload}').then(response => {
        const department = response && response.department
        context.commit('setDepartment', department)
      })
      */
    },

    // 부서 수정
    actDepartmentUpdate(context) {
      context.commit("setUpdatedResult", null);

      setTimeout(() => {
        const updatedResult = 1;
        context.commit("setUpdatedResult", updatedResult);
      }, 300);

      /* RestAPI 호출 */
      /*
      // payload에 backend에서 받아온 데이터를 변수로 들어감
      api.put('/serverApi/departments/${payload}').then(response => {
        const updatedResult = response && response.updatedCount
        context.commit('setUpdatedResult', updatedResult)
      })
      */
    },
  },
};
