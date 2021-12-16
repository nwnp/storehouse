import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import * as fnc from '../../functions';

const { Option } = Select;

function SelectRole({ staff, loading, onSelectBelong }) {
  // get list
  const { roleList } = staff.belong;

  return (
    <>
      {loading.belongDepartment === true || loading.belongRole === true ? (
        <Select
          size="small"
          value=""
          placeholder={formatMessage({ id: 'component.Staff.column.belong.role' })}
        >
          <Option value="">
            <LoadingOutlined />
          </Option>
        </Select>
      ) : (
        <>
          {staff.belong.roleList.rowsData ? (
            <Select
              size="small"
              mode="multiple"
              defaultValue={[]}
              allowClear
              onChange={ids =>
                onSelectBelong.role(fnc.getJsonList4Belong(ids, staff.belong.roleList))
              }
              placeholder={formatMessage({ id: 'component.Staff.column.belong.role' })}
            >
              {roleList.rowsData.map(role => (
                <Option key={role.id} value={role.id}>
                  {role.name}
                </Option>
              ))}
            </Select>
          ) : (
            <Select
              size="small"
              placeholder={formatMessage({ id: 'component.Staff.column.belong.role' })}
            />
          )}
        </>
      )}
    </>
  );
}

export default SelectRole;
