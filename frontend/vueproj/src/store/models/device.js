// 초기값 선언
const stateInit = {
  Device: {
    id: null,
    name: null,
    deviceModelName: null,
    manufacturer: null,
    location: null,
    edgeSerialNumber: null,
    networkInterface: null,
    networkConfig: null,
    description: null,
    createdAt: null,
    upatedAt: null,
    deletedAt: null,
  },
};

export default {
  state: {
    DeviceList: [],
    Device: { ...stateInit.Device },
    InputMode: null,
    InsertedResult: null,
    UpdatedResult: null,
    DeletedResult: null,
  },
  getters: {
    DeviceList: (state) => state.DeviceList,
    Device: (state) => state.Device,
    DeviceInputMode: (state) => state.InputMode,
    DeviceInsertedResult: (state) => state.InsertedResult,
    DeviceUpdatedResult: (state) => state.UpdatedResult,
    DeviceDeletedResult: (state) => state.DeletedResult,
  },
  mutations: {
    setDeviceList(state, data) {
      state.DeviceList = data;
    },
    setDevice(state, data) {
      state.Device = data;
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
    setDeletedResult(state, data) {
      state.DeletedResult = data;
    },
  },
  actions: {
    actionDeviceList(context) {
      const DeviceList = [
        {
          id: 1,
          name: "TestName",
          deviceModelName: "model1",
          manufacturer: "manufacturer1",
          location: "incheon",
          edgeSerialNumber: "abc-1",
          networkInterface: "통신인터페이스1",
          networkConfig: "통신설정1",
          description: "뭐가 뭔지.....",
          createdAt: "2021-11-01T00:00:00.000Z".substring(0, 10),
          updatedAt: "2021-11-15T00:00:00.000Z".substring(0, 10),
          deletedAt: "2021-12-01T00:00:00.000Z".substring(0, 10),
        },
        {
          id: 2,
          name: "TestName2",
          deviceModelName: "model2",
          manufacturer: "manufacturer2",
          location: "seoul",
          edgeSerialNumber: "abc-2",
          networkInterface: "통신인터페이스2",
          networkConfig: "통신설정2",
          description: "????",
          createdAt: "2021-11-01T00:00:00.000Z".substring(0, 10),
          updatedAt: "2021-11-15T00:00:00.000Z".substring(0, 10),
          deletedAt: "2021-12-01T00:00:00.000Z".substring(0, 10),
        },
      ];

      context.commit("setDeviceList", DeviceList);
    },

    // 등록
    actionDeviceInsert(context, payload) {
      console.log("actionDeviceInsert", payload);

      setTimeout(() => {
        const insertedResult = 1;
        context.commit("setInsertedResult", insertedResult);
      }, 300);
    },

    // 초기화
    actionDeviceInit(context) {
      context.commit("setDevice", { ...stateInit.Device });
    },

    // 입력모드 설정
    actionDeviceInputMode(context, payload) {
      context.commit("setInputMode", payload);
    },

    // 디바이스 정보 조회
    actionDeviceInfo(context, payload) {
      setTimeout(() => {
        const DeviceList = [
          {
            id: 1,
            name: "TestName",
            deviceModelName: "model1",
            manufacturer: "manufacturer1",
            location: "incheon",
            edgeSerialNumber: "abc-1",
            networkInterface: "통신인터페이스1",
            networkConfig: "통신설정1",
            description: "뭐가 뭔지.....",
            createdAt: "2021-11-01T00:00:00.000Z".substring(0, 10),
            updatedAt: "2021-11-15T00:00:00.000Z".substring(0, 10),
            deletedAt: "2021-12-01T00:00:00.000Z".substring(0, 10),
          },
          {
            id: 1,
            name: "TestName2",
            deviceModelName: "model2",
            manufacturer: "manufacturer2",
            location: "seoul",
            edgeSerialNumber: "abc-2",
            networkInterface: "통신인터페이스2",
            networkConfig: "통신설정2",
            description: "????",
            createdAt: "2021-11-01T00:00:00.000Z".substring(0, 10),
            updatedAt: "2021-11-15T00:00:00.000Z".substring(0, 10),
            deletedAt: "2021-12-01T00:00:00.000Z".substring(0, 10),
          },
        ];

        let Device = { ...stateInit.Device };
        for (let i = 0; i < DeviceList.length; i += 1) {
          if (payload === DeviceList[i].id) {
            Device = { ...DeviceList[i] };
          }
        }
        context.commit("setDevice", Device);
      }, 300);
    },

    // 수정
    actionDeviceUpdate(context, payload) {
      console.log("actionDeviceUpdate", payload);

      setTimeout(() => {
        const updatedResult = 1;
        context.commit("setUpdatedResult", updatedResult);
      }, 300);
    },
    // 삭제
    actionDeviceDelete(context, payload) {
      console.log("actionDeviceDelete", payload);

      setTimeout(() => {
        const updatedResult = 1;
        context.commit("setDeletedResult", updatedResult);
      }, 300);
    },
  },
};
