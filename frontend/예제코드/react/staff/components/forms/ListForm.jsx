import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { actionAuth } from '../../../../../utils/authUtils';
import * as globalUtils from '../../../../../utils/globalUtils';
import { MetaTable } from '../../../../MetaComponent';

function ListForm({ loading, listData, pagination, onTableChange, onInfo, currentPath }) {
  // data columns
  const columns = [
    {
      title: formatMessage({ id: 'component.Staff.column.id' }),
      dataIndex: 'id',
      sorter: true,
    },
    {
      title: formatMessage({ id: 'component.Staff.column.centerIds' }),
      dataIndex: 'centers',
      render: value => (
        <>
          {value.map(center => center && center.name && <Tag key={center.id}>{center.name}</Tag>)}
        </>
      ),
    },
    {
      title: formatMessage({ id: 'component.Staff.column.userid' }),
      dataIndex: 'userid',
      sorter: true,
    },
    {
      title: formatMessage({ id: 'component.Staff.column.name' }),
      dataIndex: 'name',
      sorter: true,
    },
    // {
    //   title: formatMessage({ id: 'component.Staff.column.multiLogin' }),
    //   dataIndex: 'multiLogin',
    //   render: value => (
    //     <>
    //       {value === true ? (
    //         <CheckCircleOutlined style={{ color: '#52C41A' }} />
    //       ) : (
    //         <CloseCircleOutlined style={{ color: '#FF4D4F' }} />
    //       )}
    //     </>
    //   ),
    // },
    {
      title: formatMessage({ id: 'component.Staff.column.activate' }),
      dataIndex: 'activate',
      render: value => (
        <>
          {value === true ? (
            <CheckCircleOutlined style={{ color: '#52C41A' }} />
          ) : (
            <CloseCircleOutlined style={{ color: '#FF4D4F' }} />
          )}
        </>
      ),
    },
    {
      title: formatMessage({ id: 'component.Staff.column.lastLogin' }),
      dataIndex: 'lastLogin',
      render: value => <>{globalUtils.getDateMoment(value, 'ymdhms')}</>,
    },
    {
      title: formatMessage({ id: 'component.Staff.column.lastLogout' }),
      dataIndex: 'lastLogout',
      render: value => <>{globalUtils.getDateMoment(value, 'ymdhms')}</>,
    },
    {
      title: formatMessage({ id: 'component.Staff.column.createdAt' }),
      dataIndex: 'createdAt',
      render: value => <>{globalUtils.getDateMoment(value, 'ymdhms')}</>,
    },
    {
      title: formatMessage({ id: 'component.Staff.column.updatedAt' }),
      dataIndex: 'updatedAt',
      render: value => <>{globalUtils.getDateMoment(value, 'ymdhms')}</>,
    },
  ];

  return (
    <>
      <MetaTable
        loading={loading}
        columns={columns}
        dataSource={listData}
        onChange={onTableChange}
        pagination={pagination}
        onRow={record => {
          return {
            onClick: () => {
              if (actionAuth.update(currentPath)) {
                onInfo(record.id);
              }
            },
          };
        }}
      />
    </>
  );
}

export default ListForm;
