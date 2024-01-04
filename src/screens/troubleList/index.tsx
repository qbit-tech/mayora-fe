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
        'product/categories/' + tmpData.categoryId,
        {
          categoryId: tmpData.categoryId,
          // published: !tmpData.published,
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

      fetchList();

      message.success('Success change ' + tmpData.categoryName + ' status.');

      setIsLoadingUpdateStatus(false);
      setIsModalVisible(false);
      setTmpData(initialProductCategories);
    } catch (error: any) {
      message.error(error.data.message);
      setIsModalVisible(false);
      setTmpData(initialProductCategories);
      setIsLoadingUpdateStatus(false);
    }
  };

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

  const handleCreateCategory = () => {
    navigate('/categories/add');
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

  const columns = [
    {
      title: 'NAME',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 200,
      render: (text: string, record: CategoryProps) => {
        return (
          <div className="table-link" onClick={() => handleClickDetail(record)}>
            {record?.categoryName?.includes('-')
              ? replaceDashWithSpace(record.categoryName)
              : record?.categoryName?.charAt(0)?.toUpperCase() +
              record?.categoryName?.toLowerCase()?.slice(1)}
          </div>
        );
      },
    },
    {
      title: 'DESCRIPTION',
      dataIndex: 'description',
      key: 'description',
      align: 'left',
      render: (description: string, record: CategoryProps) => (
        <div style={{ textAlign: 'justify' }}>{
          record.description ? record.description.length > 200 ?
            <p>
              {
                record.description.split(/\s+/, 35).join(' ') + '...'
              } <span style={{ color: 'blue' }}>Read more</span>
            </p> : record.description :
            <NotSet value='No Description' />
        }</div>

      )
    },
    {
      title: 'STATUS',
      key: 'status',
      dataIndex: 'status',
      render: (status: any, record: CategoryProps) => (
        <>
          {
            <>
              {/* <Switch
              loading={record.statusLoading}
              checked={record.isPublished}
              onChange={() => {
                setIsModalVisible(true);
                setTmpData(record);
              }}
            /> */}
              <Text>
                {record.isPublished === true ?
                  <Tag
                    style={{
                      border: "2px solid #31d63a",
                      color: "#31d63a",
                    }}>
                    Active
                  </Tag>
                  :
                  <Tag
                    style={{
                      border: "2px solid #D81F64",
                      color: "#D81F64",
                      marginBottom: "7%",
                    }}
                  >
                    Inactive
                  </Tag>}
              </Text>
            </>
          }
        </>
      ),
    },
    {
      title: 'CREATED AT',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: any) => <div>{formatDate(createdAt)}</div>,
    },
    {
      title: 'ACTION',
      key: 'action',
      render: (_: any, record: CategoryProps) => (
        <Dropdown overlay={() => menu(record)} placement="bottomRight">
          <MoreOutlined style={{ cursor: 'pointer' }} />
        </Dropdown>
      ),
    },
  ] as TableProps<CategoryProps>['columns'];

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
        title="Trouble List"
        // subtitle="Manage your Categories"
      />
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

