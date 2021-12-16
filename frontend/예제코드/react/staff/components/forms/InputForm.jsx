import React, { useEffect } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { Form, Input, Switch, Button, Divider, Select, Tag, Radio, Upload, Alert } from 'antd';
import {
  CloseOutlined,
  CheckOutlined,
  PlusOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  DownloadOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { MetaForm } from '../../../../MetaComponent';
import * as globalUtils from '../../../../../utils/globalUtils';
import SelectDepartment from './SelectDepartment';
import SelectRole from './SelectRole';
import ModalPassword from './ModalPassword';

const { Password } = Input;
const { Option } = Select;

function InputForm({
  componentMode,
  inputForm,
  createMode,
  setCreateMode,
  staffsFileUploadProps,
  buttonUploadStaffsDisabled,
  staffsFileSampleDownload,
  onCreate,
  onUpdate,
  onCheckUserid,
  selectedCenter,
  belongList,
  onStaffBelong,
  onSelectBelong,
  passwordModal,
  setPasswordModal,
  updatePasswordForm,
  onUpdatePassword,
  loading,
  account,
  staff,
}) {
  useEffect(() => {
    return () => {
      setCreateMode('single');
    };
  }, [staff.info, staff.updated, staff.created, staff.deleted]);

  // 아이디 중복 체크 값
  const { checkedUserid } = staff;

  return (
    <>
      <MetaForm
        form={inputForm}
        onFinish={
          (componentMode === 'create' && onCreate) || (componentMode === 'update' && onUpdate)
        }
        height={615}
      >
        {componentMode === 'create' && (
          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 18,
            }}
          >
            <Radio.Group
              onChange={e => {
                setCreateMode(e.target.value);
              }}
              value={createMode}
            >
              <Radio value="single">
                {formatMessage({ id: 'component.Staff.createMode.single' })}
              </Radio>
              <Radio value="bulk">{formatMessage({ id: 'component.Staff.createMode.bulk' })}</Radio>
            </Radio.Group>
          </Form.Item>
        )}
        {componentMode === 'update' && (
          <Form.Item
            name="id"
            label={formatMessage({ id: 'component.Staff.column.id' })}
            rules={[{ required: true }]}
          >
            <Input placeholder={formatMessage({ id: 'component.Staff.column.id' })} disabled />
          </Form.Item>
        )}
        {createMode === 'bulk' && (
          <>
            <Alert
              message={formatMessage({ id: 'message.information.Staff.staffsFile.description' })}
              type="info"
              showIcon
              style={{ marginBottom: '1rem' }}
            />
            <Form.Item label={formatMessage({ id: 'component.Staff.column.staffsFile.sample' })}>
              <Button
                onClick={() => staffsFileSampleDownload()}
                icon={<DownloadOutlined />}
                size="small"
              >
                {formatMessage({ id: 'component.Button.action.download' })}
              </Button>
            </Form.Item>
            <Form.Item
              name="staffsFile"
              label={formatMessage({ id: 'component.Staff.column.staffsFile' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'message.required.Staff.staffsFile' }),
                },
              ]}
            >
              <Upload {...staffsFileUploadProps}>
                <Button
                  icon={<UploadOutlined />}
                  size="small"
                  disabled={buttonUploadStaffsDisabled}
                >
                  {formatMessage({ id: 'component.Button.action.upload' })}
                </Button>
              </Upload>
            </Form.Item>
          </>
        )}
        {createMode === 'single' && (
          <Form.Item label={formatMessage({ id: 'component.Staff.column.userid' })} required>
            <Input.Group>
              <Form.Item
                name="userid"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'message.required.Staff.userid' }),
                  },
                ]}
                noStyle
              >
                <Input
                  maxLength={50}
                  style={{ width: '40%' }}
                  placeholder={formatMessage({ id: 'component.Staff.column.userid' })}
                  disabled={componentMode === 'update'}
                />
              </Form.Item>
              {componentMode === 'create' && (
                <>
                  <Form.Item noStyle>
                    <Button
                      style={{ marginLeft: '0.5rem' }}
                      size="small"
                      onClick={() => onCheckUserid(inputForm.getFieldValue('userid'))}
                    >
                      {loading.checkUserid && (
                        <span style={{ marginRight: '0.5rem' }}>
                          <LoadingOutlined />
                        </span>
                      )}
                      <span>{formatMessage({ id: 'component.Button.action.dupcheck' })} </span>
                    </Button>
                  </Form.Item>
                  <Form.Item noStyle>
                    {checkedUserid && checkedUserid.isAvailable === true && (
                      <span style={{ marginLeft: '0.5rem' }}>
                        <CheckCircleOutlined style={{ color: '#52C41A' }} />
                        {formatMessage({ id: 'message.info.dupChecked.available' })}
                      </span>
                    )}
                    {checkedUserid && checkedUserid.isAvailable === false && (
                      <span style={{ marginLeft: '0.5rem' }}>
                        <CloseCircleOutlined style={{ color: '#FF4D4F' }} />
                        {formatMessage({ id: 'message.info.dupChecked.notAvailable' })}
                      </span>
                    )}
                  </Form.Item>
                </>
              )}
            </Input.Group>
          </Form.Item>
        )}
        {createMode === 'single' && (
          <Form.Item
            name="name"
            label={formatMessage({ id: 'component.Staff.column.name' })}
            rules={[
              { required: true, message: formatMessage({ id: 'message.required.Staff.name' }) },
            ]}
          >
            <Input
              maxLength={50}
              placeholder={formatMessage({ id: 'component.Staff.column.name' })}
            />
          </Form.Item>
        )}
        {componentMode === 'create' && createMode === 'single' && (
          <>
            <Form.Item
              name="password"
              label={formatMessage({ id: 'component.Staff.column.password' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'message.required.Staff.password' }),
                },
                () => ({
                  validator(rule, value) {
                    if (globalUtils.passwordValidator(value)) {
                      return Promise.resolve();
                    }

                    // eslint-disable-next-line prefer-promise-reject-errors
                    return Promise.reject(
                      formatMessage({ id: 'message.required.Staff.passwordValidator' }),
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <Password
                maxLength={50}
                placeholder={formatMessage({ id: 'component.Staff.column.password' })}
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              label={formatMessage({ id: 'component.Staff.column.confirmPassword' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'message.required.Staff.confirmPassword' }),
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    // eslint-disable-next-line prefer-promise-reject-errors
                    return Promise.reject(
                      formatMessage({ id: 'message.required.Staff.noMatchPassword' }),
                    );
                  },
                }),
              ]}
            >
              <Password
                maxLength={50}
                placeholder={formatMessage({ id: 'component.Staff.column.confirmPassword' })}
              />
            </Form.Item>
          </>
        )}
        {createMode === 'single' && (
          <>
            <Form.Item
              name="email"
              label={formatMessage({ id: 'component.Staff.column.email' })}
              rules={[
                {
                  type: 'email',
                  message: formatMessage({ id: 'message.typeCheck.email' }),
                },
              ]}
            >
              <Input
                maxLength={255}
                placeholder={formatMessage({ id: 'component.Staff.column.email' })}
              />
            </Form.Item>
            <Form.Item name="mobile" label={formatMessage({ id: 'component.Staff.column.mobile' })}>
              <Input
                maxLength={20}
                placeholder={formatMessage({ id: 'component.Staff.column.mobile' })}
              />
            </Form.Item>
          </>
        )}
        {componentMode === 'update' && (
          <>
            <Form.Item label={formatMessage({ id: 'component.Staff.column.password' })}>
              <Button size="small" onClick={() => setPasswordModal(true)} danger>
                {formatMessage({ id: 'component.Staff.column.updatePassword' })}
              </Button>
            </Form.Item>
            <Form.Item
              name="multiLogin"
              label={formatMessage({ id: 'component.Staff.column.multiLogin' })}
              rules={[{ required: true }]}
              hidden
            >
              <Switch
                size="small"
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked={staff.info && staff.info.multiLogin}
              />
            </Form.Item>
            <Form.Item
              name="activate"
              label={formatMessage({ id: 'component.Staff.column.activate' })}
              rules={[{ required: true }]}
            >
              <Switch
                size="small"
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked={staff.info && staff.info.activate}
              />
            </Form.Item>
            <Form.Item
              name="lastLogin"
              label={formatMessage({ id: 'component.Staff.column.lastLogin' })}
            >
              <Input
                placeholder={formatMessage({ id: 'component.Staff.column.lastLogin' })}
                disabled
              />
            </Form.Item>
            <Form.Item
              name="lastLogout"
              label={formatMessage({ id: 'component.Staff.column.lastLogout' })}
            >
              <Input
                placeholder={formatMessage({ id: 'component.Staff.column.lastLogout' })}
                disabled
              />
            </Form.Item>
            <Form.Item
              name="updatedPassword"
              label={formatMessage({ id: 'component.Staff.column.updatedPassword' })}
            >
              <Input
                placeholder={formatMessage({ id: 'component.Staff.column.updatedPassword' })}
                disabled
              />
            </Form.Item>
            <Form.Item
              name="createdAt"
              label={formatMessage({ id: 'component.Staff.column.createdAt' })}
            >
              <Input
                placeholder={formatMessage({ id: 'component.Staff.column.createdAt' })}
                disabled
              />
            </Form.Item>
            <Form.Item
              name="updatedAt"
              label={formatMessage({ id: 'component.Staff.column.updatedAt' })}
            >
              <Input
                placeholder={formatMessage({ id: 'component.Staff.column.updatedAt' })}
                disabled
              />
            </Form.Item>
          </>
        )}
        {/* 소속 센터 정보 */}
        <Form.Item
          name="centerIds"
          label={formatMessage({ id: 'component.Staff.column.centerIds' })}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'message.required.Staff.centerIds' }),
            },
          ]}
          hidden={belongList.length > 0}
        >
          <Input
            name="centerIds"
            placeholder={formatMessage({ id: 'component.Staff.column.centerIds' })}
            disabled
          />
        </Form.Item>
        <Form.Item
          name="departmentIds"
          label={formatMessage({ id: 'component.Staff.column.departmentIds' })}
          hidden
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="roleIds"
          label={formatMessage({ id: 'component.Staff.column.roleIds' })}
          hidden
        >
          <Input disabled />
        </Form.Item>
        {belongList.length > 0 && <Divider />}
        {/* 선택된 소속 정보 */}
        {belongList.map((belong, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`div-${index}`}>
            <h3>
              {formatMessage({ id: 'component.Staff.column.belong' })}
              {belongList.length > 1 && <>{`(${index + 1})`}</>}
              <Button
                // style={{ marginLeft: belongList.length > 1 ? '7px' : '28px', height: '22px' }}
                style={{ marginLeft: '0.5rem' }}
                size="small"
                type="dashed"
                onClick={() => onStaffBelong.remove(index)}
                danger
              >
                <DeleteOutlined /> {formatMessage({ id: 'component.Button.action.delete' })}
              </Button>
            </h3>
            <Form.Item
              // eslint-disable-next-line react/no-array-index-key
              key={`belongCenter${index}-${belong.center.id}`}
              label={formatMessage({ id: 'component.Staff.column.centerIds' })}
              style={{ marginBottom: '0px' }}
            >
              <Tag>{belong.center.name}</Tag>
            </Form.Item>
            <Form.Item
              // eslint-disable-next-line react/no-array-index-key
              key={`belongDepartment${index}-${belong.center.id}`}
              label={formatMessage({ id: 'component.Staff.column.departmentIds' })}
              style={{ marginBottom: '0px' }}
            >
              {belong.departments.map(department => (
                // eslint-disable-next-line react/no-array-index-key
                <Tag key={`department-tag${index}-${department.id}`}>{department.name}</Tag>
              ))}
            </Form.Item>
            <Form.Item
              // eslint-disable-next-line react/no-array-index-key
              key={`belongRole${index}-${belong.center.id}`}
              label={formatMessage({ id: 'component.Staff.column.belong.role' })}
              style={{ marginBottom: '0px' }}
            >
              {belong.roles.map(role => (
                // eslint-disable-next-line react/no-array-index-key
                <Tag key={`role-tag${index}-${role.id}`}>{role.name}</Tag>
              ))}
            </Form.Item>
            {index + 1 < belongList.length && <Divider dashed />}
          </div>
        ))}
        {/* 소속 정보 선택 */}
        <Divider dashed plain>
          {formatMessage({ id: 'message.required.Staff.belong' })}
        </Divider>
        <h3>{formatMessage({ id: 'component.Staff.column.belong.select' })}</h3>
        <Form.Item
          name="selectCenter"
          label={formatMessage({ id: 'component.Staff.column.belong.center' })}
          style={{ marginBottom: '12px' }}
        >
          <Select
            size="small"
            onChange={onSelectBelong.center}
            placeholder={formatMessage({ id: 'component.Staff.column.belong.center' })}
          >
            {account.userInfo.centers.map(center => (
              <Option key={center.id} value={center.id}>
                {center.name} ({center.code})
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="selectDepartment"
          label={formatMessage({ id: 'component.Staff.column.belong.department' })}
          style={{ marginBottom: '12px' }}
        >
          <SelectDepartment
            staff={staff}
            loading={loading}
            selectedCenter={selectedCenter === null ? { id: '', name: '' } : selectedCenter}
            onSelectBelong={onSelectBelong}
          />
        </Form.Item>
        <Form.Item
          name="selectRole"
          label={formatMessage({ id: 'component.Staff.column.belong.role' })}
          style={{ marginBottom: '12px' }}
        >
          <SelectRole staff={staff} loading={loading} onSelectBelong={onSelectBelong} />
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button size="small" type="dashed" onClick={onStaffBelong.add} block>
            <PlusOutlined /> {formatMessage({ id: 'component.Button.action.selected.input' })}
          </Button>
        </Form.Item>
      </MetaForm>

      {/* 비밀번호 수정 모달 */}
      <ModalPassword
        passwordModal={passwordModal}
        setPasswordModal={setPasswordModal}
        updatePasswordForm={updatePasswordForm}
        onUpdatePassword={onUpdatePassword}
        loading={loading}
      />
    </>
  );
}

export default InputForm;
