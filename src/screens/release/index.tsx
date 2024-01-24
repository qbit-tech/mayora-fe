import React from 'react';
import AppLayout from '../layout/AppLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { DownOutlined, MoreOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Pagination,
  Space,
  Table,
  Switch,
  Dropdown,
  Menu,
  Modal,
  message,
  Input,
  Select,
  Image,
  Tag,
  Typography,
  Button,
  Col,
  Row,
  Divider,
  DatePicker,
} from 'antd';
import HeaderSection from '../../components/HeaderSection';
import { httpRequest } from '../../helpers/api';
import {
  BaseResponsePaginationProps,
  BaseResponseProps,
} from '../../types/config.type';
import styled from 'styled-components';
import useFetchList from '../../hooks/useFetchList';
import useSWR from 'swr';
import { formatDate, formatTime, PAGE_SIZE_OPTIONS } from '../../helpers/constant';
import { initialProduct, ProductProps } from '../../types/products.type';
import { initialRelease, ReleaseProps } from '../../types/release.type';
import {
  CategoryProps,
  FetchAllCategoriesResponse,
  initialProductCategories,
} from '../../types/category.type';
import { replaceDashWithSpace } from '../../helpers/replaceDashWithSpace';
import CustomPagination from '../../components/CustomPagination';
import { IconArrowDown } from '../../assets/icons';
import useDetailBreadcrumbs from '../../hooks/useDetailBreadcrumbs';
import type { TableProps } from 'antd';
import NotSet from '../../components/NotSet';
import useCustomDataFetcher from '../../hooks/useCustomDataFetcher';
import moment from 'moment';

interface ResponseProps extends BaseResponseProps<ReleaseProps> {
  payload: Omit<ReleaseProps, 'createdAt' | 'updatedAt'>;
}

const { Text } = Typography;

const Categories = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = React.useState<string | null>(new URLSearchParams(location.search).get('search'));
  const [statusValue, setStatusValue] = React.useState<string | null>(new URLSearchParams(location.search).get('status'));
  const [pageValue, setPageValue] = React.useState<string | null>(new URLSearchParams(location.search).get('page'));
  const [machineId, setMachineId] = React.useState<string | null>(new URLSearchParams(location.search).get('machineId'));
  const [machineValue, setMachineValue] = React.useState<string | null>(new URLSearchParams(location.search).get('machineId'));
  const [dateValue, setDateValue] = React.useState<string | null>(new URLSearchParams(location.search).get('createdAt'));
  const [date, setDate] = React.useState<string | null>(new URLSearchParams(location.search).get('createdAt'));

  const { setBreadcrumbDetails } = useDetailBreadcrumbs();
  // const [categories, setCategories] = React.useState<CategoryProps[]>([]);
  // const [isLoading, setIsLoading] =
  //   React.useState<boolean>(false);
  const [isLoadingUpdateStatus, setIsLoadingUpdateStatus] =
    React.useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [tmpData, setTmpData] = React.useState<ReleaseProps>(
    initialRelease
  );
  const [isFirstRender, setIsFirstRender] = React.useState<boolean>(true);
  const [tempRelease, setTempRelease] = React.useState<ReleaseProps>(
    initialRelease
  );

  const {
    isLoading,
    setIsLoading,
    data,
    pagination,
    // setData,
    setSearch,
    fetchList,
    setQuery,
    changePage,
    changeLimit,
  } = useCustomDataFetcher<ReleaseProps>({
    endpoint: 'releases',
    limit: +PAGE_SIZE_OPTIONS[0],
  });

  // 2 1 3
  // React.useEffect(() => {
  //   console.log("useEffect 2")
  //   const newSearch = queryParams.get('search') || '';
  //   const newMachineId = queryParams.get('machineId') || '';
  //   const newPage = queryParams.get('page');
  //   const newDate = queryParams.get('createdAt');
  //   setSearch(newSearch);
  //   handleChangeMachineId(newMachineId);
  //   setDate(newDate);
  //   if (newPage) {
  //     changePage(parseInt(newPage), pagination.perPage);
  //   }
  // }, [location.search, setSearchQuery, setMachineValue, setPageValue, setDateValue]);

  React.useEffect(() => {
    console.log("useEffect 1")
    const newPage = queryParams.get('page');
    const newDate = queryParams.get('createdAt') || '';
    console.log(newPage)
    if (newPage && isFirstRender) {
      setIsFirstRender(false);
      handleFilterChange(undefined, undefined, newPage, undefined);
    }
    else if (!isFirstRender) {
      handleFilterChange(undefined, undefined, pagination.page.toString())
    }
  }, [changePage]);



  const handleFilterChange = (search?: string, machineId?: string, page?: string, createdAt?: string) => {

    if (search && machineId && page && createdAt) {
      console.log('tesMasuk 1')
      setSearchQuery(search);
      queryParams.set('search', search);
      setMachineId(machineId);
      queryParams.set('machineId', machineId);
      setPageValue(page);
      queryParams.set('pageTesIf1', page);
      setDate(createdAt);
      queryParams.set('createdAt', createdAt);
      setSearch(search);
      handleChangeMachineId(machineId);
    }
    if (machineId || machineId === '') {
      // ketika masuk machineId
      console.log('tesMasuk 2')
      searchQuery && queryParams.set('search', searchQuery);
      setMachineId(machineId);
      machineId && queryParams.set('machineId', machineId);
      queryParams.set('pageTesIf2', pagination.page.toString());
      handleChangeMachineId(machineId);
    }
    if (search || search === '') {
      console.log('tesMasuk 3')
      setSearchQuery(search);
      search && queryParams.set('search', search);
      machineId && queryParams.set('machineId', machineId);
      queryParams.set('pageTesIf3', pagination.page.toString());
      setSearch(search);
    }
    if (createdAt) {
      console.log(`Ini true lagi ${createdAt}`)
      // ketika masuk date
      console.log('tesMasuk 5')
      setDateValue(createdAt);
      searchQuery && queryParams.set('search', searchQuery);
      // machineId && queryParams.set('machineId', machineId);
      createdAt && queryParams.set('createdAt', createdAt);
      // queryParams.set('pageTesIf10', pagination.page.toString());
      handleCreatedAt(createdAt);
    }
    if (page) {
      // ketika home page
      console.log('tesMasuk 4')
      setPageValue(page);
      searchQuery && queryParams.set('search', searchQuery);
      page && queryParams.set('page', page);
    }

    if (queryParams) {
      // ketika home page
      console.log('tesMasuk 6')
      console.log(`${queryParams.toString()}`)
      console.log(`${queryParams}`)
      const queryString = queryParams.toString();
      console.log(`Ini query ${queryString}`)
      window.history.replaceState(null, '', `?${queryString}`);
    }
  }



  const { Option } = Select;

  const handleChangeStatus = (status: string) => {

    if (status !== 'all') {
      setQuery((oldVal) => ({ ...oldVal, isPublished: status }));
    } else {
      setQuery((oldVal) => ({ ...oldVal, isPublished: '' }));
    }
  };

  const handleChangeMachineId = (machineId: string) => {
    setQuery((oldVal) => ({ ...oldVal, machineId: machineId }));
  }

  const handleCreatedAt = (createdAt: string) => {
    setQuery((oldVal) => ({ ...oldVal, createdAt: createdAt }));
  }

  const GroupingByHours: any = (data: ReleaseProps[]) => {

    const shifts = {
      shift1: { start: '07:00:00', end: '11:59:00' },
      shift2: { start: '12:00:00', end: '16:59:00' },
      shift3: { start: '17:00:00', end: '23:59:00' },
    };

    const shift1 : any = [];
    const shift2 : any = [];
    const shift3 : any = [];
    let countShift1 : any = [];
    let countShift2 : any = [];
    let countShift3 : any = [];
    let accumulatedByHourShift1;
    let accumulatedByHourShift2;
    let accumulatedByHourShift3;

    const hourAccumulator: { [hour: string]: number } = {};

    data.forEach(time => {
      const momentTime = moment(time.time, 'HH:mm:ss');
      const hourGroup = momentTime.format('HH:00');

      console.log(moment(time.time))

      if (!hourAccumulator[hourGroup]) {
        hourAccumulator[hourGroup] = 0;
      }

      if (momentTime.isAfter(moment(shifts.shift1.start,'HH:mm:ss')) && momentTime.isBefore(moment(shifts.shift1.end,'HH:mm:ss'))) {
        shift1.push({ hourGroup, amount: time.amount });
        // countShift1 = time.amount + countShift1;
        countShift1 = hourAccumulator[hourGroup] += time.amount;
        accumulatedByHourShift1 = Object.entries(hourAccumulator).map(([time, amount]) => ({ time, amount }));
      } else if (momentTime.isAfter(moment(shifts.shift2.start,'HH:mm:ss')) && momentTime.isBefore(moment(shifts.shift2.end,'HH:mm:ss'))) {
        shift2.push({ hourGroup, amount: time.amount });
        // countShift2 = time.amount + countShift2;
        countShift2 = hourAccumulator[hourGroup] += time.amount;
        accumulatedByHourShift2 = Object.entries(hourAccumulator).map(([time, amount]) => ({ time, amount }));
      } else if (momentTime.isAfter(moment(shifts.shift3.start,'HH:mm:ss')) && momentTime.isBefore(moment(shifts.shift3.end,'HH:mm:ss'))) {
        shift3.push({ hourGroup, amount: time.amount });
        // countShift3 = time.amount + countShift3;
        countShift3 = hourAccumulator[hourGroup] += time.amount;
        accumulatedByHourShift3 = Object.entries(hourAccumulator).map(([time, amount]) => ({ time, amount }));
      }

    });

    const groupedByShift = {
      shift1,
      shift2,
      shift3,
    };

    const countByShift = {
      countShift1,
      countShift2,
      countShift3,
    };

    const accumulatedByHour = {
      accumulatedByHourShift1,
      accumulatedByHourShift2,
      accumulatedByHourShift3,
    };

    // const accumulatedByHour = Object.entries(hourAccumulator).map(([hour, amount]) => ({ hour, amount }));

    return {
      groupedByShift,
      countByShift,
      accumulatedByHour,
    };
  }

  
  console.log(data)
  console.log(GroupingByHours(data));

  const columns = [
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      width: '50%',
      render: (time: string) => {
        return (
          <div className="">
            {time}
          </div>
        );
      }
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      width: '50%',
      render: (text: string, record: ReleaseProps) => {
        return (
          <div className="">
            {record?.amount}
          </div>
        );
      }
    },
  ] as TableProps<ReleaseProps>['columns'];

  const totalAmount = data.reduce((acc, cur) => acc + cur.amount, 0);

  return (
    <React.Fragment>
      <HeaderSection
        // icon={<TagOutlined />}
        title="Release"
        rightAction={
          <React.Fragment>
            <Dropdown overlay={
              <Menu>
                {
                  data.map((record) => (
                    <Menu.Item key={record.machineId} onClick={() => handleFilterChange(undefined, record.machineId, undefined, undefined)}>
                      {record.machineId}
                    </Menu.Item>
                  ))
                }
              </Menu>
            }>
              <Button>
                <span className="mr-2">
                  {
                    machineId
                  }
                </span>
                <DownOutlined />
              </Button>
            </Dropdown>
            <DatePicker style={{ marginLeft: 10 }} onChange={(date, dateString) => {
              console.log(date, dateString);
              handleFilterChange(undefined, undefined, undefined, dateString);
            }} />
          </React.Fragment>
        }
      // subtitle="Manage your Categories"
      />
      <div style={{ height: '500px', width: '100%', backgroundColor: 'white', padding: "20px" }}>
        <React.Fragment>

          <Row>
            <Col span={12}>
              <Text>Data Release By System</Text>
            </Col>
            <Col span={12} className='text-right'>
              <Text style={{ color: "red", fontWeight: "bold" }} >
                Total Release: {totalAmount}
              </Text>
            </Col>
          </Row>

          <Divider />

          <Row gutter={16}>
            {Object.keys(GroupingByHours(data).accumulatedByHour).map((shift, index) => (
              <React.Fragment>
                <Col span={8} key={shift}>
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>Shift {index + 1}</Text>
                  <Table
                    loading={isLoading}
                    columns={columns}
                    dataSource={GroupingByHours(data).accumulatedByHour[shift]}
                    pagination={{
                      pageSize: pagination.perPage,
                      current: pagination.page,
                      style: { display: 'none' },
                    }}
                    style={{ marginTop: 10 }}
                    footer={() => (
                      <Row className="text-center m-0 p-0" gutter={20}>
                        <Col span={12} className="text-center">
                          <Text style={{ fontWeight: "bold" }}>Total</Text>
                        </Col>
                        <Col span={12} className='text-center'>
                          <Text style={{ fontWeight: "bold", color: "red" }}>
                            {/* {
                              data
                                .filter((record) => record.shift === shift)
                                .reduce((acc, cur) => acc + cur.amount, 0) || 0
                            } */}
                          </Text>
                        </Col>
                      </Row>
                    )} />
                </Col>

              </React.Fragment>
            ))}

            {/* <CustomPagination
              data={data && data}
              pagination={pagination}
              changeLimit={changeLimit}
              changePage={changePage}
            /> */}
          </Row>

        </React.Fragment>
      </div>

    </React.Fragment >
  );
};

export const ContainerFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
`;

export default Categories;

