import React, { useEffect } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { Form, Button, Input, Select, Row, Col } from 'antd';
import { PlusOutlined, SearchOutlined, ReloadOutlined, LockOutlined } from '@ant-design/icons';
import { actionAuth } from '../../../../utils/authUtils';
import { MetaCard } from '../../../MetaComponent';
import * as fnc from '../functions';
import ListForm from './forms/ListForm';

const { Option } = Select;

function ListComponent(props) {
  const {
    dispatch,
    account,
    staff,
    loading,
    searchForm,
    setComponentMode,
    currentPath,
    setSelectedTab,
  } = props;
  const { pagination } = staff.search;

  useEffect(() => {
    // 최초 검색 실행
    if (actionAuth.search(currentPath)) {
      onReset();
    }
  }, []);

  // get list
  const { list } = staff;
  const listData = list && list.rowsData ? list.rowsData : [];

  // 페이징, 정렬 처리
  const onTableChange = (paging, filters, sorter) => {
    const searchParams = fnc.setSearchParams(account, searchForm.getFieldsValue(), paging, sorter);
    fnc.searchExec(searchParams, dispatch, paging, currentPath);
  };
  // 검색 실행
  const onSearch = fields => {
    const paging = {
      ...pagination,
      current: 1,
    };
    const searchParams = fnc.setSearchParams(account, fields, paging);
    fnc.searchExec(searchParams, dispatch, paging, currentPath);
  };
  // 검색 초기화
  const onReset = () => {
    fnc.initSearchForm(searchForm);
    const paging = {
      ...pagination,
      current: 1,
    };
    const searchParams = fnc.setSearchParams(account, fnc.initRequestParams, paging);
    fnc.searchExec(searchParams, dispatch, paging, currentPath);
  };

  // 신규 등록 폼
  const onNewAdd = () => {
    fnc.clearInfoExec(dispatch);
    setComponentMode('create');
    setSelectedTab('staffTab');
  };

  // 상세 정보 폼
  const onInfo = async id => {
    fnc.clearIpccInfoExec(dispatch); // ipcc관련 정보 초기화

    fnc.infoExec(id, dispatch, currentPath);
    setComponentMode('update');
    setSelectedTab('staffTab');
  };

  return (
    <>
      <MetaCard
        title={formatMessage({ id: 'component.Staff.title.list' })}
        extra={
          actionAuth.create(currentPath) && (
            <>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => onNewAdd()}
                size="small"
              >
                {formatMessage({ id: 'component.Button.addNew' })}
              </Button>
            </>
          )
        }
      >
        {actionAuth.search(currentPath) ? (
          <>
            <Form form={searchForm} name="search" onFinish={onSearch} size="small">
              <Row>
                <Col span={4}>
                  {/* 센터 검색 */}
                  <Form.Item name="centerIds">
                    <Select>
                      <Option key="centerAll" value="">
                        {formatMessage({ id: 'component.Staff.search.center' })}
                      </Option>
                      {account.userInfo.centers.map(center => (
                        <Option key={center.id} value={center.id}>
                          {center.name} ({center.code})
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={4} style={{ marginLeft: '0.5rem' }}>
                  {/* 활성화 검색 */}
                  <Form.Item name="activate">
                    <Select>
                      <Option value="">
                        {formatMessage({ id: 'component.Staff.search.selectActivate' })}
                      </Option>
                      <Option value="true">
                        {formatMessage({ id: 'component.Staff.search.activate' })}
                      </Option>
                      <Option value="false">
                        {formatMessage({ id: 'component.Staff.search.diactivate' })}
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={3} style={{ marginLeft: '0.5rem' }}>
                  {/* 선택 검색 - field */}
                  <Form.Item name="srchField">
                    <Select>
                      <Option value="name">
                        {formatMessage({ id: 'component.Staff.column.name' })}
                      </Option>
                      <Option value="userid">
                        {formatMessage({ id: 'component.Staff.column.userid' })}
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  {/* 선택 검색 - value */}
                  <Form.Item name="srchValue">
                    <Input placeholder={formatMessage({ id: 'component.Input.search' })} />
                  </Form.Item>
                </Col>
                <Col span={4} style={{ marginLeft: '0.5rem' }}>
                  {/* 검색 버튼 */}
                  <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                    {formatMessage({ id: 'component.Button.action.search' })}
                  </Button>
                  <Button icon={<ReloadOutlined />} onClick={onReset}>
                    {formatMessage({ id: 'component.Button.action.reset' })}
                  </Button>
                </Col>
              </Row>
            </Form>
            <ListForm
              loading={loading.list}
              listData={listData}
              pagination={pagination}
              onTableChange={onTableChange}
              onInfo={onInfo}
              currentPath={currentPath}
            />
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <LockOutlined style={{ fontSize: '2rem' }} />
          </div>
        )}
      </MetaCard>
    </>
  );
}

export default ListComponent;
