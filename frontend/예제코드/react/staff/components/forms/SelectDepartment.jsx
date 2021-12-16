import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { Select, TreeSelect } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import * as globalUtils from '../../../../../utils/globalUtils';
import * as fnc from '../../functions';

const { Option } = Select;

function SelectDepartment({ staff, loading, selectedCenter, onSelectBelong }) {
  // get list
  const { departmentList } = staff.belong;

  // make treeData
  const treeData =
    selectedCenter && selectedCenter.id > 0
      ? globalUtils.makeTreeData(
          selectedCenter.name,
          departmentList ? departmentList.rowsData : [],
          { icon: null },
        )
      : [];

  return (
    <>
      {loading.belongDepartment === true ? (
        <Select
          size="small"
          value=""
          placeholder={formatMessage({ id: 'component.Staff.column.belong.department' })}
        >
          <Option value="">
            <LoadingOutlined />
          </Option>
        </Select>
      ) : (
        <>
          {staff.belong.departmentList.rowsData ? (
            <TreeSelect
              size="small"
              treeDefaultExpandAll
              treeData={treeData}
              allowClear
              multiple
              onChange={ids =>
                onSelectBelong.department(fnc.getJsonList4Belong(ids, staff.belong.departmentList))
              }
              placeholder={formatMessage({ id: 'component.Staff.column.belong.department' })}
            />
          ) : (
            <Select
              size="small"
              placeholder={formatMessage({ id: 'component.Staff.column.belong.department' })}
            />
          )}
        </>
      )}
    </>
  );
}

export default SelectDepartment;
