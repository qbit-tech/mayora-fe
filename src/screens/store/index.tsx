import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Table,
  Dropdown,
  Menu,
  Modal,
  message,
  Input,
  Select,
  Tag,
  Typography,
  Row,
  Col,
} from 'antd';
import HeaderSection from '../../components/HeaderSection';
import { httpRequest } from '../../helpers/api';
import { BaseResponseProps } from '../../types/config.type';
import styled from 'styled-components';
import useFetchList from '../../hooks/useFetchList';
import {
  formatDate,
  formatYearToTime,
  PAGE_SIZE_OPTIONS,
} from '../../helpers/constant';
import {
  StoreProps,
  initialStore,
  initialShipmentSetting,
  shipmentSettingProps,
} from '../../types/store.type';
import { CategoryProps } from '../../types/category.type';
import ModalEditSetting from '../../components/Location/ModalEditSetting';
import CustomPagination from '../../components/CustomPagination';
import { IconArrowDown } from '../../assets/icons';

interface ResponseProps extends BaseResponseProps<StoreProps> {
  payload: Omit<StoreProps, 'createdAt' | 'updatedAt'>;
}

const { Text } = Typography;

const Locations = () => {
  const navigate = useNavigate();

  const [isLoadingUpdateStatus, setIsLoadingUpdateStatus] =
    React.useState<boolean>(false);
  const [isLoadingEditSetting, setIsLoadingEditSetting] =
    React.useState<boolean>(false);

  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [isModalEditSettingVisible, setIsModalEditSettingVisible] =
    React.useState<boolean>(false);
  const [tmpData, setTmpData] = React.useState<StoreProps>(initialStore);
  const [tmpEditSetting, setTmpEditSetting] =
    React.useState<shipmentSettingProps>(initialShipmentSetting);

  const {
    isLoading,
    data,
    pagination,
    setData,
    fetchList,
    setSearch,
    setQuery,
    changePage,
    changeLimit,
  } = useFetchList<StoreProps>({
    endpoint: 'product/store',
    limit: +PAGE_SIZE_OPTIONS[0],
  });

  const handleStatusChange = async () => {
    try {
      setIsLoadingUpdateStatus(true);
      // let newData = [];
      // newData = data.map((item) => {
      //   if (item.productId === tmpData.productId) {
      //     return {
      //       ...item,
      //       statusLoading: true,
      //     };
      //   }
      //   return item;
      // });
      // setData(newData);

      const res = await httpRequest.patch<ResponseProps>(
        '/products/' + tmpData.storeId,
        {
          storeId: tmpData.storeId,
          isPublished: !tmpData.isPublished,
        }
      );

      // newData = data.map((item) => {
      //   if (item.productId === res.data.payload.productId) {
      //     return {
      //       ...item,
      //       isPublished: res.data.payload.isPublished,
      //       statusLoading: false,
      //     };
      //   }
      //   return item;
      // });
      // setData(newData);

      message.success('Success change ' + tmpData.storeName + ' status.');

      fetchList();

      setIsLoadingUpdateStatus(false);
      setIsModalVisible(false);
      setTmpData(initialStore);
    } catch (error: any) {
      message.error(error.data.message);
      setIsModalVisible(false);
      setTmpData(initialStore);
      setIsLoadingUpdateStatus(false);
    }
  };

  const handleEditSettingSave = async () => {
    setIsLoadingEditSetting(true);
    const newLocation = { ...tmpData, shipmentSetting: tmpEditSetting };
    const res = await httpRequest.patch<ResponseProps>(
      '/locations/' + tmpData.storeId,
      newLocation
    );
    if (res && res.data.payload) {
      const newData = data.map((item) =>
        item.storeId === newLocation.storeId ? newLocation : item
      );
      setData(newData);
      message.success(
        'Success change ' + newLocation.storeName + ' edit setting.'
      );
    } else {
      message.success(
        'failed change ' + newLocation.storeName + ' edit setting.'
      );
    }
    setIsModalEditSettingVisible(false);
    setIsLoadingEditSetting(false);
  };

  const { Option } = Select;

  const handleChangeStatus = (status: string) => {
    // if (status !== "all") {
    //   setQuery((oldVal) => ({
    //     ...oldVal,
    //     isPublished: status === "active" ? true : false,
    //   }));
    // } else {
    //   setQuery((oldVal) => ({ ...oldVal, isPublished: status }));
    // }
    if (status !== 'all') {
      setQuery((oldVal) => ({ ...oldVal, isPublished: status }));
    } else {
      setQuery((oldVal) => ({ ...oldVal, isPublished: '' }));
    }
  };

  const handleClickDetail = (e: StoreProps) => {
    navigate(`/stores/${e.storeId}`);
  };

  const handleClickAction = (props: StoreProps, key: string) => {
    if (key === 'detail') {
      navigate(`/stores/${props.storeId}`);
    } else if (key === 'edit setting') {
      setTmpData(props);
      setTmpEditSetting(
        props.shipmentSetting ? props.shipmentSetting : initialShipmentSetting
      );
      setIsModalEditSettingVisible(true);
    }
  };

  console.log(data);

  const columns = [
    {
      title: 'NAME',
      dataIndex: 'storeName',
      key: 'storeName',
      render: (text: string, record: StoreProps) => {
        return (
          <div className="table-link" onClick={() => handleClickDetail(record)}>
            {record?.storeName}
          </div>
        );
      },
    },
    {
      title: 'ADDRESS',
      dataIndex: 'address',
      key: 'address',
      render: (text: string, record: StoreProps) => {
        return (
          <Text>
            {record?.address}
            {record?.district ? `, ${record?.district}` : ''}, {record?.city}
            {record?.province ? `, ${record?.province}` : ''},{' '}
            {record?.postalCode}
          </Text>
        );
      },
    },
    {
      title: 'LOCATION',
      dataIndex: 'address',
      key: 'address',
      render: (text: string, record: StoreProps) => {
        return <Text>{record?.city ?? '-'}</Text>;
      },
    },
    {
      title: 'STATUS',
      key: 'status',
      dataIndex: 'status',
      render: (status: any, record: StoreProps) => (
        <>
          {
            <Text>
              {record?.isPublished === true ? (
                <Tag
                  style={{
                    border: '2px solid #31d63a',
                    color: '#31d63a',
                    marginBottom: '7%',
                  }}
                >
                  Published
                </Tag>
              ) : (
                <Tag
                  style={{
                    border: '2px solid #D81F64',
                    color: '#D81F64',
                    marginBottom: '7%',
                  }}
                >
                  Unpublished
                </Tag>
              )}
            </Text>
          }
        </>
      ),
    },
    {
      title: 'UPDATE AT',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (updatedAt: any) => <div>{formatYearToTime(updatedAt)}</div>,
    },
    {
      title: 'CREATED AT',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: any) => <div>{formatYearToTime(createdAt)}</div>,
    },
    {
      title: '',
      key: 'action',
      render: (_: any, record: StoreProps) => (
        <Dropdown overlay={() => menu(record)} placement="bottomRight">
          <MoreOutlined style={{ cursor: 'pointer' }} />
        </Dropdown>
      ),
    },
  ];

  const menu = (record: StoreProps) => (
    <Menu
      onClick={(e) => handleClickAction(record, e.key)}
      items={[
        { label: 'Detail Store', key: 'detail' },
        { label: 'Edit Setting', key: 'edit setting' },
      ]}
    />
  );

  return (
    <React.Fragment>
      <HeaderSection
        // icon={<EnvironmentOutlined />}
        title="Store"
        // subtitle="Manage your Locations"
      />

      <ContainerFilter>
        <div className="input-search">
          <p style={{ fontSize: 12, color: '#768499', marginBottom: 4 }}>
            Search
          </p>
          <Input
            // size="large"

            placeholder="Search by location name"
            suffix={<SearchOutlined />}
            allowClear
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <p style={{ fontSize: 12, color: '#768499', marginBottom: 4 }}>
            Status
          </p>
          <Select
            // size="large"
            allowClear
            style={{ width: 160 }}
            onChange={handleChangeStatus}
            placeholder="Status"
            defaultValue="all"
            suffixIcon={<IconArrowDown />}
          >
            <Option value="all">All</Option>
            <Option value="active">Published</Option>
            <Option value="inactive">Unpublished</Option>
          </Select>
        </div>
      </ContainerFilter>

      {/* <Table
				loading={isLoading}
				columns={columns}
				dataSource={data}
				pagination={false}
			/>

			<Pagination
				current={pagination.page}
				total={pagination.totalData}
				defaultPageSize={pagination.perPage}
				pageSize={pagination.perPage}
				pageSizeOptions={PAGE_SIZE_OPTIONS}
				onShowSizeChange={(_current, size) => {
					changeLimit(size);
				}}
				showSizeChanger={true}
				showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
				onChange={changePage}
			/> */}

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

      <Modal
        title="Update status confirmation"
        open={isModalVisible}
        onOk={handleStatusChange}
        onCancel={() => {
          setIsModalVisible(false);
          setTmpData(initialStore);
        }}
        okText="Yes"
        confirmLoading={isLoadingUpdateStatus}
        okButtonProps={{ type: 'primary' }}
      >
        <p>
          Are you sure want to change <b>"{tmpData.storeName}"</b> status to{' '}
          <b>"{!tmpData.isPublished ? 'Active' : 'Inactive'}"</b>?.{' '}
          {!tmpData.isPublished}
        </p>
      </Modal>
      {/* <ModalEditSetting
        onOk={handleEditSettingSave}
        isLoading={isLoadingEditSetting}
        isVisible={isModalEditSettingVisible}
        setVisible={setIsModalEditSettingVisible}
        data={tmpEditSetting}
        setData={setTmpEditSetting}
      /> */}
    </React.Fragment>
  );
};

export const ContainerFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;

  .input-search {
    flex: 1;
    .ant-input {
      width: 100%;
    }
  }
`;

export default Locations;

function sortCategories(categories: CategoryProps[]) {
  categories.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
  return categories;
}
