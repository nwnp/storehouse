import React, { useState } from 'react';
import { connect } from 'dva';
import { Row, Col, Form } from 'antd';
import ListComponent from './components/ListComponent';
import InputComponent from './components/InputComponent';

function Staff(props) {
  const { dispatch, account, staff, loading, currentPath } = props;

  const [searchForm] = Form.useForm(); // 검색 Form
  const [componentMode, setComponentMode] = useState('create'); // 컴포넌트 모드(create, update)

  // 사용자 속성 편집
  const [selectedTab, setSelectedTab] = useState('staffTab'); // ipcc 속성정보 Tab 선택(기본: 일반정보)
  const [ipccUserMode, setIpccUserMode] = useState(null); // ipcc 속성정보 등록/수정 상태(각 센터별)(create, update)

  return (
    <>
      <Row>
        <Col span={15}>
          <ListComponent
            dispatch={dispatch}
            account={account}
            staff={staff}
            loading={loading}
            searchForm={searchForm}
            setComponentMode={setComponentMode}
            currentPath={currentPath}
            setSelectedTab={setSelectedTab}
          />
        </Col>
        <Col span={9} style={{ paddingLeft: '0.5rem' }}>
          <InputComponent
            dispatch={dispatch}
            account={account}
            staff={staff}
            loading={loading}
            searchForm={searchForm}
            componentMode={componentMode}
            setComponentMode={setComponentMode}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            ipccUserMode={ipccUserMode}
            setIpccUserMode={setIpccUserMode}
            currentPath={currentPath}
          />
        </Col>
      </Row>
    </>
  );
}

export default connect(state => {
  return {
    account: state.account,
    staff: state.staff,
    loading: {
      list: state.loading.effects['staff/list'],
      info: state.loading.effects['staff/info'],
      checkUserid: state.loading.effects['staff/checkUserid'],
      update: state.loading.effects['staff/update'],
      updatePassword: state.loading.effects['staff/updatePassword'],
      create: state.loading.effects['staff/create'],
      delete: state.loading.effects['staff/delete'],
      belongDepartment: state.loading.effects['staff/belongDepartment'],
      belongRole: state.loading.effects['staff/belongRole'],
      ipccCenter: {
        info: state.loading.effects['staff/ipccCenterInfo'],
      },
      ipccUser: {
        info: state.loading.effects['staff/ipccUserInfo'],
        checkedUserid: state.loading.effects['staff/ipccUserCheckedUserid'],
        checkedSippeerId: state.loading.effects['staff/ipccUserCheckSippeerId'],
        update: state.loading.effects['staff/ipccUserUpdate'],
        create: state.loading.effects['staff/ipccUserCreate'],
      },
    },
  };
})(Staff);
