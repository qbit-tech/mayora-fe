import {
  Divider,
  Space,
  Button,
  Card,
  Spin,
  Row,
  Col,
  Typography,
  Tabs,
  Input,
  Select,
  Table,
  Image,
  Badge,
  Dropdown,
  Menu,
  message,
} from 'antd';
import React from 'react';
import HeaderSection from '../../components/HeaderSection';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { httpRequest } from '../../helpers/api';
import {
  BaseResponsePaginationProps,
  BaseResponseProps,
} from '../../types/config.type';
import DetailItem from '../../components/DetailItem';
import { UserProperties, initialUser } from '../../types/user.type';
import SectionContent from '../../components/SectionContent';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import { ETransactionStatus, TransactionProps } from '../../types/transaction';
import useFetchList from '../../hooks/useFetchList';
import styled from 'styled-components';
import { formatYearToTime, PAGE_SIZE_OPTIONS } from '../../helpers/constant';
import { MoreOutlined, SearchOutlined } from '@ant-design/icons';
import { IconArrowDown } from '../../assets/icons';
import DatePicker from 'antd/es/date-picker';
import CustomPagination from '../../components/CustomPagination';
import { showRoleName } from '../../helpers/auth';
import useDetailBreadcrumbs from '../../hooks/useDetailBreadcrumbs';
import formatPrice from '../../helpers/formatPrice';

interface ILocation {
  userId: string;
}

interface ResponseProps
  extends BaseResponseProps<Omit<UserProperties, 'createdAt' | 'updatedAt'>> {}

type Props = {
  userType?: 'admin' | 'customer';
};

const { Option } = Select;
const { RangePicker } = DatePicker;

dayjs.extend(utc)

const UserDetail = (props: Props) => {
  const navigate = useNavigate();
  const { setBreadcrumbDetails } = useDetailBreadcrumbs();
  const { userId } = useParams<keyof ILocation>() as ILocation;
  const {
    isLoading: isLoadingTrans,
    data: transactions,
    pagination,
    setData,
    setSearch,
    setQuery,
    changePage,
    changeLimit,
    setIsLoading: setIsLoadingTrans,
    setPagination,
  } = useFetchList<TransactionProps>({
    endpoint: 'transactions',
    initialQuery: {
      buyerId: userId,
    },
    limit: +PAGE_SIZE_OPTIONS[0],
  });
  console.log(transactions);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [customer, setCustomer] = React.useState<UserProperties>({
    ...initialUser,
  });
  const [totalTransaction, setTotalTransaction] = React.useState(0);
  console.log(customer);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);

        const res = await httpRequest.get<ResponseProps>('/users/' + userId);
        const resTrans = await httpRequest.get<
          BaseResponsePaginationProps<TransactionProps>
        >(`/transactions?buyerId=${userId}`);

        if (!res && !resTrans) {
          message.error('Something went wrong');
          return;
        }

        setTotalTransaction(resTrans.data.payload.results.length);
        const customer = res.data.payload;

        let fullName = customer.name;

        if (customer.firstName && customer.middleName && customer.lastName) {
          fullName = `${customer.firstName} ${customer.middleName} ${customer.lastName}`;
        } else if (
          customer.firstName &&
          !customer.middleName &&
          customer.lastName
        ) {
          fullName = `${customer.firstName} ${customer.lastName}`;
        } else if (
          customer.firstName &&
          customer.middleName &&
          !customer.lastName
        ) {
          fullName = `${customer.firstName} ${customer.middleName}`;
        } else if (
          customer.firstName &&
          !customer.middleName &&
          !customer.lastName
        ) {
          fullName = `${customer.firstName}`;
        }

        setCustomer({
          ...res.data.payload,
          name: fullName,
        });

        let label = `Detail ${
          props.userType === 'admin' ? 'Admin' : 'Customer'
        }`;
        const bcDetails = [
          {
            field: 'userId',
            value: userId,
            label,
          },
        ];
        setBreadcrumbDetails(bcDetails);

        setIsLoading(false);
      } catch (error: any) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchUser();

    // eslint-disable-next-line
  }, [userId]);

  const convertUserType = (userType: string) => {
    switch (userType) {
      case 'admin':
        return 'User';
      case 'customer':
        return 'Customer';
      case 'customer_premium':
        return 'Premium Customer';
      case 'customer_trainer':
        return 'Trainer';
      default:
        return '';
    }
  };

  const handleClickEdit = () => {
    navigate('/' + props.userType + '/' + userId + '/edit');
  };

  const handleClickDetail = (e: TransactionProps) => {
    navigate(`/transactions/${e.transactionId}`);
  };

  const handleTransactionStatusFilterChange = (
    transactionStatus: ETransactionStatus | string
  ) => {
    if (transactionStatus === 'all') {
      setQuery((oldVal) => ({
        ...oldVal,
        transactionStatus: '',
        buyerId: userId ? userId : '',
      }));
    } else if (transactionStatus) {
      setQuery((oldVal) => ({
        ...oldVal,
        transactionStatus: transactionStatus,
        buyerId: userId ? userId : '',
      }));
    } else {
      setQuery((oldVal) => ({ ...oldVal, transactionStatus: null }));
    }
  };

  const handleTransactionDateFilterChange = (e: any) => {
    console.log(e);
    if (e) {
      setQuery((oldVal) => ({
        ...oldVal,
        startAt: dayjs.utc(e[0]).toISOString(),
        endAt: dayjs.utc(e[1]).toISOString(),
      }));
    } else {
      setQuery((oldVal) => ({
        ...oldVal,
        startAt: '',
        endAt: '',
      }));
    }
  };

  const columns = [
    {
      title: 'ORDER DATE',
      key: 'createdAt',
      width: '15%',
      dataIndex: 'createdAt',
      sorter: (a: TransactionProps, b: TransactionProps) =>
        dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
      render: (price: number, record: TransactionProps) => {
        return (
          <div>{dayjs(record.createdAt).format('DD MMM YYYY, HH:mm')}</div>
        );
      },
    },
    {
      title: 'ORDER ID',
      key: 'transactionCode',
      dataIndex: 'transactionCode',
      sorter: (a: TransactionProps, b: TransactionProps) =>
        a.transactionCode.localeCompare(b.transactionCode),
      render: (text: string, record: TransactionProps) => {
        return (
          <div className="table-link" onClick={() => handleClickDetail(record)}>
            {text?.toUpperCase()}
          </div>
        );
      },
    },
    {
      title: 'PRODUCT',
      key: '',
      dataIndex: '',
      render: (text: string, record: TransactionProps) => {
        const [first, ...other] = record?.transactionItems!;
        const isPromo = first?.metaProduct?.promoId;

        return (
          <div className="flex gap-x-2">
            <div className="flex flex-col">
              <Typography.Text className="text-primary-black text-3.5">
                {isPromo
                  ? first?.metaProduct.description
                  : first?.metaProduct?.productName || '-'}
              </Typography.Text>
              {other.length > 0 && (
                <Typography.Text className="text-gray text-2.7">
                  +{other.length} product{other.length > 1 ? 's' : ''}
                </Typography.Text>
              )}
            </div>
          </div>
        );
      },
    },
    {
      title: 'CUSTOMERS',
      key: 'CustomerName',
      dataIndex: 'buyerDetail.fullName',
      render: (text: string, record: TransactionProps) => {
        return (
          <div className="flex flex-col">
            <Typography.Text className="text-primary-black text-3.5">
              {record.buyerDetail?.name}
            </Typography.Text>
            <Typography.Text className="text-gray text-2.7">
              {record.buyerDetail?.email}
            </Typography.Text>{' '}
          </div>
        );
      },
    },

    {
      title: 'TOTAL',
      key: 'finalPrice',
      dataIndex: 'finalPrice',
      sorter: (a: TransactionProps, b: TransactionProps) =>
        a.totalFinalPrice - b.totalFinalPrice,
      render: (price: number, record: TransactionProps) => {
        const isPoint = record?.details?.items.find(
          (item) => item.type === 'point'
        );
        const shippingFee = record?.details?.items.find(
          (item) => item.key === 'shipping-fee'
        )?.value;
        return (
          <div className="text-3 text-primary-black">
            {record && isPoint
              ? `IDR ${formatPrice(shippingFee || 0)}`
              : `IDR ${record.totalFinalPrice?.toLocaleString('id-ID')}`}
          </div>
        );
      },
    },
    {
      title: '',
      key: 'action',
      render: (_: any, record: TransactionProps) => (
        <Dropdown overlay={() => menu(record)} placement="bottomRight">
          <MoreOutlined style={{ cursor: 'pointer' }} />
        </Dropdown>
      ),
    },
  ];

  const menu = (record: TransactionProps) => (
    <Menu onClick={(e) => handleClickAction(record, e.key)}>
      <Menu.Item key="detail">Detail</Menu.Item>
      {/* <Menu.Item key="edit">Edit </Menu.Item>
      <Menu.Item key="delete">Delete </Menu.Item> */}
    </Menu>
  );

  const handleClickAction = (props: TransactionProps, key: string) => {
    if (key === 'detail') {
      navigate(`/transactions/${props.transactionId}`);
    }
  };

  const items = [
    {
      label: (
        <div className="flex items-center gap-2">Customer Information</div>
      ),
      key: 'customer-info',
      children: (
        <div className="my-6">
          <SectionContent
            groupTitle="Data Customer"
            subTitle="This is data customer details, you can't change here"
          >
            <Row justify="space-between">
              <Col span={24} style={{ marginBottom: 15 }}>
                <Typography.Text className="text-3 text-gray block">
                  Name
                </Typography.Text>
                <Typography.Text className="text-3.5 text-primary-black">
                  {customer.name}
                </Typography.Text>
              </Col>
              <Col span={24} style={{ marginBottom: 15 }}>
                <Row>
                  <Col span={8}>
                    <Typography.Text className="text-3 text-gray block">
                      Email
                    </Typography.Text>
                    <Typography.Text className="text-3.5 text-primary-black">
                      {customer.email}
                    </Typography.Text>
                  </Col>
                  <Col span={8}>
                    <Typography.Text className="text-3 text-gray block">
                      Phone Number
                    </Typography.Text>
                    <Typography.Text className="text-3.5 text-primary-black">
                      {customer.phone}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={24} style={{ marginBottom: 15 }}>
                <Typography.Text className="text-3 text-gray block">
                  Status
                </Typography.Text>
                <Typography.Text
                  className="text-3.5 text-primary-black"
                  style={{ textTransform: 'capitalize' }}
                >
                  {customer.status}
                </Typography.Text>
              </Col>
              <Col span={24} style={{ marginBottom: 15 }}>
                <Row>
                  <Col span={8}>
                    <Typography.Text className="text-3 text-gray block">
                      Created At
                    </Typography.Text>
                    <Typography.Text className="text-3.5 text-primary-black">
                      {dayjs(customer.createdAt).format('DD MMMM YYYY, HH:mm')}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </SectionContent>{' '}
          <Divider />
          <SectionContent
            groupTitle="Data Transaction"
            subTitle="These are data transaction , you can’t change here"
          >
            <Row>
              <Col span={8} style={{ marginBottom: 15 }}>
                <Typography.Text className="text-3 text-gray block">
                  Total Transaction
                </Typography.Text>
                <Typography.Text className="text-3.5 text-primary-black">
                  {transactions.length}
                </Typography.Text>
              </Col>
              <Col span={8} style={{ marginBottom: 15 }}>
                <Typography.Text className="text-3 text-gray block">
                  Data Transaction
                </Typography.Text>
                <Typography.Text className="text-3.5 text-primary-black">
                  <Link
                    to="/transactions"
                    state={{ buyerId: customer.userId }}
                    className="underline text-3"
                    style={{ textDecoration: 'underline' }}
                  >
                    See Transaction
                  </Link>
                </Typography.Text>
              </Col>
            </Row>
          </SectionContent>
        </div>
      ),
    },
    {
      label: (
        <div className="flex items-center gap-2">
          Transactions
          <Badge
            count={totalTransaction}
            style={{ backgroundColor: '#20A1F5' }}
            overflowCount={9999}
            showZero
          />
        </div>
      ),
      key: 'transactions',
      children: (
        <div className="my-6">
          <Row gutter={{ xs: 8, sm: 15 }} className="mb-5">
            <Col span={12}>
              <Typography.Text className="text-3 text-gray block font-semibold mb-1">
                Search
              </Typography.Text>
              <Input
                placeholder="Search by Transaction Code"
                suffix={<SearchOutlined />}
                allowClear
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
            <Col span={6}>
              <Typography.Text className="text-3 text-gray block font-semibold mb-1">
                Status
              </Typography.Text>
              <Select
                allowClear
                onChange={handleTransactionStatusFilterChange}
                placeholder="Transaction Status"
                defaultValue="all"
                suffixIcon={<IconArrowDown />}
              >
                <Option value="all">All</Option>
                <Option value={ETransactionStatus.created}>
                  Waiting Payment
                </Option>

                <Option value={ETransactionStatus.paid}>Paid</Option>
                <Option value={ETransactionStatus.expired}>Expired</Option>
                <Option value={ETransactionStatus.shipped}>Shipped</Option>
                <Option value={ETransactionStatus.done}>Done</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Typography.Text className="text-3 text-gray block font-semibold mb-1">
                Order Date
              </Typography.Text>
              <RangePicker
                suffixIcon={null}
                format="DD MMM YYYY"
                onChange={handleTransactionDateFilterChange}
              />
            </Col>
          </Row>
          <Row style={{ paddingBottom: 24 }}>
            <Col span={24}>
              <Table
                rowClassName={(record, index) =>
                  index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
                }
                loading={isLoadingTrans}
                columns={columns}
                dataSource={transactions}
                pagination={{
                  pageSize: pagination.perPage,
                  current: pagination.page,
                  style: { display: 'none' },
                }}
              />
            </Col>
            <CustomPagination
              data={transactions}
              pagination={pagination}
              changeLimit={changeLimit}
              changePage={changePage}
            />
          </Row>
        </div>
      ),
    },
    // {
    //   label: <div className="flex items-center gap-2">Birthday Gifts</div>,
    //   key: 'birthday-gifts',
    //   children: <div className="my-6">Birthday Gifts</div>,
    // },
  ];

  return (
    <React.Fragment>
      <HeaderSection
        icon="back"
        title={props.userType === 'admin' ? 'Detail Admin' : customer.name}
        subtitle="Manage your admin data"
        rightAction={
          props.userType === 'admin' ? (
            <Space>
              <Button onClick={() => navigate('/' + props.userType)}>
                Cancel
              </Button>
              <Button type="primary" onClick={handleClickEdit}>
                Edit
              </Button>
            </Space>
          ) : null
        }
      />

      {isLoading ? (
        <Spin spinning />
      ) : props.userType === 'admin' ? (
        <div style={{ padding: '20px 4px 120px' }}>
          {' '}
          <SectionContent
            groupTitle="Data Admin"
            subTitle="This is data admin details, you can't change here"
          >
            <Row justify="space-between">
              <Col span={24} style={{ marginBottom: 15 }}>
                <Typography.Text className="text-3 text-gray block">
                  Name
                </Typography.Text>
                <Typography.Text className="text-3.5 text-primary-black">
                  {customer.name}
                </Typography.Text>
              </Col>
              <Col span={24} style={{ marginBottom: 15 }}>
                <Row>
                  <Col span={8}>
                    <Typography.Text className="text-3 text-gray block">
                      Email
                    </Typography.Text>
                    <Typography.Text className="text-3.5 text-primary-black">
                      {customer.email}
                    </Typography.Text>
                  </Col>
                  <Col span={8}>
                    <Typography.Text className="text-3 text-gray block">
                      Role
                    </Typography.Text>
                    <Typography.Text className="text-3.5 text-primary-black">
                      {showRoleName(customer.userType)}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={24} style={{ marginBottom: 15 }}>
                <Typography.Text className="text-3 text-gray block">
                  Status
                </Typography.Text>
                <Typography.Text
                  className="text-3.5 text-primary-black"
                  style={{ textTransform: 'capitalize' }}
                >
                  {customer.status}
                </Typography.Text>
              </Col>
              <Col span={24} style={{ marginBottom: 15 }}>
                <Row>
                  <Col span={8}>
                    <Typography.Text className="text-3 text-gray block">
                      Created At
                    </Typography.Text>
                    <Typography.Text className="text-3.5 text-primary-black">
                      {formatYearToTime(customer.createdAt)}
                    </Typography.Text>
                  </Col>
                  <Col span={8}>
                    <Typography.Text className="text-3 text-gray block">
                      Updated At
                    </Typography.Text>
                    <Typography.Text className="text-3.5 text-primary-black">
                      {formatYearToTime(customer.updatedAt)}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </SectionContent>
        </div>
      ) : (
        <>
          <CustomTabs items={items} />
        </>
      )}
    </React.Fragment>
  );
};

export default UserDetail;

const CustomTabs = styled(Tabs)`
  .ant-tabs-tab {
    width: 50% !important;
    display: flex;
    justify-content: center;
  }

  .ant-tabs-nav-list {
    width: 100% !important;
  }
`;
