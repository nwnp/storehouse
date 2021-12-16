import React, { useEffect, useState } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { Form, Input, InputNumber, Button, Popconfirm, Divider, Select, Switch, Alert } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { envConfig, getIpccCodeName } from '../../../../../../config/envConfig';
import { actionAuth } from '../../../../../utils/authUtils';
import * as globalUtils from '../../../../../utils/globalUtils';
import * as staffPropsFnc from '../../../StaffProps/functions';
import * as fnc from '../../functions';

const { TextArea } = Input;
const { Option } = Select;

function StaffPropsForm({ dispatch, center, staff, loading, currentPath, setSelectedTab }) {
  const [inputForm] = Form.useForm();

  // switch 체크값 처리
  const [checkedSwitch, setCheckedSwitch] = useState({});

  // staffPropsInfo 추출
  const getStaffPropsInfo = () => {
    const staffPropsList = staff.staffProps.list ? staff.staffProps.list.rowsData : [];
    let staffPropsInfo = null;

    for (let i = 0; i < staffPropsList.length; i += 1) {
      if (staffPropsList[i].centerId === center.id) {
        staffPropsInfo = staffPropsList[i];
      }
    }

    return staffPropsInfo;
  };
  const staffProps = {
    info: getStaffPropsInfo(),
  };
  const formType = staffProps.info ? 'update' : 'create';

  // form 초기화 실행
  const initFormExec = () => {
    if (formType === 'create') {
      inputForm.resetFields();
      inputForm.setFieldsValue({
        ...staffPropsFnc.initCreateParams,
        ...staffPropsFnc.initCheckedSwitch(),
        centerId: center.id,
        staffId: staff.info.id,
      });

      setCheckedSwitch({
        ...staffPropsFnc.initCheckedSwitch(),
      });
    } else if (formType === 'update') {
      const { info } = staffProps;
      inputForm.resetFields();
      inputForm.setFieldsValue({
        ...info,
        stchangedAt: globalUtils.getDateMoment(info.stchangedAt, 'ymdhms'),
        createdAt: globalUtils.getDateMoment(info.createdAt, 'ymdhms'),
      });

      setCheckedSwitch({
        ...staffPropsFnc.initCheckedSwitch(info),
      });
    }
  };

  useEffect(() => {
    console.log('Mounted StaffPropsForm', formType);

    initFormExec();

    return () => {
      console.log('Unmount StaffPropsForm', formType);
      initFormExec();
    };
  }, [staff.staffProps.created, staff.staffProps.updated, staff.staffProps.list]);

  // 등록/수정
  const [submitCreate, setSubmitCreate] = useState(false);
  const [submitUpdate, setSubmitUpdate] = useState(false);
  const onFinish = fields => {
    const body = {
      ...staffPropsFnc.setBody(formType, fields),
    };

    if (formType === 'create') {
      // 등록 실행
      fnc.createStaffPropsExec(body, dispatch, currentPath);
      setSubmitCreate(true);
    } else if (formType === 'update') {
      // 수정 실행
      const { id } = fields;
      fnc.updateStaffPropsExec(id, body, dispatch, currentPath);
      setSubmitUpdate(true);
    }
  };
  // 등록/수정 후 staffProps 다시 출력
  if (loading.staffProps.create === false && submitCreate === true) {
    setSubmitCreate(false);
    fnc.infoExecWithStaffProps(staff.info.id, dispatch, currentPath);
    setSelectedTab(`staffPropsTab-${center.id}`); // 현재 Tab 출력
  }
  if (loading.staffProps.update === false && submitUpdate === true) {
    setSubmitUpdate(false);
    fnc.infoExecWithStaffProps(staff.info.id, dispatch, currentPath);
    setSelectedTab(`staffPropsTab-${center.id}`); // 현재 Tab 출력
  }

  // 삭제
  const [submitDelete, setSubmitDelete] = useState(false);
  const onDelete = () => {
    setSubmitDelete(true);
    const { id } = staffProps.info;
    fnc.deleteStaffPropsExec(id, dispatch, currentPath);
  };
  // 삭제 후 staffProps 다시 출력
  if (loading.staffProps.delete === false && submitDelete === true) {
    setSubmitDelete(false);
    fnc.infoExecWithStaffProps(staff.info.id, dispatch, currentPath);
    setSelectedTab(`staffPropsTab-${center.id}`); // 현재 Tab 출력
  }

  // 등록/수정 취소
  const onCancel = () => {
    initFormExec();
  };

  // switch값 처리
  const onSwitch = field => {
    setCheckedSwitch({
      ...checkedSwitch,
      [field]: !checkedSwitch[field],
    });
  };

  return (
    <>
      {!staffProps.info && (
        <Alert
          message={formatMessage({ id: 'message.required.StaffProps.newAdd' })}
          type="info"
          showIcon
          closable
          style={{ marginBottom: '0.5rem' }}
        />
      )}
      <Form
        form={inputForm}
        name="info"
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
      >
        {formType === 'update' && (
          <Form.Item
            name="id"
            label={formatMessage({ id: 'component.StaffProps.column.id' })}
            rules={[{ required: true }]}
            hidden
          >
            <Input placeholder={formatMessage({ id: 'component.StaffProps.column.id' })} disabled />
          </Form.Item>
        )}
        <Form.Item
          name="centerId"
          label={formatMessage({ id: 'component.StaffProps.column.center' })}
          rules={[{ required: true }]}
          hidden
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="staffId"
          label={formatMessage({ id: 'component.StaffProps.column.staff' })}
          rules={[{ required: true }]}
          hidden
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label={formatMessage({ id: 'component.StaffProps.column.center' })}
          rules={[{ required: true }]}
        >
          <Input
            value={`${center.name} (${center.code})`}
            placeholder={formatMessage({ id: 'component.StaffProps.column.center' })}
            disabled
          />
        </Form.Item>
        <Form.Item
          label={formatMessage({ id: 'component.StaffProps.column.staff' })}
          rules={[{ required: true }]}
        >
          <Input
            value={`${staff.info.name} (${staff.info.userid})`}
            placeholder={formatMessage({ id: 'component.StaffProps.column.staff' })}
            disabled
          />
        </Form.Item>
        <Form.Item
          name="userid"
          label={formatMessage({ id: 'component.StaffProps.column.userid' })}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'message.required.StaffProps.userid' }),
            },
          ]}
        >
          <Input placeholder={formatMessage({ id: 'component.StaffProps.column.userid' })} />
        </Form.Item>
        <Form.Item
          name="sippeerId"
          label={formatMessage({ id: 'component.StaffProps.column.sippeerId' })}
        >
          <InputNumber
            size="small"
            placeholder={formatMessage({ id: 'component.StaffProps.column.sippeerId' })}
          />
        </Form.Item>
        <Form.Item
          name="extNext"
          label={formatMessage({ id: 'component.StaffProps.column.extNext' })}
        >
          <Input placeholder={formatMessage({ id: 'component.StaffProps.column.extNext' })} />
        </Form.Item>
        <Form.Item
          name="extRing"
          label={formatMessage({ id: 'component.StaffProps.column.extRing' })}
        >
          <InputNumber
            size="small"
            placeholder={formatMessage({ id: 'component.StaffProps.column.extRing' })}
          />
        </Form.Item>
        <Form.Item name="ext" label={formatMessage({ id: 'component.StaffProps.column.ext' })}>
          <Input placeholder={formatMessage({ id: 'component.StaffProps.column.ext' })} />
        </Form.Item>
        <Form.Item
          name="extMent"
          label={formatMessage({ id: 'component.StaffProps.column.extMent' })}
        >
          <Input placeholder={formatMessage({ id: 'component.StaffProps.column.extMent' })} />
        </Form.Item>
        <Form.Item name="cid" label={formatMessage({ id: 'component.StaffProps.column.cid' })}>
          <Input placeholder={formatMessage({ id: 'component.StaffProps.column.cid' })} />
        </Form.Item>
        {formType === 'update' && (
          <>
            <Form.Item label={formatMessage({ id: 'component.StaffProps.column.mode' })}>
              <Input
                defaultValue={getIpccCodeName('mode', staffProps.info.mode)}
                placeholder={formatMessage({ id: 'component.StaffProps.column.mode' })}
                disabled
              />
            </Form.Item>
            <Form.Item label={formatMessage({ id: 'component.StaffProps.column.smode' })} disabled>
              <Input
                value={getIpccCodeName('smode', staffProps.info.smode === true ? 1 : 0)}
                placeholder={formatMessage({ id: 'component.StaffProps.column.smode' })}
                disabled
              />
            </Form.Item>
            <Form.Item label={formatMessage({ id: 'component.StaffProps.column.state' })}>
              <Input
                value={getIpccCodeName('state', staffProps.info.state)}
                placeholder={formatMessage({ id: 'component.StaffProps.column.state' })}
                disabled
              />
            </Form.Item>
            <Form.Item
              name="mychannel"
              label={formatMessage({ id: 'component.StaffProps.column.mychannel' })}
            >
              <Input
                placeholder={formatMessage({ id: 'component.StaffProps.column.mychannel' })}
                disabled
              />
            </Form.Item>
            <Form.Item
              name="stchangedAt"
              label={formatMessage({ id: 'component.StaffProps.column.stchangedAt' })}
            >
              <Input
                placeholder={formatMessage({ id: 'component.StaffProps.column.stchangedAt' })}
                disabled
              />
            </Form.Item>
            <Form.Item name="uid" label={formatMessage({ id: 'component.StaffProps.column.uid' })}>
              <Input
                placeholder={formatMessage({ id: 'component.StaffProps.column.uid' })}
                disabled
              />
            </Form.Item>
          </>
        )}
        <Form.Item
          name="optInbIdleMode"
          label={formatMessage({ id: 'component.StaffProps.column.optInbIdleMode' })}
        >
          <Select
            size="small"
            placeholder={formatMessage({ id: 'component.StaffProps.column.optInbIdleMode' })}
          >
            {envConfig.ipcc.optInbIdleMode.map(codeValue => (
              <Option key={codeValue} value={codeValue}>
                {getIpccCodeName('mode', codeValue)}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="optOubIdleMode"
          label={formatMessage({ id: 'component.StaffProps.column.optOubIdleMode' })}
        >
          <Select
            size="small"
            placeholder={formatMessage({ id: 'component.StaffProps.column.optOubIdleMode' })}
          >
            {envConfig.ipcc.optOubIdleMode.map(codeValue => (
              <Option key={codeValue} value={codeValue}>
                {getIpccCodeName('mode', codeValue)}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="optPostNotReadyMode"
          label={formatMessage({ id: 'component.StaffProps.column.optPostNotReadyMode' })}
        >
          <Select
            size="small"
            placeholder={formatMessage({ id: 'component.StaffProps.column.optPostNotReadyMode' })}
          >
            {envConfig.ipcc.optPostNotReadyMode.map(codeValue => (
              <Option key={codeValue} value={codeValue}>
                {getIpccCodeName('mode', codeValue)}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="optAllowTxRingMode"
          label={formatMessage({ id: 'component.StaffProps.column.optAllowTxRingMode' })}
        >
          <Select
            size="small"
            placeholder={formatMessage({ id: 'component.StaffProps.column.optAllowTxRingMode' })}
          >
            {envConfig.ipcc.optAllowTxRingMode.map(codeValue => (
              <Option key={codeValue} value={codeValue}>
                {getIpccCodeName('optAllowTxRingMode', codeValue)}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="optObdPrefix"
          label={formatMessage({ id: 'component.StaffProps.column.optObdPrefix' })}
        >
          <Input placeholder={formatMessage({ id: 'component.StaffProps.column.optObdPrefix' })} />
        </Form.Item>
        <Form.Item
          name="cidovr"
          label={formatMessage({ id: 'component.StaffProps.column.cidovr' })}
        >
          <Switch
            size="small"
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={checkedSwitch.cidovr}
            onClick={() => onSwitch('cidovr')}
          />
        </Form.Item>
        <Form.Item
          name="inbBell"
          label={formatMessage({ id: 'component.StaffProps.column.inbBell' })}
        >
          <Switch
            size="small"
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={checkedSwitch.inbBell}
            onClick={() => onSwitch('inbBell')}
          />
        </Form.Item>
        <Form.Item
          name="showCid"
          label={formatMessage({ id: 'component.StaffProps.column.showCid' })}
        >
          <Switch
            size="small"
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={checkedSwitch.showCid}
            onClick={() => onSwitch('showCid')}
          />
        </Form.Item>
        <Form.Item name="noRec" label={formatMessage({ id: 'component.StaffProps.column.noRec' })}>
          <Switch
            size="small"
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={checkedSwitch.noRec}
            onClick={() => onSwitch('noRec')}
          />
        </Form.Item>
        {formType === 'update' && (
          <>
            <Form.Item
              name="rdrTel"
              label={formatMessage({ id: 'component.StaffProps.column.rdrTel' })}
            >
              <Input
                placeholder={formatMessage({ id: 'component.StaffProps.column.rdrTel' })}
                disabled
              />
            </Form.Item>
            <Form.Item label={formatMessage({ id: 'component.StaffProps.column.ansTyp' })}>
              <Input
                value={getIpccCodeName('ansTyp', staffProps.info.ansTyp === true ? 1 : 0)}
                placeholder={formatMessage({ id: 'component.StaffProps.column.ansTyp' })}
                disabled
              />
            </Form.Item>
          </>
        )}
        <Form.Item name="memo" label={formatMessage({ id: 'component.StaffProps.column.memo' })}>
          <TextArea
            rows={4}
            placeholder={formatMessage({ id: 'component.StaffProps.column.memo' })}
          />
        </Form.Item>
        {formType === 'update' && (
          <Form.Item
            name="createdAt"
            label={formatMessage({ id: 'component.StaffProps.column.createdAt' })}
          >
            <Input
              placeholder={formatMessage({ id: 'component.StaffProps.column.createdAt' })}
              disabled
            />
          </Form.Item>
        )}
        <Divider />
        {/* 버튼 */}
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button
            size="small"
            type="primary"
            htmlType="submit"
            loading={loading.staffProps[formType]}
          >
            {formatMessage({ id: `component.Button.action.${formType}` })}
          </Button>
          <Button size="small" onClick={onCancel}>
            {formatMessage({ id: 'component.Button.action.cancel' })}
          </Button>
          {formType === 'update' && (
            <Popconfirm
              title={formatMessage({ id: 'component.Confirm.delete' })}
              okType="danger"
              onConfirm={onDelete}
            >
              {actionAuth.delete(currentPath) && (
                <Button size="small" type="danger" loading={loading.staffProps.delete}>
                  {formatMessage({ id: 'component.Button.action.delete' })}
                </Button>
              )}
            </Popconfirm>
          )}
        </Form.Item>
      </Form>
    </>
  );
}

export default StaffPropsForm;
