import {
  getList,
  getTree,
  getInfo,
  checkUserid,
  setUpdate,
  setUpdatePassword,
  setCreate,
  setDelete,
} from '@/services/metaAuth';
import { getInfo as getIpccCenterInfo } from '@/services/ipccCenter';
import {
  getInfo as getIpccUserInfo,
  getDupCheck as getIpccUserDupCheck,
  setCreate as setIpccUserCreate,
  setUpdate as setIpccUserUpdate,
} from '@/services/ipccUser';
import { setTokenAutoRefresh } from '../utils/authUtils';
import * as globalUtils from '../utils/globalUtils';

const namespace = 'staff'; // state name
const resource = 'staffs'; // call api resource name
const initState = {
  list: {},
  search: {
    params: {},
    pagination: {
      pageSize: 10,
      showSizeChanger: true,
      current: 1,
      total: 0,
    },
  },
  info: {},
  checkedUserid: {},
  updated: {},
  updatedPassword: {},
  created: {},
  deleted: {},
  belong: {
    departmentList: {},
    roleList: {},
  },
  ipccCenter: {
    selected: null, // 선택된 센터의 코드정보(center.code)
    info: {},
  },
  ipccUser: {
    info: {},
    checkedUserid: {},
    checkedSippeerId: {},
    updated: {},
    created: {},
  },
};

const StaffModel = {
  namespace,
  state: {
    ...initState,
  },
  effects: {
    *list({ params, pagination, headers }, { call, put }) {
      let response = null;
      let status = null;
      let data = null;

      // back-end조회
      const responseOrigin1 = yield call(getList, { resource, params, headers });
      const response1 = responseOrigin1.response;
      const status1 = response1.status;
      const data1 = responseOrigin1.data.data;

      // totalCount, rowsCount값 추출
      const totalCnt = status1 === 200 ? data1.totalCount : 0;
      const rowsCnt = status1 === 200 ? data1.rowsCount : 0;

      // 마지막 페이지 조회인 경우를 위한 재 조회
      let currentPage = pagination.current;
      const paramsData = { ...params };
      if (
        totalCnt > 0 && // 총 데이터가 있는데
        rowsCnt === 0 // 현재 데이터가 없는 경우는 --> 마지막 페이지에서 해당 row가 수정/삭제된 경우
      ) {
        // 현재 페이지를 마지막 페이지로 변경해 준다.
        currentPage = Math.ceil(totalCnt / pagination.pageSize);
        // offset값을 현재 페이지에 맞추어 준다.
        paramsData.offset = globalUtils.getOffsetValue({ ...pagination, current: currentPage });

        // back-end 조회
        const responseOrigin2 = yield call(getList, { resource, params: paramsData, headers });
        const response2 = responseOrigin2.response;
        const status2 = response2.status;
        const data2 = responseOrigin2.data.data;

        response = response2;
        status = status2;
        data = data2;
      } else {
        response = response1;
        status = status1;
        data = data1;
      }

      setTokenAutoRefresh(response);

      yield put({
        type: 'STAFF_LIST',
        status,
        payload: data,
        search: {
          ...initState.search,
          params: paramsData,
          pagination: {
            ...initState.search.pagination,
            pageSize: pagination.pageSize,
            current: currentPage,
            total: totalCnt,
          },
        },
      });
    },
    *info({ id, headers }, { call, put }) {
      const { data: resData, response } = yield call(getInfo, { resource, id, headers });
      const { status } = response;
      const { data } = resData;

      setTokenAutoRefresh(response);

      yield put({
        type: 'STAFF_INFO',
        status,
        payload: data,
      });
    },
    *clearInfo(_, { put }) {
      yield put({
        type: 'STAFF_CLEAR_INFO',
      });
    },
    *checkUserid({ userid, headers }, { call, put }) {
      const { data: resData, response } = yield call(checkUserid, { resource, userid, headers });
      const { status } = response;
      const { data } = resData;

      setTokenAutoRefresh(response);

      yield put({
        type: 'STAFF_CHECK_USERID',
        status,
        payload: data,
      });
    },
    *clearCheckUserid(_, { put }) {
      yield put({
        type: 'STAFF_CLEAR_CHECK_USERID',
      });
    },
    *update({ id, body, headers }, { call, put }) {
      const { data: resData, response } = yield call(setUpdate, { resource, id, body, headers });
      const { status } = response;
      const { data } = resData;

      setTokenAutoRefresh(response);

      yield put({
        type: 'STAFF_UPDATE',
        status,
        payload: data,
      });
    },
    *updatePassword({ id, body, headers }, { call, put }) {
      const { data: resData, response } = yield call(setUpdatePassword, {
        resource,
        id,
        body,
        headers,
      });
      const { status } = response;
      const { data } = resData;

      setTokenAutoRefresh(response);

      yield put({
        type: 'STAFF_UPDATE_PASSWORD',
        status,
        payload: data,
      });
    },
    *create({ body, headers }, { call, put }) {
      const { data: resData, response } = yield call(setCreate, { resource, body, headers });
      const { status } = response;
      const { data } = resData;

      setTokenAutoRefresh(response);

      yield put({
        type: 'STAFF_CREATE',
        status,
        payload: data,
      });
    },
    *delete({ id, headers }, { call, put }) {
      const { data: resData, response } = yield call(setDelete, { resource, id, headers });
      const { status } = response;
      const { data } = resData;

      setTokenAutoRefresh(response);

      yield put({
        type: 'STAFF_DELETE',
        status,
        payload: data,
      });
    },
    *belongDepartment({ params, headers }, { call, put }) {
      const { data: resData, response } = yield call(getTree, {
        resource: 'departments',
        params,
        headers,
      });
      const { status } = response;
      const { data } = resData;

      setTokenAutoRefresh(response);

      yield put({
        type: 'STAFF_BELONG_DEPARTMENT_LIST',
        status,
        payload: data,
      });
    },
    *belongRole({ params, headers }, { call, put }) {
      const { data: resData, response } = yield call(getList, {
        resource: 'roles',
        params,
        headers,
      });
      const { status } = response;
      const { data } = resData;

      setTokenAutoRefresh(response);

      yield put({
        type: 'STAFF_BELONG_ROLE_LIST',
        status,
        payload: data,
      });
    },
    *clearBelong(_, { put }) {
      yield put({
        type: 'STAFF_CLEAR_BELONG',
      });
    },
    *ipccCenterSelected({ centerCode }, { put }) {
      yield put({
        type: 'IPCCCENTER_SELECTED',
        payload: centerCode,
      });
    },
    *ipccCenterInfo({ centerCode, headers }, { call, put }) {
      const { data: resData, response } = yield call(getIpccCenterInfo, { centerCode, headers });
      const { status } = response;
      const { data } = resData;
      // console.log('staff*ipccCenterInfo.response', response);
      // console.log('staff*ipccCenterInfo.resData', resData);

      setTokenAutoRefresh(response);

      yield put({
        type: 'IPCCCENTER_INFO',
        status,
        payload: data,
      });
    },
    *ipccUserInfo({ staffUserid, centerCode, headers }, { call, put }) {
      const { data: resData, response } = yield call(getIpccUserInfo, {
        staffUserid,
        centerCode,
        headers,
      });
      const { status } = response;
      const { data } = resData;
      // console.log('staff*ipccUserinfo.response', response);
      // console.log('staff*ipccUserInfo.resData', resData);

      setTokenAutoRefresh(response);

      yield put({
        type: 'IPCCUSER_INFO',
        status,
        payload: data,
      });
    },
    *ipccUserCheckUserid({ ipccUserid, centerCode, headers }, { call, put }) {
      const { data: resData, response } = yield call(getIpccUserDupCheck, {
        cmd: 'duplUserId',
        ipccUserid,
        centerCode,
        headers,
      });
      const { status } = response;
      const { data } = resData;
      // console.log('staff*ipccUserCheckUserid.response', response);
      // console.log('staff*ipccUserCheckUserid.resData', resData);

      // ipccUserid값을 추가해 준다.
      data.userid = ipccUserid;

      setTokenAutoRefresh(response);

      yield put({
        type: 'IPCCUSER_CHECK_USERID',
        status,
        payload: data,
      });
    },
    *ipccUserCheckSippeerId({ sippeerId, centerCode, headers }, { call, put }) {
      const { data: resData, response } = yield call(getIpccUserDupCheck, {
        cmd: 'duplSipeerId',
        sippeerId,
        centerCode,
        headers,
      });
      const { status } = response;
      const { data } = resData;
      // console.log('staff*ipccUserCheckSippeerId.response', response);
      // console.log('staff*ipccUserCheckSippeerId.resData', resData);

      // sippeerId값을 추가해 준다.
      data.sippeerId = sippeerId;

      setTokenAutoRefresh(response);

      yield put({
        type: 'IPCCUSER_CHECK_SIPPEERID',
        status,
        payload: data,
      });
    },
    *ipccUserCreate({ body, headers }, { call, put }) {
      const { data: resData, response } = yield call(setIpccUserCreate, { body, headers });
      const { status } = response;
      const { data } = resData;
      // console.log('staff*ipccUserCreate.response', response);
      // console.log('staff*ipccUserCreate.resData', resData);

      setTokenAutoRefresh(response);

      yield put({
        type: 'IPCCUSER_CREATE',
        status,
        payload: data,
      });
    },
    *ipccUserUpdate({ userid, body, headers }, { call, put }) {
      const { data: resData, response } = yield call(setIpccUserUpdate, { userid, body, headers });
      const { status } = response;
      const { data } = resData;
      // console.log('staff*ipccUserUpdate.response', response);
      // console.log('staff*ipccUserUpdate.resData', resData);

      setTokenAutoRefresh(response);

      yield put({
        type: 'IPCCUSER_UPDATE',
        status,
        payload: data,
      });
    },
    *clearIpccUserCheckUserid(_, { put }) {
      yield put({
        type: 'IPCCUSER_CLEAR_CHECK_USERID',
      });
    },
    *clearIpccUserCheckSippeerId(_, { put }) {
      yield put({
        type: 'IPCCUSER_CLEAR_CHECK_SIPPEERID',
      });
    },
    *clearIpccInfoAll(_, { put }) {
      yield put({
        type: 'IPCCINFO_CLEAR',
      });
    },
  },
  reducers: {
    STAFF_LIST(state, action) {
      return {
        ...state,
        list: action.payload,
        search: action.search,
      };
    },
    STAFF_INFO(state, action) {
      return {
        ...state,
        info: action.payload,
      };
    },
    STAFF_CLEAR_INFO(state) {
      return {
        ...state,
        info: {
          ...initState.info,
        },
      };
    },
    STAFF_CHECK_USERID(state, action) {
      return {
        ...state,
        checkedUserid: action.payload,
      };
    },
    STAFF_CLEAR_CHECK_USERID(state) {
      return {
        ...state,
        checkedUserid: {
          ...initState.checkedUserid,
        },
      };
    },
    STAFF_UPDATE(state, action) {
      return {
        ...state,
        updated: action.payload,
      };
    },
    STAFF_UPDATE_PASSWORD(state, action) {
      return {
        ...state,
        updatedPassword: action.payload,
      };
    },
    STAFF_CREATE(state, action) {
      return {
        ...state,
        created: action.payload,
      };
    },
    STAFF_DELETE(state, action) {
      return {
        ...state,
        deleted: action.payload,
      };
    },
    STAFF_BELONG_DEPARTMENT_LIST(state, action) {
      return {
        ...state,
        belong: {
          ...state.belong,
          departmentList: action.payload,
        },
      };
    },
    STAFF_BELONG_ROLE_LIST(state, action) {
      return {
        ...state,
        belong: {
          ...state.belong,
          roleList: action.payload,
        },
      };
    },
    STAFF_CLEAR_BELONG(state) {
      return {
        ...state,
        belong: {
          ...initState.belong,
        },
      };
    },
    IPCCCENTER_SELECTED(state, action) {
      return {
        ...state,
        ipccCenter: {
          ...state.ipccCenter,
          selected: action.payload,
        },
      };
    },
    IPCCCENTER_INFO(state, action) {
      return {
        ...state,
        ipccCenter: {
          ...state.ipccCenter,
          info: action.payload,
        },
      };
    },
    IPCCUSER_INFO(state, action) {
      return {
        ...state,
        ipccUser: {
          ...state.ipccUser,
          info: action.payload,
        },
      };
    },
    IPCCUSER_CHECK_USERID(state, action) {
      return {
        ...state,
        ipccUser: {
          ...state.ipccUser,
          checkedUserid: action.payload,
        },
      };
    },
    IPCCUSER_CHECK_SIPPEERID(state, action) {
      return {
        ...state,
        ipccUser: {
          ...state.ipccUser,
          checkedSippeerId: action.payload,
        },
      };
    },
    IPCCUSER_CLEAR_CHECK_USERID(state) {
      return {
        ...state,
        ipccUser: {
          ...state.ipccUser,
          checkedUserid: initState.ipccUser.checkedUserid,
        },
      };
    },
    IPCCUSER_CLEAR_CHECK_SIPPEERID(state) {
      return {
        ...state,
        ipccUser: {
          ...state.ipccUser,
          checkedSippeerId: initState.ipccUser.checkedSippeerId,
        },
      };
    },
    IPCCUSER_CREATE(state, action) {
      return {
        ...state,
        ipccUser: {
          ...state.ipccUser,
          created: action.payload,
        },
      };
    },
    IPCCUSER_UPDATE(state, action) {
      return {
        ...state,
        ipccUser: {
          ...state.ipccUser,
          updated: action.payload,
        },
      };
    },
    IPCCINFO_CLEAR(state) {
      return {
        ...state,
        ipccCenter: {
          ...initState.ipccCenter,
        },
        ipccUser: {
          ...initState.ipccUser,
        },
      };
    },
  },
};

export default StaffModel;
