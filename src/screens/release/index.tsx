import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DownOutlined, MoreOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Table,
  Dropdown,
  Menu,
  Typography,
  Button,
  Col,
  Row,
  Divider,
  DatePicker,
} from 'antd';
import HeaderSection from '../../components/HeaderSection';
import {
  BaseResponsePaginationProps,
  BaseResponseProps,
} from '../../types/config.type';
import styled from 'styled-components';
import { formatDate, formatTime, PAGE_SIZE_OPTIONS } from '../../helpers/constant';
import { initialRelease, ReleaseProps } from '../../types/release.type';
import type { TableProps } from 'antd';
import useCustomDataFetcher from '../../hooks/useCustomDataFetcher';
// import moment from 'moment';
import { DetailUserWithMachine } from '../../data/model/machines';
import { useAuthUser } from 'react-auth-kit';
import moment from 'moment-timezone';
import BASE_RELEASE_SHIFT from '../../const/shift';
import ReleaseAddModal from './releaseModal/addRelease';
import useFetchList from '../../hooks/useFetchList';

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
  const [machineId, setMachineId] = React.useState<number | null>(Number(new URLSearchParams(location.search).get('machineId')));
  const [machineValue, setMachineValue] = React.useState<string | null>(new URLSearchParams(location.search).get('machineId'));
  const [dateValue, setDateValue] = React.useState<string | null>(new URLSearchParams(location.search).get('createdAt'));
  const [date, setDate] = React.useState<string | null>(new URLSearchParams(location.search).get('createdAt'));
  const auth = useAuthUser();
  let machines: DetailUserWithMachine[] = auth()?.machines
  const [selectedMachine, setSelectedMachine] = React.useState<DetailUserWithMachine>(machines[0])
  const [isFirstRender, setIsFirstRender] = React.useState<boolean>(true);
  const [visibleInputRelease, setVisibleInputRelease] = React.useState(false);

  const {
    isLoading,
    data,
    pagination,
    setSearch,
    setQuery,
    changePage,
    fetchList,
  } = useFetchList<ReleaseProps>({
    endpoint: 'releases',
    limit: +PAGE_SIZE_OPTIONS[3],
  });

  React.useEffect(() => {
    console.log("useEffect 1")
    const newPage = queryParams.get('page');
    const newDate = queryParams.get('createdAt') || '';
    console.log(newPage)
    if (isFirstRender) {
      setIsFirstRender(false);
      handleFilterChange(undefined, machines[0].machineId, undefined, moment().format('YYYY-MM-DD'));
    }
  }, [changePage]);

  const handleFilterChange = (search?: any, machineId?: number, page?: string, createdAt?: string) => {
    console.log(123)
    if (search && machineId && page && createdAt) {
      console.log('tesMasuk 1')
      setSearchQuery(search);
      queryParams.set('search', search);
      setMachineId(machineId);
      queryParams.set('machineId', machineId.toString());
      setPageValue(page);
      queryParams.set('pageTesIf1', page);
      setDate(createdAt);
      queryParams.set('createdAt', createdAt);
      setSearch(search);
      handleChangeMachineId(machineId);
    }
    if (machineId || machineId === 0) {
      // ketika masuk machineId
      console.log('tesMasuk 2')
      searchQuery && queryParams.set('search', searchQuery);
      setMachineId(machineId);
      machineId && queryParams.set('machineId', machineId.toString());
      queryParams.set('pageTesIf2', pagination.page.toString());
      handleChangeMachineId(machineId);
    }
    if (search || search === '') {
      console.log('tesMasuk 3')
      setSearchQuery(search);
      search && queryParams.set('search', search);
      machineId && queryParams.set('machineId', machineId.toString());
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

  const handleChangeMachineId = (machineId: number) => {
    setQuery((oldVal) => ({ ...oldVal, machineId: machineId }));
  }

  const handleCreatedAt = (createdAt: string) => {
    setQuery((oldVal) => ({ ...oldVal, createdAt: createdAt }));
  }

  const GroupingByHours: any = (data: ReleaseProps[]) => {

    const shifts = BASE_RELEASE_SHIFT;
  
    const shift1: any = [];
    const shift2: any = [];
    const shift3: any = [];
    let countShift1: any = [];
    let countShift2: any = [];
    let countShift3: any = [];
    let accumulatedByHourShift1: any = [];
    let accumulatedByHourShift2: any = [];
    let accumulatedByHourShift3: any = [];
  
    const hourAccumulatorShift1: { [hour: string]: number } = {};
    const hourAccumulatorShift2: { [hour: string]: number } = {};
    const hourAccumulatorShift3: { [hour: string]: number } = {};
  
    data.forEach((time) => {
      const format = 'hh:mm:ss';
      const parsedData = moment(time.time).tz('Asia/Jakarta').format('HH:mm:ss');
      console.log(parsedData);
  
      const hourGroup = moment(parsedData, format).format('HH:00');
  
      if (!hourAccumulatorShift1[hourGroup]) {
        hourAccumulatorShift1[hourGroup] = 0;
      }
  
      if (!hourAccumulatorShift2[hourGroup]) {
        hourAccumulatorShift2[hourGroup] = 0;
      }
  
      if (!hourAccumulatorShift3[hourGroup]) {
        hourAccumulatorShift3[hourGroup] = 0;
      }
  
      if (parsedData >= shifts.shift1.start && parsedData <= shifts.shift1.end) {
        shift1.push({ hourGroup, amount: time.amount });
        countShift1 = hourAccumulatorShift1[hourGroup] += time.amount;
        accumulatedByHourShift1 = Object.entries(hourAccumulatorShift1)
          .filter(([time, amount]) => amount !== 0)
          .map(([time, amount]) => ({ time, amount }));
      } 
      
      
      else if (parsedData >= shifts.shift2.start && parsedData <= shifts.shift2.end) {
        shift2.push({ hourGroup, amount: time.amount });
        countShift2 = hourAccumulatorShift2[hourGroup] += time.amount;
        accumulatedByHourShift2 = Object.entries(hourAccumulatorShift2)
          .filter(([time, amount]) => amount !== 0)
          .map(([time, amount]) => ({ time, amount }));
      } 
      
      
      else if (parsedData >= shifts.shift3.start && parsedData <= shifts.shift3.end) {
        shift3.push({ hourGroup, amount: time.amount });
        countShift3 = hourAccumulatorShift3[hourGroup] += time.amount;
        accumulatedByHourShift3 = Object.entries(hourAccumulatorShift3)
          .filter(([time, amount]) => amount !== 0)
          .map(([time, amount]) => ({ time, amount }));
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
  
    return {
      groupedByShift,
      countByShift,
      accumulatedByHour,
    };
  };
  

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


  const handleAddRelease = () => {
    setVisibleInputRelease(true);
  }

  const handleCancelInputRelease = () => {
    setVisibleInputRelease(false);
  }

  const handleCreateSuccess = () => {
    fetchList();
  }

  const isReleaseDebuggingEnabled = process.env.REACT_APP_SHOW_CREATE_RELEASE === 'TRUE';

  return (
    <React.Fragment>
      <HeaderSection
        // icon={<TagOutlined />}
        title="Release"
        rightAction={
          <React.Fragment>
            { isReleaseDebuggingEnabled && (
              <Button className="mr-2" type="primary" onClick={handleAddRelease}>
                Add New Release
              </Button>
            )}

            <Dropdown overlay={
              <Menu>
                {
                  machines.map((record) => (
                    <Menu.Item key={record.machineId} onClick={() => handleFilterChange(undefined, record.machineId, undefined, undefined)}>
                      {record.machine.name}
                    </Menu.Item>
                  ))
                }
              </Menu>
            }>
              <Button>
                <span className="mr-2">
                  {
                    machineId ? machines.filter((record) => record.machineId === machineId)[0].machine.name : machines[0].machine.name
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
                            {
                              shift === 'accumulatedByHourShift1' ? GroupingByHours(data).countByShift.countShift1 :
                                shift === 'accumulatedByHourShift2' ? GroupingByHours(data).countByShift.countShift2 :
                                  shift === 'accumulatedByHourShift3' ? GroupingByHours(data).countByShift.countShift3 : null
                            }
                          </Text>
                        </Col>
                      </Row>
                    )} />
                </Col>

              </React.Fragment>
            ))}

            <ReleaseAddModal visibleInputRelease={visibleInputRelease} onCancelInputRelease={handleCancelInputRelease} onCreateSuccess={handleCreateSuccess} />

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

export default Categories;

