import React, { useEffect } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { Form, Input, InputNumber, Select, Switch, Alert, Button } from 'antd';
import {
  CloseOutlined,
  CheckOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { MetaForm } from '../../../../MetaComponent';

const { Option } = Select;

function IpccUserForm({
  staff,
  ipccUserMode,
  setIpccUserMode,
  ipccUserForm,
  initFormIpccUser,
  checkedSwitchIpccUser,
  setCheckedSwitchIpccUser,
  onSwitchIpccUser,
  onChangeIpccCenter,
  onCreateIpccUser,
  onUpdateIpccUser,
  onCheckIpccUserid,
  onCheckIpccUserSippeerId,
  loading,
}) {
  useEffect(() => {
    if (staff.ipccUser && staff.ipccUser.info && staff.ipccUser.info.userid) {
      // ipccUser정보가 등록된 경우
      setIpccUserMode('update'); // update모드로 진입

      // form데이터 세팅
      const { info } = staff.ipccUser;
      ipccUserForm.setFieldsValue({
        ...info,
        code: staff.ipccCenter.selected,
      });

      // switch 세팅
      setCheckedSwitchIpccUser({
        cidovr: info.cidovr,
        inb_bell: info.inb_bell,
        show_cid: info.show_cid,
        no_rec: info.no_rec,
        active: info.active,
      });

      // ipccUser정보가 없는 경우
    } else if (staff.ipccCenter && staff.ipccCenter.info && staff.ipccCenter.info.id) {
      // 1. ipccCenter정보가 있으면
      setIpccUserMode('create'); // create모드로 진입

      // form데이터 초기화
      initFormIpccUser(staff.ipccCenter.selected);
    } else {
      // 2. ipccCenter정보가 없으면
      setIpccUserMode(null);

      // form데이터 초기화
      initFormIpccUser(null);
    }

    return () => {
      initFormIpccUser(null);
    };
  }, [staff.ipccUser.info, staff.ipccCenter.info]);

  // CTI 아이디 중복 체크 값
  const { checkedUserid: checkedIpccUserid } = staff.ipccUser;

  // 내선번호 중복 체크 값
  const { checkedSippeerId: checkedIpccUserSippeerId } = staff.ipccUser;

  return (
    <>
      <MetaForm
        form={ipccUserForm}
        onFinish={
          (ipccUserMode === 'create' && onCreateIpccUser) ||
          (ipccUserMode === 'update' && onUpdateIpccUser)
        }
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        height={615}
      >
        <Form.Item
          name="centers"
          label={formatMessage({ id: 'component.IpccUser.column.centers' })}
        >
          <Select
            size="small"
            onChange={onChangeIpccCenter}
            defaultValue={staff.ipccCenter.selected}
            placeholder={formatMessage({ id: 'component.IpccUser.column.centers' })}
          >
            {staff.info &&
              staff.info.centers &&
              staff.info.centers.length > 0 &&
              staff.info.centers.map(center =>
                center.channel.find(data => data === 'voice') ? (
                  // 채널에서 voice가 있는 것만 ipcc등록이 가능하다.
                  <Option key={center.id} value={center.code}>
                    {center.name} ({center.code})
                  </Option>
                ) : null,
              )}
          </Select>
        </Form.Item>
        {/* {!staff.ipccCenter.selected && (
          <Alert
            message={formatMessage({ id: 'message.required.IpccCenter.selected' })}
            type="warning"
            showIcon
            closable
          />
        )} */}
        {loading.ipccCenter.info === false &&
          ipccUserMode === null &&
          staff.ipccCenter.selected && (
            <Alert
              message={formatMessage({ id: 'message.required.IpccCenter' })}
              type="warning"
              showIcon
              closable
            />
          )}
        {/* {loading.ipccUser.info === false && ipccUserMode === 'create' && (
          <Alert
            message={formatMessage({ id: 'message.required.IpccUser' })}
            type="info"
            showIcon
            closable
          />
        )} */}
        {ipccUserMode !== null && (
          <>
            <Form.Item
              name="code"
              label={formatMessage({ id: 'component.IpccUser.column.code' })}
              rules={[{ required: true }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="staff_userid"
              label={formatMessage({ id: 'component.IpccUser.column.staffUserid' })}
              rules={[{ required: true }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="name"
              label={formatMessage({ id: 'component.IpccUser.column.name' })}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label={formatMessage({ id: 'component.IpccUser.column.userid' })}>
              <Input.Group>
                <Form.Item name="userid" noStyle>
                  <Input
                    maxLength={20}
                    style={{ width: '40%' }}
                    placeholder={formatMessage({ id: 'component.IpccUser.column.userid' })}
                  />
                </Form.Item>
                <Form.Item noStyle>
                  <Button
                    style={{ marginLeft: '0.5rem' }}
                    size="small"
                    onClick={() =>
                      onCheckIpccUserid(
                        ipccUserForm.getFieldValue('userid'),
                        ipccUserForm.getFieldValue('code'),
                      )
                    }
                  >
                    {loading.ipccUser.checkedUserid && (
                      <span style={{ marginRight: '0.5rem' }}>
                        <LoadingOutlined />
                      </span>
                    )}
                    <span>{formatMessage({ id: 'component.Button.action.dupcheck' })}</span>
                  </Button>
                </Form.Item>
                <Form.Item noStyle>
                  {checkedIpccUserid && checkedIpccUserid.result === true && (
                    <span style={{ marginLeft: '0.5rem' }}>
                      <CheckCircleOutlined style={{ color: '#52C41A' }} />
                      {formatMessage({ id: 'message.info.dupChecked.available' })}
                    </span>
                  )}
                  {checkedIpccUserid && checkedIpccUserid.result === false && (
                    <span style={{ marginLeft: '0.5rem' }}>
                      <CloseCircleOutlined style={{ color: '#FF4D4F' }} />
                      {formatMessage({ id: 'message.info.dupChecked.notAvailable' })}
                    </span>
                  )}
                </Form.Item>
              </Input.Group>
            </Form.Item>
            <Form.Item label={formatMessage({ id: 'component.IpccUser.column.sippeerId' })}>
              <Input.Group>
                <Form.Item name="sippeer_id" noStyle>
                  <Input
                    maxLength={5}
                    style={{ width: '40%' }}
                    placeholder={formatMessage({ id: 'component.IpccUser.column.sippeerId' })}
                  />
                </Form.Item>
                <Form.Item noStyle>
                  <Button
                    style={{ marginLeft: '0.5rem' }}
                    size="small"
                    onClick={() =>
                      onCheckIpccUserSippeerId(
                        ipccUserForm.getFieldValue('sippeer_id'),
                        ipccUserForm.getFieldValue('code'),
                      )
                    }
                  >
                    {loading.ipccUser.checkedSippeerId && (
                      <span style={{ marginRight: '0.5rem' }}>
                        <LoadingOutlined />
                      </span>
                    )}
                    <span>{formatMessage({ id: 'component.Button.action.dupcheck' })}</span>
                  </Button>
                </Form.Item>
                <Form.Item noStyle>
                  {checkedIpccUserSippeerId && checkedIpccUserSippeerId.result === true && (
                    <span style={{ marginLeft: '0.5rem' }}>
                      <CheckCircleOutlined style={{ color: '#52C41A' }} />
                      {formatMessage({ id: 'message.info.dupChecked.available' })}
                    </span>
                  )}
                  {checkedIpccUserSippeerId && checkedIpccUserSippeerId.result === false && (
                    <span style={{ marginLeft: '0.5rem' }}>
                      <CloseCircleOutlined style={{ color: '#FF4D4F' }} />
                      {formatMessage({ id: 'message.info.dupChecked.notAvailable' })}
                    </span>
                  )}
                </Form.Item>
              </Input.Group>
            </Form.Item>
            <Form.Item name="ext" label={formatMessage({ id: 'component.IpccUser.column.ext' })}>
              <Input
                maxLength={14}
                placeholder={formatMessage({ id: 'component.IpccUser.column.ext' })}
              />
            </Form.Item>
            <Form.Item
              name="ext_next"
              label={formatMessage({ id: 'component.IpccUser.column.extNext' })}
            >
              <Input
                maxLength={14}
                placeholder={formatMessage({ id: 'component.IpccUser.column.extNext' })}
              />
            </Form.Item>
            <Form.Item
              name="ext_ring"
              label={formatMessage({ id: 'component.IpccUser.column.extRing' })}
            >
              <InputNumber
                size="small"
                placeholder={formatMessage({ id: 'component.IpccUser.column.extRing' })}
              />
            </Form.Item>
            <Form.Item
              name="ext_ment"
              label={formatMessage({ id: 'component.IpccUser.column.extMent' })}
            >
              <Input
                maxLength={100}
                placeholder={formatMessage({ id: 'component.IpccUser.column.extMent' })}
              />
            </Form.Item>
            <Form.Item name="cid" label={formatMessage({ id: 'component.IpccUser.column.cid' })}>
              <Input
                maxLength={20}
                placeholder={formatMessage({ id: 'component.IpccUser.column.cid' })}
              />
            </Form.Item>
            <Form.Item
              name="cidovr"
              label={formatMessage({ id: 'component.IpccUser.column.cidovr' })}
            >
              <Switch
                size="small"
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                checked={checkedSwitchIpccUser.cidovr}
                onClick={() => onSwitchIpccUser('cidovr')}
              />
            </Form.Item>
            <Form.Item
              name="inb_bell"
              label={formatMessage({ id: 'component.IpccUser.column.inbBell' })}
            >
              <Switch
                size="small"
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                checked={checkedSwitchIpccUser.inb_bell}
                onClick={() => onSwitchIpccUser('inb_bell')}
              />
            </Form.Item>
            <Form.Item
              name="show_cid"
              label={formatMessage({ id: 'component.IpccUser.column.showCid' })}
            >
              <Switch
                size="small"
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                checked={checkedSwitchIpccUser.show_cid}
                onClick={() => onSwitchIpccUser('show_cid')}
              />
            </Form.Item>
            <Form.Item
              name="no_rec"
              label={formatMessage({ id: 'component.IpccUser.column.noRec' })}
            >
              <Switch
                size="small"
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                checked={checkedSwitchIpccUser.no_rec}
                onClick={() => onSwitchIpccUser('no_rec')}
              />
            </Form.Item>
            <Form.Item
              name="active"
              label={formatMessage({ id: 'component.IpccUser.column.active' })}
            >
              <Switch
                size="small"
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                checked={checkedSwitchIpccUser.active}
                onClick={() => onSwitchIpccUser('active')}
              />
            </Form.Item>
          </>
        )}
      </MetaForm>
    </>
  );
}

export default IpccUserForm;
