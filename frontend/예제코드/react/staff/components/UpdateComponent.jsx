import React, { useState, useEffect } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { Form, Card, Tabs, Badge } from 'antd';
import { LockOutlined, LoadingOutlined } from '@ant-design/icons';
import { actionAuth } from '../../../../utils/authUtils';
import * as globalUtils from '../../../../utils/globalUtils';
import * as fnc from '../functions';
import InputForm from './forms/InputForm';
import StaffPropsForm from './forms/StaffPropsForm';

const { TabPane } = Tabs;

function UpdateComponent(props) {
  const {
    dispatch,
    account,
    staff,
    loading,
    searchForm,
    setCompSwitch,
    currentPath,
    selectedTab,
    setSelectedTab,
  } = props;
  const { pagination } = staff.search;

  const [inputForm] = Form.useForm();

  useEffect(() => {
    console.log('Mounted UpdateComponent');

    // get info
    const { info } = staff;
    inputForm.setFieldsValue({
      ...info,
      lastLogin: globalUtils.getDateMoment(info.lastLogin, 'ymdhms'),
      lastLogout: globalUtils.getDateMoment(info.lastLogout, 'ymdhms'),
      updatedPassword: globalUtils.getDateMoment(info.updatedPassword, 'ymdhms'),
      createdAt: globalUtils.getDateMoment(info.createdAt, 'ymdhms'),
    });

    return () => {
      console.log('Unmount UpdateComponent');
    };
  }, [staff.info]);

  // 수정 처리
  const [submitUpdate, setSubmitUpdate] = useState(false);
  const onFinish = fields => {
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

    const paging = {
      ...pagination,
    };
    const searchParams = fnc.setSearchParams(account, searchForm.getFieldsValue(), paging);
    fnc.searchExec(searchParams, dispatch, paging, currentPath);
  }

  // 삭제 처리
  const [submitDelete, setSubmitDelete] = useState(false);
  const onDelete = () => {
    setSubmitDelete(true);
    const { id } = inputForm.getFieldsValue();
    fnc.deleteExec(id, dispatch, currentPath);
  };
  // 삭제 후 리스트 다시 출력(검색조건)
  if (loading.delete === false && submitDelete === true) {
    setSubmitDelete(false);
    const paging = {
      ...pagination,
    };
    const searchParams = fnc.setSearchParams(account, searchForm.getFieldsValue(), paging);
    fnc.searchExec(searchParams, dispatch, paging, currentPath);

    // 신규등록 폼으로 변경
    setCompSwitch('create');
  }

  // StaffProps Bagde
  const getStaffPropsBadge = center => {
    const staffPropsList = staff.staffProps.list ? staff.staffProps.list.rowsData : [];
    let isExistData = false;
    if (staffPropsList) {
      for (let i = 0; i < staffPropsList.length; i += 1) {
        if (staffPropsList[i].centerId === center.id) {
          isExistData = true;
        }
      }
    }

    return <Badge dot={!isExistData}>{center.name}</Badge>;
  };

  return (
    <>
      <Card
        title={formatMessage({ id: 'component.Staff.title.info' })}
        style={{ marginBottom: '0.5rem' }}
        loading={loading.info}
      >
        {actionAuth.update(currentPath) ? (
          <Tabs type="card" defaultActiveKey={selectedTab}>
            <TabPane tab={formatMessage({ id: 'component.Staff.tab.info' })} key="staffInfo">
              <InputForm
                formType="update"
                inputForm={inputForm}
                onFinish={onFinish}
                onDelete={onDelete}
                loading={loading}
                dispatch={dispatch}
                account={account}
                staff={staff}
                setCompSwitch={setCompSwitch}
                currentPath={currentPath}
              />
            </TabPane>
            {staff.info.center &&
              staff.info.center.map(center => (
                <TabPane
                  tab={
                    loading.info === true || loading.staffProps.list === true ? (
                      <LoadingOutlined />
                    ) : (
                      getStaffPropsBadge(center)
                    )
                  }
                  key={`staffPropsTab-${center.id}`}
                >
                  <StaffPropsForm
                    dispatch={dispatch}
                    center={center}
                    staff={staff}
                    loading={loading}
                    currentPath={currentPath}
                    setSelectedTab={setSelectedTab}
                  />
                </TabPane>
              ))}
          </Tabs>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <LockOutlined style={{ fontSize: '25px' }} />
          </div>
        )}
      </Card>
    </>
  );
}

export default UpdateComponent;
