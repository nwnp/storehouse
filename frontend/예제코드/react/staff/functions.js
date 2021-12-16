import * as globalUtils from '../../../utils/globalUtils';
import { getHeaders } from '../../../utils/authUtils';

// 검색 파라미터 초기화
export const initRequestParams = {
  fields: '',
  centerIds: '',
  userid: '',
  name: '',
  activate: '',
  order: '',
  limit: '',
  offset: '',
};

// ipccUser 입력 폼 초기화
export const initIpccUserParams = {
  code: null,
  staff_userid: null,
  userid: null,
  name: null,
  sippeer_id: null,
  ext: null,
  ext_next: null,
  ext_ring: 60,
  ext_ment: null,
  cid: null,
  cidovr: false,
  inb_bell: true,
  show_cid: false,
  no_rec: false,
  active: true,
};

// 검색 폼 초기화
export const initSearchForm = searchForm => {
  searchForm.setFieldsValue({
    centerIds: initRequestParams.centerIds,
    srchField: 'name',
    srchValue: '',
    activate: initRequestParams.activate,
  });
};

// 검색 파라미터 세팅
export const setSearchParams = (account, fields, paging, sorter) => {
  const searchParams = {
    ...initRequestParams,
    centerIds: fields.centerIds === '' ? account.userInfo.centerIds.toString() : fields.centerIds,
    userid: fields.srchField === 'userid' ? fields.srchValue : '',
    name: fields.srchField === 'name' ? fields.srchValue : '',
    activate: fields.activate,
    order: sorter && sorter.field ? globalUtils.getOrderValue(sorter) : initRequestParams.order,
    limit: paging && paging.pageSize ? paging.pageSize : initRequestParams.limit,
    offset: globalUtils.getOffsetValue(paging),
  };

  return searchParams;
};

// 검색 실행
export const searchExec = (searchParams, dispatch, paging, currentPath) => {
  dispatch({
    type: 'staff/list',
    params: {
      ...searchParams,
    },
    pagination: {
      ...paging,
    },
    headers: getHeaders(currentPath),
  });
};

// 상세 정보 조회
export const infoExec = (id, dispatch, currentPath) => {
  // 사용자 상세정보
  dispatch({
    type: 'staff/info',
    id,
    headers: getHeaders(currentPath),
  });

  // ipccUser정보는 초기화
  dispatch({
    type: 'staff/clearIpccInfoAll',
  });
};

// 상세 정보 초기화
export const clearInfoExec = dispatch => {
  dispatch({
    type: 'staff/clearInfo',
  });
};

// 아이디 중복 체크
export const checkUseridExec = (userid, dispatch, currentPath) => {
  dispatch({
    type: 'staff/checkUserid',
    userid,
    headers: getHeaders(currentPath),
  });
};

// 아이디 중복 체크 초기화
export const clearCheckUseridExec = dispatch => {
  dispatch({
    type: 'staff/clearCheckUserid',
  });
};

// 소속 정보 조회
export const belongExec = async (centerId, dispatch, currentPath) => {
  // 소속 부서 조회
  await dispatch({
    type: 'staff/belongDepartment',
    params: {
      fields: '',
      id: '',
      centerId,
    },
    headers: getHeaders(currentPath),
  });

  // 소속 권한 조회
  await dispatch({
    type: 'staff/belongRole',
    params: {
      fields: 'id,name',
      centerId,
      order: 'auth',
      limit: '',
    },
    headers: getHeaders(currentPath),
  });
};

// 소속 정보 초기화
export const clearBelongExec = dispatch => {
  dispatch({
    type: 'staff/clearBelong',
  });
};

// 신규 등록 실행
export const createExec = (body, dispatch, currentPath) => {
  dispatch({
    type: 'staff/create',
    body,
    headers: getHeaders(currentPath),
  });
};

// 수정 실행
export const updateExec = (id, body, dispatch, currentPath) => {
  dispatch({
    type: 'staff/update',
    id,
    body,
    headers: getHeaders(currentPath),
  });
};

// 비밀번호 수정 실행
export const updatePasswordExec = (id, body, dispatch, currentPath) => {
  dispatch({
    type: 'staff/updatePassword',
    id,
    body,
    headers: getHeaders(currentPath),
  });
};

// 삭제 실행
export const deleteExec = (id, dispatch, currentPath) => {
  dispatch({
    type: 'staff/delete',
    id,
    headers: getHeaders(currentPath),
  });
};

// ipccInfo 초기화
export const clearIpccInfoExec = dispatch => {
  dispatch({
    type: 'staff/clearIpccInfoAll',
  });
};

// iccCenter 선택
export const selectIpccCenterExec = (centerCode, dispatch) => {
  dispatch({
    type: 'staff/ipccCenterSelected',
    centerCode,
  });
};

// ipccCenter 정보 조회
export const infoIpccCenterExec = (centerCode, dispatch, currentPath) => {
  dispatch({
    type: 'staff/ipccCenterInfo',
    centerCode,
    headers: getHeaders(currentPath),
  });
};

// ipccUser 정보 조회
export const infoIpccUserExec = (staffUserid, centerCode, dispatch, currentPath) => {
  dispatch({
    type: 'staff/ipccUserInfo',
    staffUserid,
    centerCode,
    headers: getHeaders(currentPath),
  });
};

// ipccUser CTI 아이디 중복 체크
export const checkIpccUseridExec = (ipccUserid, centerCode, dispatch, currentPath) => {
  dispatch({
    type: 'staff/ipccUserCheckUserid',
    ipccUserid,
    centerCode,
    headers: getHeaders(currentPath),
  });
};

// ipccUser 내선번호 중복 체크
export const checkIpccUserSippeerIdExec = (sippeerId, centerCode, dispatch, currentPath) => {
  dispatch({
    type: 'staff/ipccUserCheckSippeerId',
    sippeerId,
    centerCode,
    headers: getHeaders(currentPath),
  });
};

// ipccUser CTI 아이디 중복 체크 초기화
export const clearIpccUserCheckUseridExec = dispatch => {
  dispatch({
    type: 'staff/clearIpccUserCheckUserid',
  });
};

// ipccUser 내선번호 중복 체크 초기화
export const clearIpccUserCheckSippeerIdExec = dispatch => {
  dispatch({
    type: 'staff/clearIpccUserCheckSippeerId',
  });
};

// ipccUser 신규등록 실행
export const createIpccUserExec = async (body, dispatch, currentPath) => {
  // ipccUser 입력
  await dispatch({
    type: 'staff/ipccUserCreate',
    body,
    headers: getHeaders(currentPath),
  });
};

// ipccUser 수정 실행
export const updateIpccUserExec = async (userid, body, dispatch, currentPath) => {
  await dispatch({
    type: 'staff/ipccUserUpdate',
    userid,
    body,
    headers: getHeaders(currentPath),
  });
};

// centerList, departmentList, roleList에서 belongList를 만들어 주기
export const makeBelongList = (centerList, departmentList, roleList) => {
  const belongList = [];
  for (let i = 0; i < centerList.length; i += 1) {
    const center = { id: centerList[i].id, name: centerList[i].name };

    const departments = [];
    for (let j = 0; j < departmentList.length; j += 1) {
      if (departmentList[j].centerId === center.id) {
        departments.push({ id: departmentList[j].id, name: departmentList[j].name });
      }
    }

    const roles = [];
    for (let j = 0; j < roleList.length; j += 1) {
      if (roleList[j].centerId === center.id) {
        roles.push({ id: roleList[j].id, name: roleList[j].name });
      }
    }

    belongList.push({
      center,
      departments,
      roles,
    });
  }

  return belongList;
};

// belongList에서 centerIds, departmentIds, roleIds를 추출해 준다.
export const getIdsFromBelongList = belongList => {
  let centerIds = [];
  let departmentIds = [];
  let roleIds = [];
  for (let i = 0; i < belongList.length; i += 1) {
    const belong = belongList[i];

    // centerIds
    centerIds.push(belong.center.id);

    // departmentsIds
    for (let j = 0; j < belong.departments.length; j += 1) {
      departmentIds.push(belong.departments[j].id);
    }

    // roleIds
    for (let j = 0; j < belong.roles.length; j += 1) {
      roleIds.push(belong.roles[j].id);
    }
  }
  // 중복 제거
  centerIds = globalUtils.removeDuplication(centerIds);
  departmentIds = globalUtils.removeDuplication(departmentIds);
  roleIds = globalUtils.removeDuplication(roleIds);

  return [centerIds, departmentIds, roleIds];
};

// <Select>에서 선택된 department/role 값들을 json 형태({id, name})로 만들어 준다.
export const getJsonList4Belong = (ids, list) => {
  const listData = list ? list.rowsData : [];

  const jsonList = [];
  for (let i = 0; i < ids.length; i += 1) {
    const id = ids[i];

    for (let j = 0; j < listData.length; j += 1) {
      const data = listData[j];

      if (id === data.id) {
        jsonList.push({
          id: data.id,
          name: data.name,
        });
      }
    }
  }

  return jsonList;
};
