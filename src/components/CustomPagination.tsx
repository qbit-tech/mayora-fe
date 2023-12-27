import { Col, Pagination, Select, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { IconArrowDown } from '../assets/icons';
import { PAGE_SIZE_OPTIONS } from '../helpers/constant';

type Props = {
  data: any[];
  pagination: {
    page: number;
    perPage: number;
    totalData: number;
  };
  changeLimit: any;
  changePage: any;
};
export default function CustomPagination(props: Props) {
  return (
    <Col span={24} className="flex items-center justify-between mt-3">
      <div style={{ gap: 8, display: 'flex', alignItems: 'center' }}>
        <Typography.Text className="text-3 text-gray">Per Row</Typography.Text>{' '}
        <Select
          defaultValue={+PAGE_SIZE_OPTIONS[0]}
          style={{ width: 65, marginRight: 8 }}
          onChange={(e) => {
            props.changeLimit(+e);
          }}
          options={PAGE_SIZE_OPTIONS.map((size) => ({
            value: +size,
            label: size,
          }))}
          suffixIcon={<IconArrowDown />}
        />
        <Typography.Text className="text-3 text-gray">
          Showing{' '}
          {props.pagination.page === 1
            ? 1
            : (props.pagination.page - 1) * props.pagination.perPage}{' '}
          to {props.pagination.perPage * props.pagination.page} from{' '}
          {props.pagination.totalData} results
        </Typography.Text>
      </div>
      <CPagination
        current={props.pagination.page}
        pageSize={props.pagination.perPage}
        onChange={props.changePage}
        total={props.pagination.totalData}
      />
    </Col>
  );
}

const CPagination = styled(Pagination)`
  .ant-pagination-options {
    display: none;
  }
`;
