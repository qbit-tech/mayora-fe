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
  Divider,
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

  const { setBreadcrumbDetails } = useDetailBreadcrumbs();
  // const [categories, setCategories] = React.useState<CategoryProps[]>([]);
  // const [isLoading, setIsLoading] =
  //   React.useState<boolean>(false);
  const [isLoadingUpdateStatus, setIsLoadingUpdateStatus] =
    React.useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [tmpData, setTmpData] = React.useState<CategoryProps>(
    initialProductCategories
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
    endpoint: 'product/releases',
    limit: +PAGE_SIZE_OPTIONS[0],
  });

  React.useEffect(() => {
    const newSearch = queryParams.get('search') || '';
    const newStatus = queryParams.get('status') || '';
    const newPage = queryParams.get('page');
    setSearch(newSearch);
    handleChangeStatus(newStatus);
    if (newPage) {
      changePage(parseInt(newPage), pagination.perPage);
    }
  }, [location.search, setSearchQuery, setStatusValue, setPageValue]);

  React.useEffect(() => {
    const newPage = queryParams.get('page');
    if (newPage && isFirstRender) {
      setIsFirstRender(false);
      handleFilterChange(undefined, undefined, newPage);
      return;
    }
    handleFilterChange(undefined, undefined, pagination.page.toString());
  }, [changePage]);

  const handleFilterChange = (search?: string, status?: string, page?: string) => {
    if (search && status && page) {
      setSearchQuery(search);
      queryParams.set('search', search);
      setStatusValue(status);
      queryParams.set('status', status);
      setPageValue(page);
      queryParams.set('page', page);
      setSearch(search);
      handleChangeStatus(status);
    }
    else if (status || status === '') {
      searchQuery && queryParams.set('search', searchQuery);
      setStatusValue(status);
      status && queryParams.set('status', status);
      queryParams.set('page', pagination.page.toString());
      handleChangeStatus(status);
    }
    else if (search || search === '') {
      setSearchQuery(search);
      search && queryParams.set('search', search);
      statusValue && queryParams.set('status', statusValue);
      queryParams.set('page', pagination.page.toString());
      setSearch(search);
    }
    else if (page) {
      setPageValue(page);
      searchQuery && queryParams.set('search', searchQuery);
      statusValue && queryParams.set('status', statusValue);
      page && queryParams.set('page', page);
    }

    if (queryParams) {
      const queryString = queryParams.toString();
      window.history.pushState(null, '', `?${queryString}`);
    }
  };


  const { Option } = Select;

  const handleChangeStatus = (status: string) => {

    if (status !== 'all') {
      setQuery((oldVal) => ({ ...oldVal, isPublished: status }));
    } else {
      setQuery((oldVal) => ({ ...oldVal, isPublished: '' }));
    }
  };

  const handleClickDetail = (e: CategoryProps) => {
    navigate(`/categories/${e.categoryId}`);
  };

  const handleClickAction = (props: CategoryProps, key: string) => {
    if (key === 'detail') {
      navigate(`/categories/${props.categoryId}`);
    } else if (key === 'edit') {
      navigate(`/categories/${props.categoryId}/edit`);
    } else if (key === 'delete') {
      setIsModalVisible(true)
      setTmpData(props);
      console.log(tmpData)
    }
  };

  const handleDelete = async (props: CategoryProps) => {
    const { categoryId } = props;

    try {
      setIsLoading(true);

      const res = await httpRequest.delete<any>(
        `/product/categories/${categoryId}`
      )

      fetchList()

      message.success(`Delete category ${tmpData.categoryName} success`);
      setIsLoading(false);
      setIsModalVisible(false);
      setTmpData(initialProductCategories);
    } catch (error: any) {
      message.error(error.data.message);
      setIsModalVisible(false);
      setTmpData(initialProductCategories);
      setIsLoading(false);
    }
  }

  console.log(data);

  const exampleData = [
    {
      releaseName: 'Tes1',
      releaseAmount: 100,
      isPublished: true,

    },
    {
      releaseName: 'Tes2',
      releaseAmount: 200,
      isPublished: false,

    },
    {
      releaseName: 'Tes3',
      releaseAmount: 300,
      isPublished: true,

    },
  ]

  const columns = [
    {
      title: 'Time',
      dataIndex: 'releaseName',
      key: 'releaseName',
      align: 'center',
      width: '50%',
      render: (text: string, record: ReleaseProps) => {
        return (
          <div className="">
            {record?.releaseName?.includes('-')
              ? replaceDashWithSpace(record.releaseName)
              : record?.releaseName?.charAt(0)?.toUpperCase() +
              record?.releaseName?.toLowerCase()?.slice(1)}
          </div>
        );
      }
    },
    {
      title: 'Amount',
      dataIndex: 'releaseAmount',
      key: 'releaseAmount',
      align: 'center',
      width: '50%',
      render: (text: string, record: ReleaseProps) => {
        return (
          <div className="">
            {record?.releaseAmount}
          </div>
        );
      }
    },
  ] as TableProps<ReleaseProps>['columns'];

  const totalAmount = exampleData.reduce((acc, cur) => acc + cur.releaseAmount, 0);

  const menu = (record: CategoryProps) => (
    <Menu onClick={(e) => handleClickAction(record, e.key)}>
      <Menu.Item key="edit">Edit Category</Menu.Item>
      <Menu.Item key="detail">Detail Category</Menu.Item>
      <Menu.Item key="delete">Delete Category</Menu.Item>
    </Menu>
  );

  return (
    <React.Fragment>
      <HeaderSection
        // icon={<TagOutlined />}
        title="Release"
      // subtitle="Manage your Categories"
      />
      <div style={{ height: '500px', width: '100%', backgroundColor: 'white', padding: "20px" }}>
        <React.Fragment>

          <Row>
            <Col span={12}>
              <Text>Data Release By System</Text>
            </Col>
            <Col span={12} className='text-right'>
              <Text style={{ color: "red", fontWeight: "bold" }} >Total Release: 1198</Text>
            </Col>
          </Row>

          <Divider />

          <Row gutter={16}>
            {[1, 2, 3].map((index) => (
              <React.Fragment>
                <Col span={8} key={index}>
                  <Text style={{ fontWeight: "bold" , fontSize: 15}}>Shift {index}</Text>
                  <Table
                    rowKey='categoryId'
                    columns={columns}
                    dataSource={exampleData}
                    loading={isLoading}
                    pagination={false}
                    style={{ marginTop: 10 }}
                    footer={() => (
                      <Row className="text-center m-0 p-0" gutter={20}>
                        <Col span={12} className="text-center">
                          <Text style={{ fontWeight: "bold" }}>Total</Text>
                        </Col>
                        <Col span={12} className='text-center'>
                          <Text style={{ fontWeight: "bold", color: "red" }}>{totalAmount}</Text>
                        </Col>
                      </Row>
                    )} />
                </Col>

              </React.Fragment>
            ))}

            <CustomPagination
              data={data && data}
              pagination={pagination}
              changeLimit={changeLimit}
              changePage={changePage}
            />
          </Row>

        </React.Fragment>
      </div >

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

