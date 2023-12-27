import {
  Button,
  Col,
  Input,
  Modal,
  Row,
  Select,
  Switch,
  Table,
  Typography,
} from 'antd';
import React, {  } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomPagination from '../../components/CustomPagination';
import HeaderSection from '../../components/HeaderSection';
import { formatYearToTime, PAGE_SIZE_OPTIONS } from '../../helpers/constant';
import useFetchList from '../../hooks/useFetchList';
import { LogBCInputProps, initialBCInput } from '../../types/logs_bc_input.type';
import ReactJson from 'react-json-view';
import { IconArrowDown } from '../../assets/icons';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function IntegrationBC() {
  const navigate = useNavigate();
  const {
    isLoading,
    data,
    pagination,
    setData,
    setSearch,
    fetchList,
    setQuery,
    changePage,
    changeLimit,
  } = useFetchList<LogBCInputProps>({
    endpoint: 'logs_bc_input',
    limit: 15,
    initialQuery: {
      otherSystemOnly: 1,
    }
  });
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [isModalVisibleDelete, setIsModalVisibleDelete] =
    React.useState<boolean>(false);
  const [isModalVisibleDetail, setIsModalVisibleDetail] =
    React.useState<boolean>(false);
  const [tmpData, setTmpData] = React.useState<LogBCInputProps>({...initialBCInput});
  const [isLoadingUpdateStatus, setIsLoadingUpdateStatus] =
    React.useState<boolean>(false);

  const columns = [
    // {
    //   title: 'FEATURE',
    //   dataIndex: 'tableName',
    //   key: 'tableName',
    //   render: (text: string, record: LogBCInputProps) => {
    //     return (
    //       record.tableName
    //     );
    //   },
    // },

    {
      title: 'CREATED AT',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: any) => <div>{formatYearToTime(createdAt)}</div>,
    },
    {
      title: 'METHOD',
      dataIndex: 'method',
      key: 'method',

      render: (text: string, record: LogBCInputProps) => {
        return <div className="line-clamp-2">{record.method}</div>;
      },
    },
    {
      title: 'ENDPOINT',
      dataIndex: 'endpoint',
      key: 'endpoint',

      render: (text: string, record: LogBCInputProps) => {
        return <div className="line-clamp-2">{record.endpoint}</div>;
      },
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'ACTIONS',
      dataIndex: 'actions',
      key: 'actions',
      render: (actions: any, record: LogBCInputProps) => (
        <Button onClick={() => {
          Modal.info({
            title: 'Data From BC',
            content: <ReactJson src={record.requestData} />,
          });
        }}>View Data</Button>
      ),
    },
  ];

  const handleFilterStatus = (status: string | boolean) => {
    console.log(status);
    if (status === 'all') {
      setQuery((oldVal) => ({ ...oldVal, isPublished: '' }));
    } else {
      setQuery((oldVal) => ({ ...oldVal, isPublished: status }));
    }
  };

  return (
    <>
      <HeaderSection title="BC Integration Logs" />
      <Row gutter={{ xs: 8, sm: 15 }} className="mb-6">
        <Col span={18}>
          <Typography.Text className="text-3 text-gray block font-semibold mb-1">
            Search
          </Typography.Text>
          <Input
            placeholder="Search by ID"
            suffix={<SearchOutlined />}
            allowClear
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col span={6}>
          <Typography.Text className="text-3 text-gray block font-semibold mb-1">
            Feature
          </Typography.Text>
          <Select
            allowClear
            onChange={handleFilterStatus}
            placeholder="Status"
            defaultValue="all"
            suffixIcon={<IconArrowDown />}
          >
            <Option value="all">All</Option>
            <Option value={'promotions'}>Promotion</Option>
            <Option value={'products'}>Product</Option>
            <Option value={'product_prices'}>Product Price</Option>
            <Option value={'product_stocks'}>Product Stock</Option>
            <Option value={'locations'}>Store</Option>
          </Select>
        </Col>
      </Row>

      <Row style={{ paddingBottom: 24 }}>
        <Col span={24}>
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={data && data}
            pagination={{
              pageSize: pagination.perPage,
              current: pagination.page,
              style: { display: 'none' },
            }}
          />
        </Col>
        <CustomPagination
          data={data && data}
          pagination={pagination}
          changeLimit={changeLimit}
          changePage={changePage}
        />
      </Row>
    </>
  );
}
