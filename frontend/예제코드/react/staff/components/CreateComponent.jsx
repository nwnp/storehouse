import React, { useState, useEffect } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { Form, Card } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { actionAuth } from '../../../../utils/authUtils';
import * as fnc from '../functions';
import InputForm from './forms/InputForm';

function CreateComponent(props) {
  const { dispatch, account, staff, loading, searchForm, currentPath } = props;
  const { pagination } = staff.search;

  const [inputForm] = Form.useForm();

  useEffect(() => {
    console.log('Mounted CreateComponent');

    return () => {
      console.log('Unmount CreateComponent');
    };
  }, [staff.created]);

  // 신규등록 처리
  const [submitCreate, setSubmitCreate] = useState(false);
  const onFinish = fields => {
    const body = {
      userid: fields.userid,
      password: fields.password,
      name: fields.name,
      email: fields.email,
      mobile: fields.mobile,
      centerIds: fields.centerIds,
      departmentIds: fields.departmentIds,
      roleIds: fields.roleIds,
    };
    fnc.createExec(body, dispatch, currentPath);
    setSubmitCreate(true);
  };
  // 등록 후 리스트 다시 출력(초기조건)
  if (loading.create === false && submitCreate === true) {
    setSubmitCreate(false);

    // 검색 초기화
    fnc.initSearchForm(searchForm);
    const paging = {
      ...pagination,
      current: 1,
    };
    const searchParams = fnc.setSearchParams(account, fnc.initRequestParams, paging);
    fnc.searchExec(searchParams, dispatch, paging, currentPath);

    // 입력 필드 초기화
    setTimeout(() => {
      inputForm.resetFields();
    }, 100);
  }

  return (
    <>
      <Card
        title={formatMessage({ id: 'component.Staff.title.addNew' })}
        style={{ marginBottom: '0.5rem' }}
      >
        {actionAuth.create(currentPath) ? (
          <InputForm
            formType="create"
            inputForm={inputForm}
            onFinish={onFinish}
            loading={loading}
            dispatch={dispatch}
            account={account}
            staff={staff}
            currentPath={currentPath}
          />
        ) : (
          <div style={{ textAlign: 'center' }}>
            <LockOutlined style={{ fontSize: '25px' }} />
          </div>
        )}
      </Card>
    </>
  );
}

export default CreateComponent;
