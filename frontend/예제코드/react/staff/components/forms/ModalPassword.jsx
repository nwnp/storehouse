import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { Form, Input, Button, Divider, Modal } from 'antd';
import { FormOutlined, UndoOutlined } from '@ant-design/icons';
import * as globalUtils from '../../../../../utils/globalUtils';

const { Password } = Input;

function ModalPassword({
  passwordModal,
  setPasswordModal,
  updatePasswordForm,
  onUpdatePassword,
  loading,
}) {
  return (
    <Modal
      title={formatMessage({ id: 'component.Staff.column.updatePassword' })}
      visible={passwordModal}
      onCancel={() => setPasswordModal(false)}
      footer={null}
    >
      <Form
        form={updatePasswordForm}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 15 }}
        colon={false}
        onFinish={onUpdatePassword}
      >
        <Form.Item
          name="id"
          label={formatMessage({ id: 'component.Staff.column.id' })}
          rules={[{ required: true }]}
          hidden
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label={formatMessage({ id: 'component.Staff.column.newPassword' })}
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
          name="confirmNewPassword"
          dependencies={['newPassword']}
          hasFeedback
          label={formatMessage({ id: 'component.Staff.column.confirmNewPassword' })}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'message.required.Staff.confirmPassword' }),
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('newPassword') === value) {
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
        <Divider />
        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 15,
          }}
          style={{ textAlign: 'right', marginBottom: 0 }}
        >
          <Button
            type="primary"
            htmlType="submit"
            icon={<FormOutlined />}
            loading={loading.updatePassword}
            size="small"
          >
            {formatMessage({ id: 'component.Button.action.update' })}
          </Button>
          <Button onClick={() => setPasswordModal(false)} icon={<UndoOutlined />} size="small">
            {formatMessage({ id: 'component.Button.action.cancel' })}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalPassword;
