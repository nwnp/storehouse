// 초기값 선언
const stateInit = {
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
    Department: { ...stateInit.Department },
    InsertedResult: null, // 입력처리 후 결과
    UpdatedResult: null, // 수정처리 후 결과
    DeletedResult: null, // 삭제처리 후 결과
    InputMode: null, // 입력모드(등록: insert, 수정: update)
  },
  getters: {
    DepartmentList: (state) => state.DepartmentList,
    Department: (state) => state.Department,
    DepartmentInsertedResult: (state) => state.InsertedResult,
    DepartmentUpdatedResult: (state) => state.UpdatedResult,
    DepartmentDeleteResult: (state) => state.DeletedResult,
    DepartmentInputMode: (state) => state.InputMode,
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
    setDeletedResult(state, data) {
      state.DeletedResult = data;
    },
    setInputMode(state, data) {
      state.InputMode = data;
    },
  },
  actions: {
    // 부서 리스트 조회
    actDepartmentList(context) {
      /* RestAPI 호출 */

      api.get("/serverApi/departments").then((response) => {
        const departmentList = response && response.data;
        context.commit("setDepartmentList", departmentList);
      });
    },
    // 부서 입력
    actDepartmentInsert(context) {
      /* RestAPI 호출 */

      api.post("/serverApi/departments").then((response) => {
        const insertedResult = response && response.insertedId;
        context.commit("setInsertedResult", insertedResult);
      });
    },
    // 부서정보 초기화
    actDepartmentInit(context) {
      context.commit("setDepartment", { ...stateInit.Department });
    },
    // 입력모드 설정
    actDepartmentInputMode(context, payload) {
      context.commit("setInputMode", payload);
    },
    // 부서 상세정보 조회
    actDepartmentInfo(context, payload) {
      /* RestAPI 호출 */

      api.get("/serverApi/departments/${payload}").then((response) => {
        const department = response && response.department;
        context.commit("setDepartment", department);
      });
    },
    // 부서 수정
    actDepartmentUpdate(context, payload) {
      /* RestAPI 호출 */

      api.put("/serverApi/departments/${payload}").then((response) => {
        const updatedResult = response && response.updatedCount;
        context.commit("setUpdatedResult", updatedResult);
      });
    },
    actDepartmentDelete(context, payload) {
      api.delete(`/serverApi/deparments/${payload}`).then((response) => {
        const deletedResult = response && response.deletedCount;
        context.commit("setDeletedResult", deletedResult);
      });
    },
  },
};
