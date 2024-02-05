import React from 'react';
import AppLayout from '../layout/AppLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { MoreOutlined, SearchOutlined } from '@ant-design/icons';
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
  Divider
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
import { formatDate, PAGE_SIZE_OPTIONS } from '../../helpers/constant';
import { initialProduct, ProductProps } from '../../types/products.type';
import {
  CategoryProps,
  FetchAllCategoriesResponse,
  initialProductCategories,
} from '../../types/category.type';
import useCustomDataFetcher from '../../hooks/useCustomDataFetcher';
import { DownloadOutlined } from '@ant-design/icons';
import { FileExcelOutlined } from '@ant-design/icons';
import { useAuthUser } from 'react-auth-kit';
import { DetailUserWithMachine } from '../../data/model/machines';
import moment from 'moment';
import dayjs from 'dayjs';

interface ResponseProps extends BaseResponseProps<ProductProps> {
  payload: Omit<ProductProps, 'createdAt' | 'updatedAt'>;
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
  const [reportDuration, setReportDuration] = React.useState<string>('daily');
  const [selectedWeeks, setSelectedWeeks] = React.useState<string[]>([]);
  const [selectedMonths, setSelectedMonths] = React.useState<string[]>([]);

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
  } = useCustomDataFetcher<CategoryProps>({
    endpoint: 'product/categories',
    limit: +PAGE_SIZE_OPTIONS[0],
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

  React.useEffect(() => {
    const newPage = queryParams.get('page');
    if (newPage && isFirstRender) {
      setIsFirstRender(false);
      handleFilterChange(undefined, undefined, newPage);
      return;
    }
    handleFilterChange(undefined, undefined, pagination.page.toString());
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

  const handleReportDurationChange = (value: string) => {
    setReportDuration(value);
    setSelectedWeeks([]);
    setSelectedMonths([]);
  }

  const handleWeekChange = (value: string) => {
    setSelectedWeeks((prevWeeks) => {
      if (prevWeeks.includes(value)) {
        return prevWeeks.filter((week) => week !== value);
      } else {
        return [...prevWeeks, value];
      }
    });
  }

  const handleMonthChange = (value: string) => {
    setSelectedMonths((prevMonths) => {
      if (prevMonths.includes(value)) {
        return prevMonths.filter((month) => month !== value);
      } else {
        return [...prevMonths, value];
      }
    });
  }






  return (
    <React.Fragment>
      <HeaderSection
        // icon={<TagOutlined />}
        title="Report"
      // subtitle="Manage your Categories"
      />

      <div style={{ height: '500px', width: '100%', backgroundColor: 'white', padding: "20px" }}>
        <React.Fragment>


          <Row style={{ padding: "10px 0px 10px 0px" }}>
            {/* <Row className='text-center'> */}
            <Col span={24} className='text-center'>
              <Text style={{ fontSize: "20px", fontWeight: "bold", textAlign: "center" }}>Export Report</Text>
              <br />
              <Text style={{ fontSize: "16px", textAlign: "center" }}>Pilih Line type, Report duration dan Week sebelum export data</Text>
            </Col>
          </Row>

          <Row className='p-5 m-5'>
            <Col span={24}>
              <Row gutter={16}  >
                <Col span={7}>
                  <Text style={{ fontSize: "16px" }}>Line Type</Text>
                </Col>

                <Col span={7}>
                  <Text style={{ fontSize: "16px" }}>Report Duration</Text>
                </Col>

                <Col span={6}>
                  <Text style={{ fontSize: "16px" }}>{reportDuration === 'daily' ? 'Day' : reportDuration === 'weekly' ? 'Week' : 'Month'}</Text>
                </Col>

                <Col span={4}>
                  {/* <Text style={{ fontSize: "16px"}}>Action</Text> */}
                </Col>
              </Row>

              <Row gutter={16} >
                <Col span={7}>
                  {/* <Select defaultValue="line" style={{ width: "100%" }}>
                    <Select value="line">Line</Select>
                    <Select value="whatsapp">Whatsapp</Select>
                  </Select> */}
                  <Select
                    defaultValue={selectedMachine.machineId}
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      console.log(value)
                      setSelectedMachine(machines.find((machine) => machine.machineId === value) || machines[0])
                      handleFilterChange(undefined, value, undefined, undefined);
                    }}
                  >
                    {machines.map((machine) => (
                      <Select.Option key={machine.machineId} value={machine.machineId}>
                        {machine.machine.name}
                      </Select.Option>
                    ))}
                  </Select>

                </Col>

                <Col span={7}>
                  <Select
                    defaultValue="daily"
                    style={{ width: "100%" }}
                    onChange={(value) => handleReportDurationChange(value)}
                  >
                    <Select.Option value="daily">Daily</Select.Option>
                    <Select.Option value="weekly">Weekly</Select.Option>
                    <Select.Option value="monthly">Monthly</Select.Option>
                  </Select>
                </Col>

                <Col span={6}>
                  {reportDuration === 'daily' && (
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Select days"
                      onChange={(values) => handleWeekChange(values)}
                    >
                      <Select.Option value="monday">Monday</Select.Option>
                      <Select.Option value="tuesday">Tuesday</Select.Option>
                      <Select.Option value="wednesday">Wednesday</Select.Option>
                      <Select.Option value="thursday">Thursday</Select.Option>
                      <Select.Option value="friday">Friday</Select.Option>
                      <Select.Option value="saturday">Saturday</Select.Option>
                      <Select.Option value="sunday">Sunday</Select.Option>
                    </Select>  
                  )}
                  {reportDuration === 'weekly' && (
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Select weeks"
                      onChange={(values) => setSelectedWeeks(values)}
                    >
                      <Select.Option value="week1">Week 1</Select.Option>
                      <Select.Option value="week2">Week 2</Select.Option>
                      <Select.Option value="week3">Week 3</Select.Option>
                    </Select>
                  )}
                  {reportDuration === 'monthly' && (
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Select months"
                      onChange={(values) => setSelectedMonths(values)}
                    >
                      {/* Logic to dynamically generate month options */}
                      {/* For example, consider the current month is February 2024 */}
                      <Select.Option value="2024-02">February 2024</Select.Option>
                      <Select.Option value="2024-01">January 2024</Select.Option>
                      <Select.Option value="2023-12">December 2023</Select.Option>
                      {/* Add more months as needed */}
                    </Select>
                  )}
                </Col>

                <Col span={4}>
                  <Button type="primary" style={{ width: "100%" }}>
                    <DownloadOutlined />
                    Export
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>


          <Divider />

          <Row className='my-5 py-5'>
            <Col span={24} className='text-center'>
              <Text style={{ fontSize: "20px", fontWeight: "bold", textAlign: "center" }}>Import Template</Text>
              <br />
              <Text style={{ fontSize: "16px", textAlign: "center" }}>Pilih file excel yang akan di-import dan dijadikan template untuk Report</Text>
            </Col>
          </Row>

          <Row className='p-5'>
            <Col span={24} className='pb-2'>
              <Text style={{ fontSize: "16px" }}>Current Excel Template</Text>
            </Col>
            <Col span={24}>
              <Row gutter={16} style={{ border: "1px solid rgba(5, 5, 5, 0.26)", borderRadius: 5, padding: "10px" }}>
                <Col span={2}>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid rgba(5, 5, 5, 0.26)", borderRadius: 5, padding: "13px", backgroundColor: "#F5F5F5" }} >
                    <FileExcelOutlined style={{ fontSize: 25 }} />
                  </div>
                </Col>
                <Col span={4} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Text type='secondary' style={{ fontSize: "16px" }}>
                    (Weekly)
                  </Text>
                </Col>
                <Col span={10} style={{ display: "flex", alignItems: "center" }}>
                  <Text style={{ fontSize: "16px" }}>
                    Template 1.xlsx
                  </Text>
                </Col>
                <Col span={4} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Button type="primary" style={{ width: "100%" }}>
                    Replace
                  </Button>
                </Col>
                <Col span={4} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Button type="primary" style={{ width: "100%" }}>
                    Download
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

        </React.Fragment>
      </div >

    </React.Fragment>
  );
};

export const ContainerFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
`;

export default Categories;

