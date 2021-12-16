import React, { useState, useEffect } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { Form, message, Button, Tabs } from 'antd';
import { LockOutlined, EditOutlined, FormOutlined, UndoOutlined } from '@ant-design/icons';
import { setUpload, setDownload } from '../../../../services/metaAuth';
import { actionAuth, getHeaders, setTokenAutoRefresh } from '../../../../utils/authUtils';
import { MetaCard } from '../../../MetaComponent';
import * as globalUtils from '../../../../utils/globalUtils';
import * as fnc from '../functions';
import InputForm from './forms/InputForm';
import IpccUserForm from './forms/ipccUserForm';

const { TabPane } = Tabs;

function InputComponent(props) {
  const {
    dispatch,
    account,
    staff,
    loading,
    searchForm,
    componentMode,
    setComponentMode,
    selectedTab,
    setSelectedTab,
    ipccUserMode,
    setIpccUserMode,
    currentPath,
  } = props;
  const { pagination } = staff.search;

  const [inputForm] = Form.useForm();

  // 안내 메세지 처리
  const messageDisplay = (submitType, model) => {
    const { created, updated, deleted, updatedPassword } = staff;
    const { created: ipccUserCreated, updated: ipccUserUpdated } = staff.ipccUser;
    let succeeded = false;

    if (model === 'staff') {
      if (submitType === 'create' && created && created.insertedId > 0) succeeded = true;
      if (submitType === 'update' && updated && updated.updatedCount > 0) succeeded = true;
      if (submitType === 'delete' && deleted && deleted.deletedCount > 0) succeeded = true;
    } else if (model === 'password') {
      if (submitType === 'update' && updatedPassword && updatedPassword.updatedCount > 0)
        succeeded = true;
    } else if (model === 'ipccUser') {
      if (submitType === 'create' && ipccUserCreated && ipccUserCreated.insertedId > 0)
        succeeded = true;
      if (submitType === 'update' && ipccUserUpdated && ipccUserUpdated.updatedCount > 0)
        succeeded = true;
    }

    if (succeeded) {
      message.success(formatMessage({ id: `message.info.${submitType}.success` }));
    } else {
      message.error(formatMessage({ id: `message.info.${submitType}.fail` }));
    }
  };

  useEffect(() => {
    if (componentMode === 'update') {
      // info정보 세팅
      const { info } = staff;
      inputForm.setFieldsValue({
        ...info,
        lastLogin: globalUtils.getDateMoment(info.lastLogin, 'ymdhms'),
        lastLogout: globalUtils.getDateMoment(info.lastLogout, 'ymdhms'),
        updatedPassword: globalUtils.getDateMoment(info.updatedPassword, 'ymdhms'),
        createdAt: globalUtils.getDateMoment(info.createdAt, 'ymdhms'),
        updatedAt: globalUtils.getDateMoment(info.updatedAt, 'ymdhms'),
      });

      // belongList 세팅
      setBelongList(
        fnc.makeBelongList(
          inputForm.getFieldValue('centers'),
          inputForm.getFieldValue('departments'),
          inputForm.getFieldValue('roles'),
        ),
      );

      // passwordModal 세팅
      updatePasswordForm.setFieldsValue({
        id: info.id,
        newPassword: '',
        confirmNewPassword: '',
      });
    }

    return () => {
      initForm();
    };
  }, [staff.info]);

  // 아이디 중복 체크 세팅
  const { checkedUserid } = staff;
  const onCheckUserid = userid => {
    // 아아디 중복 체크 초기화
    fnc.clearCheckUseridExec(dispatch);

    // 아이디 중복 체크 요청
    if (userid) {
      fnc.checkUseridExec(userid, dispatch, currentPath);
    }
  };

  // 소속 정보 세팅
  const [selectedCenter, setSelectedCenter] = useState(null); // (현재)선택한 센터
  const [selectedDepartments, setSelectedDepartments] = useState([]); // (현재)선택한 부서
  const [selectedRoles, setSelectedRoles] = useState([]); // (현재)선택한 Role
  const [belongList, setBelongList] = useState([]); // 소속 정보 조립

  // 소속 선택
  const onSelectBelong = {
    async center(centerId) {
      if (centerId > 0) {
        setSelectedCenter({
          id: centerId,
          name: globalUtils.getCenterNameByAccount(centerId),
        });
      } else {
        setSelectedCenter(null);
      }
      setSelectedDepartments([]);
      setSelectedRoles([]);

      // 소속 정보 조회(부서, 권한)
      fnc.belongExec(centerId, dispatch, currentPath);
    },
    department(values) {
      setSelectedDepartments(values);
    },
    role(values) {
      setSelectedRoles(values);
    },
  };

  // 소속 정보 추가
  const onStaffBelong = {
    add() {
      if (selectedCenter === null) {
        return;
      }

      const newBelongList = [
        ...belongList,
        {
          center: selectedCenter,
          departments: selectedDepartments,
          roles: selectedRoles,
        },
      ];
      setBelongList(newBelongList);

      // centerIds, departmentIds, roleIds 추출하기
      const [centerIds, departmentIds, roleIds] = fnc.getIdsFromBelongList(newBelongList);

      // inputForm.Fields값에 세팅
      const fields = {
        centerIds: inputForm.getFieldValue(centerIds),
        departmentIds: inputForm.getFieldValue(departmentIds),
        roleIds: inputForm.getFieldValue(roleIds),
      };
      inputForm.setFieldsValue({
        ...fields,
        centerIds,
        departmentIds,
        roleIds,
      });

      // 선택 박스 초기화
      onSelectBelong.center(0);
      inputForm.resetFields(['selectCenter', 'selectDepartment', 'selectRole']);
    },
    remove(index) {
      const removeBelongList = [...belongList];
      removeBelongList.splice(index, 1);
      setBelongList(removeBelongList);

      // centerIds, departmentIds, roleIds 추출하기
      const [centerIds, departmentIds, roleIds] = fnc.getIdsFromBelongList(removeBelongList);

      // inputForm.Fields값에 세팅
      const fields = {
        centerIds: inputForm.getFieldValue(centerIds),
        departmentIds: inputForm.getFieldValue(departmentIds),
        roleIds: inputForm.getFieldValue(roleIds),
      };
      inputForm.setFieldsValue({
        ...fields,
        centerIds,
        departmentIds,
        roleIds,
      });
    },
  };

  // form 초기화 실행
  const initForm = () => {
    // 입력 필드 초기화
    inputForm.resetFields();

    // 아이디 중복 체크 초기화
    fnc.clearCheckUseridExec(dispatch);

    // 소속 정보 초기화
    fnc.clearBelongExec(dispatch);
    setSelectedCenter(null);
    setSelectedDepartments([]);
    setSelectedRoles([]);
    setBelongList([]);

    // 파일 업로드 관련 초기화
    // setCreateMode('single'); // 등록 방식 초기화
    setStaffsFileList([]); // 파일 목록 초기화
    setStaffsFileLoading(false); // 파일 로딩 초기화
    setButtonUploadStaffsDisabled(false); // 업로드 버튼 초기화
  };

  // 등록 방식 설정
  const [createMode, setCreateMode] = useState('single'); // single: 단일등록(일반등록), bulk: 다중등록(파일업로드)

  // 사용자 리스트 파일 등록 설정
  const [staffsFileList, setStaffsFileList] = useState([]);
  const [staffsFileLoading, setStaffsFileLoading] = useState(false);
  const [buttonUploadStaffsDisabled, setButtonUploadStaffsDisabled] = useState(false); // 업로드 파일을 하나만 허용하기 위한 버튼 제어

  // 파일 업로드 속성 설정
  const staffsFileUploadProps = {
    multiple: false,
    accept: '.csv',
    fileList: staffsFileList,
    onRemove: file => {
      setButtonUploadStaffsDisabled(false);

      const index = staffsFileList.indexOf(file);
      const newFileList = staffsFileList.slice();
      newFileList.splice(index, 1);
      setStaffsFileList([...newFileList]);
    },
    beforeUpload: file => {
      // csv파일 타입만 허용하고 싶으나 file.type은 OS및 설치된 프로그램에 따라 다르게 나타나기 때문에 스킵
      // if (file.type !== 'application/vnd.ms-excel') {
      //   message.warning(formatMessage({ id: 'message.required.Staff.staffsFile.fileType' }));
      //   return false;
      // }

      // 파일 사이즈 설정
      const maxFileSize = 5; // 최대 허용 사이즈(단위: MB)
      if (file.size >= maxFileSize * 1048576) {
        message.warning(
          `${formatMessage({
            id: 'message.required.Staff.staffsFile.maxSize',
          })} (Max: ${maxFileSize} MB)`,
        );
        return false;
      }

      // upload버튼 비활성화(파일은 한개만 받음)
      setButtonUploadStaffsDisabled(true);

      // 파일 리스트 설정
      setStaffsFileList([...staffsFileList, file]);

      return false;
    },
  };

  const staffsFileSampleDownload = async () => {
    const { data, response } = await setDownload({
      resource: 'staffs',
      headers: getHeaders(currentPath),
    });
    setTokenAutoRefresh(response);

    const header = response.headers.get('content-disposition').replaceAll('"', '');
    const fileName =
      header.split('filename=').length > 1 ? header.split('filename=')[1].split(';') : 'Sample.csv';
    const dataUrl = window.URL.createObjectURL(new Blob([data]));
    const downloadLink = document.createElement('a');
    downloadLink.href = dataUrl;
    downloadLink.setAttribute('download', fileName);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  };

  // eslint-disable-next-line consistent-return
  const staffsFileUploadExec = async body => {
    if (staffsFileList.length === 0) {
      message.warning(formatMessage({ id: 'message.required.Staff.staffsFile' }));
      return false;
    }

    const formData = new FormData();
    formData.append('staffsFile', body.staffsFile);
    formData.append('centerIds', body.centerIds);
    formData.append('departmentIds', body.departmentIds);
    formData.append('roleIds', body.roleIds);
    setStaffsFileLoading(true);

    const { response } = await setUpload({
      resource: 'staffs',
      data: formData,
      headers: getHeaders(currentPath),
    });
    setTokenAutoRefresh(response);

    setButtonUploadStaffsDisabled(false);
    setStaffsFileList([]);
    setStaffsFileLoading(false);

    const { status } = response;
    if (status === 200) {
      message.success(formatMessage({ id: 'message.info.create.success' }));
    } else {
      message.error(formatMessage({ id: 'message.info.create.fail' }));
    }

    // 검색 초기화
    fnc.initSearchForm(searchForm);
    const paging = {
      ...pagination,
      current: 1,
    };
    const searchParams = fnc.setSearchParams(account, fnc.initRequestParams, paging);
    fnc.searchExec(searchParams, dispatch, paging, currentPath);

    // inputForm 초기화
    setTimeout(() => {
      initForm();
    }, 100);
  };

  // 신규등록 처리
  const [submitCreate, setSubmitCreate] = useState(false);
  const onCreate = fields => {
    const body = {
      userid: fields.userid,
      password: fields.password,
      name: fields.name,
      email: fields.email,
      mobile: fields.mobile,
      centerIds: fields.centerIds,
      departmentIds: fields.departmentIds,
      roleIds: fields.roleIds,
      staffsFile: fields.staffsFile && fields.staffsFile.file ? fields.staffsFile.file : null,
    };

    if (createMode === 'single') {
      //  일반등록인 경우 처리

      // 아이디 중복 체크 확인 후 진행
      if (
        checkedUserid &&
        checkedUserid.userid === body.userid &&
        checkedUserid.isAvailable === true
      ) {
        fnc.createExec(body, dispatch, currentPath);
        setSubmitCreate(true);
      } else {
        message.error(formatMessage({ id: 'message.required.Staff.checkUserid' }));
      }
    } else if (createMode === 'bulk') {
      // 다중등록인 경우 처리
      staffsFileUploadExec(body);
    }
  };
  // 등록 후 리스트 다시 출력(초기조건)
  if (loading.create === false && submitCreate === true) {
    setSubmitCreate(false);

    // 메세지 처리
    messageDisplay('create', 'staff');

    // 검색 초기화
    fnc.initSearchForm(searchForm);
    const paging = {
      ...pagination,
      current: 1,
    };
    const searchParams = fnc.setSearchParams(account, fnc.initRequestParams, paging);
    fnc.searchExec(searchParams, dispatch, paging, currentPath);

    // inputForm 초기화
    setTimeout(() => {
      initForm();
    }, 100);
  }

  // 수정 처리
  const [submitUpdate, setSubmitUpdate] = useState(false);
  const onUpdate = fields => {
    const { id } = fields;
    const body = {
      name: fields.name,
      multiLogin: fields.multiLogin,
      activate: fields.activate,
      email: fields.email,
      mobile: fields.mobile,
      centerIds: fields.centerIds,
      departmentIds: fields.departmentIds,
      roleIds: fields.roleIds,
    };

    fnc.updateExec(id, body, dispatch, currentPath);
    setSubmitUpdate(true);
  };
  // 수정 후 리스트 다시 출력(검색 조건)
  if (loading.update === false && submitUpdate === true) {
    setSubmitUpdate(false);

    // 메세지 처리
    messageDisplay('update', 'staff');

    const paging = {
      ...pagination,
    };
    const searchParams = fnc.setSearchParams(account, searchForm.getFieldsValue(), paging);
    fnc.searchExec(searchParams, dispatch, paging, currentPath);

    // 현재 정보 재 검색
    fnc.infoExec(staff.info.id, dispatch, currentPath);
  }

  // 등록/수정 취소
  const onCancel = () => {
    fnc.clearInfoExec(dispatch);
    initForm();

    if (componentMode === 'update') {
      setComponentMode('create');
    }
  };

  // 비밀번호 수정 모달
  const [passwordModal, setPasswordModal] = useState(false);
  const [updatePasswordForm] = Form.useForm();
  const [submitUpdatePassword, setSubmitUpdatePassword] = useState(false);
  const onUpdatePassword = fields => {
    const { id } = fields;
    const body = {
      password: fields.newPassword,
    };

    fnc.updatePasswordExec(id, body, dispatch, currentPath);
    setSubmitUpdatePassword(true);
  };
  // 비번 수정 후 모달 숨기기
  if (loading.updatePassword === false && submitUpdatePassword === true) {
    setSubmitUpdatePassword(false);
    setPasswordModal(false);

    // 메세지 처리
    messageDisplay('update', 'password');

    updatePasswordForm.setFieldsValue({
      ...updatePasswordForm.getFieldsValue(),
      newPassword: '',
      confirmNewPassword: '',
    });
  }

  // (ipccUser) 정보 세팅
  const [ipccUserForm] = Form.useForm();

  // (ipccUser) 정보 초기화
  const initFormIpccUser = centerCode => {
    // 입력 필드 초기화
    ipccUserForm.resetFields();

    // 입력 폼 기본 데이터 세팅
    ipccUserForm.setFieldsValue({
      ...fnc.initIpccUserParams,
      code: centerCode,
      staff_userid: staff.info && staff.info.userid ? staff.info.userid : null,
      name: staff.info && staff.info.name ? staff.info.name : null,
    });

    // switch 세팅
    setCheckedSwitchIpccUser({
      cidovr: fnc.initIpccUserParams.cidovr,
      inb_bell: fnc.initIpccUserParams.inb_bell,
      show_cid: fnc.initIpccUserParams.show_cid,
      no_rec: fnc.initIpccUserParams.no_rec,
      active: fnc.initIpccUserParams.active,
    });
  };

  // (ipccUser) CTI 아이디 중복 체크
  const { checkedUserid: checkedIpccUserid } = staff.ipccUser;
  const onCheckIpccUserid = (ipccUserid, centerCode) => {
    // CTI 아이디 중복 체크 초기화
    fnc.clearIpccUserCheckUseridExec(dispatch);

    // CTI 아이디 중복 체크 요청
    if (ipccUserid) {
      fnc.checkIpccUseridExec(ipccUserid, centerCode, dispatch, currentPath);
    }
  };

  // (ipccUser) 내선번호 중복 체크
  const { checkedSippeerId: checkedIpccUserSippeerId } = staff.ipccUser;
  const onCheckIpccUserSippeerId = (sippeerId, centerCode) => {
    // 내선번호가 숫자가 아닌 것은 제외함
    const sippeerIdNum = Number(sippeerId); // '0'으로 시작하는 숫자는 앞부분의 '0'이 제거됨
    if (Number.isNaN(sippeerIdNum)) {
      message.error(formatMessage({ id: 'message.required.IpccUser.checkSippeerId.number' }));
      return;
    }

    // 내선번호 중복 체크 초기화
    fnc.clearIpccUserCheckSippeerIdExec(dispatch);

    // 내선번호 중복 체크 요청
    if (sippeerIdNum > 0) {
      fnc.checkIpccUserSippeerIdExec(sippeerIdNum, centerCode, dispatch, currentPath);
    }
  };

  // (ipccUser) Switch값 처리
  const [checkedSwitchIpccUser, setCheckedSwitchIpccUser] = useState({});
  const onSwitchIpccUser = field => {
    setCheckedSwitchIpccUser({
      ...checkedSwitchIpccUser,
      [field]: !checkedSwitchIpccUser[field],
    });
  };

  // (ipccUser) 사용자의 일반정보/ipcc정보 탭 변경 시 처리
  const onChangeTab = key => {
    setSelectedTab(key);
  };

  // (ipccUser) 조회 할 ipccCenter 선택 시 처리
  const onChangeIpccCenter = async centerCode => {
    // ipccCenter, ipccUser정보 초기화
    setIpccUserMode(null);

    // 센터 선택정보 세팅
    fnc.selectIpccCenterExec(centerCode, dispatch);

    // 선택된 센터의 ipccCenter 정보를 조회 한다.
    fnc.infoIpccCenterExec(centerCode, dispatch, currentPath);

    // 해당 사용자의 ipccUser 정보를 조회 한다.
    fnc.infoIpccUserExec(staff.info.userid, centerCode, dispatch, currentPath);
  };

  // (ipccUser) 신규 등록 처리
  const [submitCreateIpccUser, setSubmitCreateIpccUser] = useState(false);
  const onCreateIpccUser = fields => {
    const body = {
      code: fields.code,
      staff_userid: fields.staff_userid,
      userid: fields.userid,
      name: fields.name,
      sippeer_id: fields.sippeer_id,
      ext: fields.ext,
      ext_next: fields.ext_next,
      ext_ring: fields.ext_ring,
      ext_ment: fields.ext_ment,
      cid: fields.cid,
      cidovr: fields.cidovr,
      inb_bel: fields.inb_bel,
      show_cid: fields.show_cid,
      no_rec: fields.no_rec,
      active: fields.active,
    };

    // CTI 아이디 중복 체크 확인 후 진행
    const isAvailableIpccUserid = !!(
      checkedIpccUserid &&
      checkedIpccUserid.userid === body.userid &&
      checkedIpccUserid.result === true
    );

    // 내선번호 중복 체크 확인 후 진행
    let isAvailableIpccUserSippeerId = true;
    if (body.sippeer_id) {
      // 내선 번호가 입력 되었을 때만 검증 한다.
      if (
        checkedIpccUserSippeerId &&
        checkedIpccUserSippeerId.sippeerId === body.sippeer_id &&
        checkedIpccUserSippeerId.result === true
      ) {
        isAvailableIpccUserSippeerId = true;
      } else {
        isAvailableIpccUserSippeerId = false;
      }
    }

    if (isAvailableIpccUserid && isAvailableIpccUserSippeerId) {
      fnc.createIpccUserExec(body, dispatch, currentPath);
      setSubmitCreateIpccUser(true);
    } else if (!isAvailableIpccUserid) {
      message.error(formatMessage({ id: 'message.required.IpccUser.checkUserid' }));
    } else if (!isAvailableIpccUserSippeerId) {
      message.error(formatMessage({ id: 'message.required.IpccUser.checkSippeerId' }));
    }
  };
  // (ipccUser) 등록 후 탭 정보 다시 출력
  if (loading.ipccUser.create === false && submitCreateIpccUser === true) {
    setSubmitCreateIpccUser(false);

    // 메세지 출력
    messageDisplay('create', 'ipccUser');

    // 현재 정보 재 검색
    fnc.infoIpccUserExec(
      ipccUserForm.getFieldValue('staff_userid'),
      ipccUserForm.getFieldValue('code'),
      dispatch,
      currentPath,
    );
    setIpccUserMode('update');
  }

  // (ipccUser) 수정 처리
  const [submitUpdateIpccUser, setSubmitUpdateIpccUser] = useState(false);
  const onUpdateIpccUser = fields => {
    const body = {
      code: fields.code,
      staff_userid: fields.staff_userid,
      userid: fields.userid,
      name: fields.name,
      sippeer_id: fields.sippeer_id,
      ext: fields.ext,
      ext_next: fields.ext_next,
      ext_ring: fields.ext_ring,
      ext_ment: fields.ext_ment,
      cid: fields.cid,
      cidovr: fields.cidovr,
      inb_bell: fields.inb_bell,
      show_cid: fields.show_cid,
      no_rec: fields.no_rec,
      active: fields.active,
    };

    // CTI 아이디 중복 체크 확인
    let isAvailableIpccUserid = true;
    if (staff.ipccUser.info && staff.ipccUser.info.userid !== body.userid) {
      // CTI아이디가 수정되었으면 중복 체크를 확인 한다.
      if (
        checkedIpccUserid &&
        checkedIpccUserid.userid === body.userid &&
        checkedIpccUserid.result === true
      ) {
        isAvailableIpccUserid = true;
      } else {
        isAvailableIpccUserid = false;
      }
    }

    // 내선번호 중복 체크 확인
    let isAvailableIpccUserSippeerId = true;
    if (staff.ipccUser.info && staff.ipccUser.info.sippeer_id !== body.sippeer_id) {
      // 내선 번호가 수정되었으면 중복 체크를 확인 한다.

      // 내선 번호가 입력 되었을 때만 검증 한다.
      if (body.sippeer_id) {
        if (
          checkedIpccUserSippeerId &&
          checkedIpccUserSippeerId.sippeerId === body.sippeer_id &&
          checkedIpccUserSippeerId.result === true
        ) {
          isAvailableIpccUserSippeerId = true;
        } else {
          isAvailableIpccUserSippeerId = false;
        }
      }
    }

    if (isAvailableIpccUserid && isAvailableIpccUserSippeerId) {
      fnc.updateIpccUserExec(staff.ipccUser.info.userid, body, dispatch, currentPath);
      setSubmitUpdateIpccUser(true);
    } else if (!isAvailableIpccUserid) {
      message.error(formatMessage({ id: 'message.required.IpccUser.checkUserid' }));
    } else if (!isAvailableIpccUserSippeerId) {
      message.error(formatMessage({ id: 'message.required.IpccUser.checkSippeerId' }));
    }
  };
  // (ipccUser) 수정 후 탭 다시 출력
  if (loading.ipccUser.update === false && submitUpdateIpccUser === true) {
    setSubmitUpdateIpccUser(false);

    // 메세지 출력
    messageDisplay('update', 'ipccUser');

    // 현재 정보 재 검색
    fnc.infoIpccUserExec(
      ipccUserForm.getFieldValue('staff_userid'),
      ipccUserForm.getFieldValue('code'),
      dispatch,
      currentPath,
    );
  }

  // (ipccUser) 등록/수정 취소
  const onCancelIpccUser = () => {
    fnc.infoExec(staff.info.id, dispatch, currentPath);
    setSelectedTab('staffTab');
  };

  // Card Title 및 버튼 설정
  const cardInfo = {
    title() {
      let cardTitle = '';
      const staffCardTitle = formatMessage({ id: `component.Staff.title.${componentMode}` });
      const ipccUserCardTitle = formatMessage({ id: 'component.Staff.title.ipccUser' });

      if (selectedTab === 'staffTab') {
        cardTitle = staffCardTitle;
      } else {
        cardTitle = `${staffCardTitle} - ${ipccUserCardTitle}`;
      }

      return cardTitle;
    },
    loading() {
      let cardLoading = false;
      if (selectedTab === 'staffTab') {
        cardLoading = componentMode === 'update' && loading.info;
      }

      return cardLoading;
    },
    button() {
      let cardButton = null;

      if (selectedTab === 'staffTab') {
        // 사용자 일반 정보 버튼
        cardButton = (
          <>
            <Button
              type="primary"
              onClick={() => inputForm.submit()}
              icon={
                <>
                  {componentMode === 'create' && <EditOutlined />}
                  {componentMode === 'update' && <FormOutlined />}
                </>
              }
              loading={createMode === 'bulk' ? staffsFileLoading : loading[componentMode]}
              size="small"
            >
              {formatMessage({ id: `component.Button.action.${componentMode}` })}
            </Button>
            <Button onClick={() => onCancel()} icon={<UndoOutlined />} size="small">
              {formatMessage({ id: 'component.Button.action.cancel' })}
            </Button>
          </>
        );
      } else {
        // ipccUser 버튼
        cardButton = (
          <>
            {ipccUserMode !== null && (
              <>
                <Button
                  type="primary"
                  onClick={() => ipccUserForm.submit()}
                  icon={
                    <>
                      {ipccUserMode === 'create' && <EditOutlined />}
                      {ipccUserMode === 'update' && <FormOutlined />}
                    </>
                  }
                  loading={loading.ipccUser[ipccUserMode]}
                  size="small"
                >
                  {formatMessage({ id: `component.IpccUser.button.${ipccUserMode}` })}
                </Button>
                <Button onClick={() => onCancelIpccUser()} icon={<UndoOutlined />} size="small">
                  {formatMessage({ id: 'component.Button.action.cancel' })}
                </Button>
              </>
            )}
          </>
        );
      }

      if (actionAuth[componentMode](currentPath)) {
        return cardButton;
      } else {
        return null;
      }
    },
  };

  return (
    <>
      <MetaCard title={cardInfo.title()} loading={cardInfo.loading()} extra={cardInfo.button()}>
        <Tabs type="card" defaultActiveKey={selectedTab} onChange={onChangeTab}>
          <TabPane tab={formatMessage({ id: 'component.Staff.tab.info' })} key="staffTab">
            {actionAuth[componentMode](currentPath) ? (
              <InputForm
                componentMode={componentMode}
                inputForm={inputForm}
                createMode={createMode}
                setCreateMode={setCreateMode}
                staffsFileUploadProps={staffsFileUploadProps}
                buttonUploadStaffsDisabled={buttonUploadStaffsDisabled}
                staffsFileSampleDownload={staffsFileSampleDownload}
                onCreate={onCreate}
                onUpdate={onUpdate}
                onCheckUserid={onCheckUserid}
                selectedCenter={selectedCenter}
                belongList={belongList}
                onStaffBelong={onStaffBelong}
                onSelectBelong={onSelectBelong}
                passwordModal={passwordModal}
                setPasswordModal={setPasswordModal}
                updatePasswordForm={updatePasswordForm}
                onUpdatePassword={onUpdatePassword}
                loading={loading}
                account={account}
                staff={staff}
              />
            ) : (
              <div style={{ textAlign: 'center' }}>
                <LockOutlined style={{ fontSize: '2rem' }} />
              </div>
            )}
          </TabPane>
          {componentMode === 'update' && actionAuth.update(currentPath) && (
            <TabPane tab={formatMessage({ id: 'component.Staff.tab.ipcc' })} key="ipccUserTab">
              <IpccUserForm
                staff={staff}
                ipccUserMode={ipccUserMode}
                setIpccUserMode={setIpccUserMode}
                ipccUserForm={ipccUserForm}
                initFormIpccUser={initFormIpccUser}
                checkedSwitchIpccUser={checkedSwitchIpccUser}
                setCheckedSwitchIpccUser={setCheckedSwitchIpccUser}
                onSwitchIpccUser={onSwitchIpccUser}
                onChangeIpccCenter={onChangeIpccCenter}
                onCreateIpccUser={onCreateIpccUser}
                onUpdateIpccUser={onUpdateIpccUser}
                onCheckIpccUserid={onCheckIpccUserid}
                onCheckIpccUserSippeerId={onCheckIpccUserSippeerId}
                loading={loading}
              />
            </TabPane>
          )}
        </Tabs>
      </MetaCard>
    </>
  );
}

export default InputComponent;
