import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  TableProps,
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
import { initialProduct, ProductProps } from '../../types/products.type';
import { CategoryProps } from '../../types/category.type';
import CustomPagination from '../../components/CustomPagination';
import { IconArrowDown } from '../../assets/icons';
import { getCategoryName } from '../../helpers/text';
import { FetchAllProductPricesScheduleResponse, ProductPricesScheduleProps } from '../../types/productPricesSchedules';

interface ResponseProps extends BaseResponseProps<ProductProps> {
  payload: Omit<ProductProps, 'createdAt' | 'updatedAt'>;
}

const { Text } = Typography;

const Products = () => {
  const navigate = useNavigate();

  const [isModalHighlightVisible, setIsModalHighlightVisible] =
    React.useState<boolean>(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] =
    React.useState<boolean>(false);

  const [isLoadingUpdateStatus, setIsLoadingUpdateStatus] =
    React.useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [tmpData, setTmpData] = React.useState<ProductProps>(initialProduct);
  const [categories, setCategories] = React.useState<CategoryProps[]>([]);
  const [subCategories, setSubCategories] = React.useState<any>([]);
  const [price, setPrice] = React.useState<Number[]>([]);

  const {
    isLoading,
    data,
    pagination,
    fetchList,
    setData,
    setSearch,
    setQuery,
    changePage,
    changeLimit,
  } = useFetchList<ProductProps>({
    endpoint: 'products',
    // limit: +PAGE_SIZE_OPTIONS[0],
  });

  React.useEffect(() => {
    (async () => {
      try {
        const res = await httpRequest.get('/product/categories');
        setCategories(res?.data?.payload?.results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      const updatedPrices = [];

      for (const record of data) {
        if (record) {
          const variant = record?.productVariants;
          if (variant) {
            let firstVariant = variant[0];
            for (let i = 0; i < variant.length; i++) {
              if (variant[i].price < firstVariant.price) {
                firstVariant = variant[i];
              }

              try {
                const response = await httpRequest.get<any>(
                  `/product-prices-schedules/${firstVariant.productVariantId}`
                );
                console.log(response);
                const resPrice = response.data.payload.newUnitPrice;
                const startDate: Date = new Date(response.data.payload.processedAt);
                const endDate: Date = new Date(response.data.payload.scheduleAt);
                console.log(`tanggal awal ${startDate} tanggal akhir ${endDate} tanggal sekarang ${new Date()}`);
                if (startDate < new Date() && endDate > new Date()) {
                  firstVariant.price = resPrice;
                }
              } catch (err) {
                console.error(err);
              }
            }
            updatedPrices.push(firstVariant.price);
          }

        }
      }

      setPrice(updatedPrices);
      setIsLoadingUpdateStatus(false);
    }

    fetchData();
  }, [data]);

  const handleStatusChange = async () => {
    try {
      setIsLoadingUpdateStatus(true);
      let newData = [];
      newData = data.map((item) => {
        if (item.productId === tmpData.productId) {
          return {
            ...item,
            statusLoading: true,
          };
        }
        return item;
      });
      setData(newData);

      await httpRequest.patch<ResponseProps>('/products/' + tmpData.productId, {
        productId: tmpData.productId,
        isPublished: !tmpData.isPublished,
      });

      fetchList();

      // newData = data.map((item) => {
      //   if (item.productId === record.productId) {
      //     return {
      //       ...item,
      //       isPublished: record.isPublished,
      //       statusLoading: false,
      //     };
      //   }
      //   return item;
      // });
      // setData(newData);

      message.success('Success change ' + tmpData.productName + ' status.');

      setIsLoadingUpdateStatus(false);
      setIsModalVisible(false);
      setTmpData(initialProduct);
    } catch (error: any) {
      message.error(error.data.message);
      setIsModalVisible(false);
      setTmpData(initialProduct);
      setIsLoadingUpdateStatus(false);
    }
  };

  console.log(categories);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  const handleChangeCategory = async (value: string) => {
    setSelectedCategory(value);
    setSelectedSubCategory('');
    if (value === 'all') {
      setQuery((oldVal) => ({
        ...oldVal,
        category: '',
        subCategory: '',
      }));

      setSubCategories([]);
      setSelectedSubCategory('');
    } else {
      // setSubCategories(
      //   categories.find((category) => category.categoryId === value)
      //     ?.subCategories
      // );

      setQuery((oldVal) => ({
        ...oldVal,
        categoryId: value,
        subCategory: '',
      }));
    }
  };

  console.log(data);

  const handleChangeSubCategory = async (value: string) => {
    setSelectedSubCategory(value);
    setQuery((oldVal) => ({
      ...oldVal,
      category: selectedCategory,
      subCategory: value,
    }));
  };

  console.log('selectedCategory', selectedCategory);
  console.log('selectedSubCategory', selectedSubCategory);
  console.log('sub', subCategories);

  const handleHighlightChange = async () => {
    try {
      setIsLoadingUpdateStatus(true);
      let newData = [];
      newData = data.map((item) => {
        if (item.productId === tmpData.productId) {
          return {
            ...item,
            statusLoading: true,
          };
        }
        return item;
      });
      setData(newData);

      await httpRequest.patch<ResponseProps>('/products/' + tmpData.productId, {
        productId: tmpData.productId,
        isHighlight: !tmpData.isHighlight,
      });

      fetchList();

      message.success('Success change ' + tmpData.productName + ' highlight.');

      setIsLoadingUpdateStatus(false);
      setIsModalHighlightVisible(false);
      setTmpData(initialProduct);
    } catch (error: any) {
      message.error(error.data.message);
      setIsModalHighlightVisible(false);
      setTmpData(initialProduct);
      setIsLoadingUpdateStatus(false);
    }
  };

  const handleCreateProduct = () => {
    navigate('/products/add');
  };

  const { Option } = Select;

  const handleChangeStatus = (status: string) => {
    alert(status)
    if (status !== 'all') {
      setQuery((oldVal) => ({ ...oldVal, isPublished: status }));
    } else {
      setQuery((oldVal) => ({ ...oldVal, isPublished: '' }));
    }
  };

  const handleClickDetail = (e: ProductProps) => {
    navigate(`/products/${e.productId}`);
  };

  const handleClickAction = (props: ProductProps, key: string) => {
    if (key === 'detail') {
      navigate(`/products/${props.productId}`);
    } else if (key === 'edit') {
      navigate(`/products/${props.productId}/edit`);
    } else if (key === 'upload') {
      navigate(`/products/${props.productId}/add`);
    } else if (key === 'delete') {
      setIsModalDeleteVisible(true)
      setTmpData(props);
      console.log(tmpData)
    }
  };

  const handleDelete = async (props: ProductProps) => {
    const { productId } = props;

    try {
      setIsLoadingUpdateStatus(true);

      const res = await httpRequest.delete<any>(
        `/products/${productId}`
      )

      fetchList()

      message.success(`Delete product ${tmpData.productName} success`);
      setIsLoadingUpdateStatus(false);
      setIsModalDeleteVisible(false);
      setTmpData(initialProduct);
    } catch (error: any) {
      message.error(error.data.message);
      setIsModalDeleteVisible(false);
      setTmpData(initialProduct);
      setIsLoadingUpdateStatus(false);
    }
  }

  const columns = [
    {
      title: 'PRODUCT CODE',
      dataIndex: 'productCode',
      key: 'productCode',
      width: 150,
      render: (text: string, record: ProductProps) => {
        return (
          <Text
            className="table-link"
            onClick={() => handleClickDetail(record)}
          >
            {record?.productCode}
          </Text>
        );
      },
    },
    {
      title: 'PRODUCT NAME',
      dataIndex: 'productName',
      key: 'productName',
      width: 280,
      render: (text: string, record: ProductProps) => {
        return (
          <div
          // className="table-link" onClick={() => handleClickDetail(record)}
          >
            <p style={{ marginBottom: 0 }}>{record?.productName}</p>
            {/* {(() => {
              if (record.categories.length > 0) {
                const findSubCat = record.categories.filter(
                  (category) => category.parentCategoryId
                );
                const findCat = record.categories.filter(
                  (category) => !category.parentCategoryId
                );

                if (findCat.length > 0 && findSubCat.length > 0) {
                  return (
                    <p
                      style={{
                        fontSize: 12,
                        marginBottom: 0,
                        color: '#768499',
                      }}
                    >{`${findCat[0].categoryName}, ${findSubCat[0].categoryName}`}</p>
                  );
                } else if (findCat.length > 0 && findSubCat.length === 0) {
                  return (
                    <p
                      style={{
                        fontSize: 12,
                        marginBottom: 0,
                        color: '#768499',
                      }}
                    >{`${findCat[0].categoryName}`}</p>
                  );
                }
              } else {
                return <></>;
              }
            })()} */}
            {/* <p
              style={{
                fontSize: 12,
                marginBottom: 0,
                color: '#768499',
              }}
            >
              {getCategoryName(record?.categories, 'category')}
              {getCategoryName(record?.categories, 'subCategory')
                ? `, ${getCategoryName(record?.categories, 'subCategory')}`
                : ''}
            </p> */}
          </div>
        );
      },
    },
    {
      title: 'PRICE',
      dataIndex: 'productPrice',
      key: 'productPrice',
      width: 170,
      render: (text: string, record: ProductProps, index: number) => {

        return (
          <>
            {isLoadingUpdateStatus ? (
              'Loading...'
            ) : (
              <>
                {price[index] ? (
                  <>
                    IDR{' '}
                    {price[index].toLocaleString('id-ID')}
                  </>
                ) : (
                  <p style={{ marginBottom: 0, color: '#9FACBF' }}> Not Set</p>
                )}
              </>
            )}
          </>
        );
      },
    },
    // {
    //   title: "Categories",
    //   key: "categories",
    //   dataIndex: "categories",
    //   render: (status: any, record: ProductProps) => (
    //     <>
    //       {record.categories
    //         ? sortCategories(record.categories).map((element) => {
    //             return <Tag>{element.categoryName}</Tag>;
    //           })
    //         : []}
    //     </>
    //   ),
    // },
    {
      title: 'STATUS',
      key: 'status',
      dataIndex: 'status',
      width: 125,
      render: (status: any, record: ProductProps) => (
        <>
          {
            <Switch
              loading={record?.statusLoading}
              checked={record?.isPublished}
              onChange={() => {
                setIsModalVisible(true);
                setTmpData(record);
              }}
            />
          }
        </>
      ),
    },
    {
      title: 'IS HIGHLIGHT',
      key: 'highlight',
      dataIndex: 'highlight',
      width: 150,
      render: (status: any, record: ProductProps) => (
        <>
          {
            <Switch
              loading={record?.statusLoading}
              checked={record?.isHighlight}
              onChange={() => {
                setIsModalHighlightVisible(true);
                setTmpData(record);
              }}
            />
          }
        </>
      ),
    },
    {
      title: 'IMAGE',
      dataIndex: 'images',
      key: 'images',
      width: 70,
      render: (images: ProductProps['images']) => {
        return (
          <Image
            style={{
              objectFit: 'cover',
            }}
            width={40}
            height={40}
            preview={false}
            src={
              images && images?.length > 0
                ? images?.[0]?.imageUrl || '/images/blur-image.jpeg'
                : '/images/blur-image.jpeg'
            }
            placeholder={
              <Image
                preview={false}
                src="/images/blur-image.jpeg"
                width={40}
                height={40}
              />
            }
          />
        );
      },
    },
    {
      title: 'CREATED AT',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: (createdAt: any) => <div>{formatYearToTime(createdAt)}</div>,
    },
    {
      title: '',
      align: 'right',
      key: 'action',
      render: (_: any, record: ProductProps) => (
        <Dropdown overlay={() => menu(record)} placement="bottomRight">
          <MoreOutlined style={{ fontWeight: 700, cursor: 'pointer' }} />
        </Dropdown>
      ),
    },
  ] as TableProps<any>['columns'];

  const menu = (record: ProductProps) => (
    <Menu onClick={(e) => handleClickAction(record, e.key)}>
      <Menu.Item key="edit">Edit Product</Menu.Item>
      <Menu.Item key="detail">Detail Product</Menu.Item>
      <Menu.Item key="delete">Delete Product</Menu.Item>
      {/* <Menu.Item key="upload">Upload Images</Menu.Item> */}
    </Menu>
  );

  return (
    <React.Fragment>
      <HeaderSection
        title="Product"
        rightAction={
          <Space>
            <Button
              style={{ padding: '0px 32px' }}
              type="primary"
              onClick={() => navigate('/products/add')}
            >
              Add Product
            </Button>
          </Space>
        }
      />

      <Row gutter={{ xs: 8, sm: 15 }} className="mb-7.5">
        <Col span={12}>
          <Typography.Text className="text-3 text-gray block font-semibold mb-1">
            Search
          </Typography.Text>
          <Input
            placeholder="Search by product ID or product name"
            suffix={<SearchOutlined />}
            allowClear
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col span={8}>
          <Typography.Text className="text-3 text-gray block font-semibold mb-1">
            Status
          </Typography.Text>
          <Select
            defaultValue="all"
            allowClear
            onChange={handleChangeStatus}
            placeholder="Status"
            suffixIcon={<IconArrowDown />}
          >
            <Option value="all">All</Option>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Col>
        <Col span={4}>
          <Typography.Text className="text-3 text-gray block font-semibold mb-1">
            Category
          </Typography.Text>
          <Select
            defaultValue="all"
            allowClear
            onChange={handleChangeCategory}
            suffixIcon={<IconArrowDown />}
            placeholder="Category"
          >
            <Option value="all">All</Option>
            {categories.map((category) => (
              <Option key={category?.categoryId} value={category?.categoryId}>
                {category?.categoryName}
              </Option>
            ))}
          </Select>
        </Col>{' '}
        {/* <Col span={4}>
          <Typography.Text className="text-3 text-gray block font-semibold mb-1">
            Sub Category
          </Typography.Text>
          <Select
            allowClear
            onChange={handleChangeSubCategory}
            value={selectedSubCategory}
            disabled={
              selectedCategory === 'all' ||
              !subCategories ||
              subCategories.length === 0
            }
            suffixIcon={<IconArrowDown />}
            placeholder="Sub Category"
          >
            {subCategories !== undefined &&
              subCategories.map((sub: CategoryProps) => (
                <Option key={sub?.categoryId} value={sub?.categoryId}>
                  {sub?.categoryName}
                </Option>
              ))}
          </Select>
        </Col> */}
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

      <Modal
        title="Update status confirmation"
        visible={isModalVisible}
        onOk={handleStatusChange}
        onCancel={() => {
          setIsModalVisible(false);
          setTmpData(initialProduct);
        }}
        okText="Yes"
        confirmLoading={isLoadingUpdateStatus}
        okButtonProps={{ type: 'primary' }}
      >
        <p>
          Are you sure want to change <b>"{tmpData.productName}"</b> status to{' '}
          <b>"{!tmpData.isPublished ? 'Active' : 'Inactive'}"</b>?.{' '}
          {!tmpData.isPublished}
        </p>
      </Modal>
      <Modal
        title="Delete Confirmation"
        open={isModalDeleteVisible}
        onOk={() => handleDelete(tmpData)}
        onCancel={() => {
          setIsModalDeleteVisible(false);
        }}
        okText="Yes"
        confirmLoading={isLoading}
        okButtonProps={{ type: 'primary' }}
      >
        <p>
          Are you sure want to delete product {tmpData.productName}?
        </p>
      </Modal>
      <Modal
        title="Update highlight confirmation"
        visible={isModalHighlightVisible}
        onOk={handleHighlightChange}
        onCancel={() => {
          setIsModalHighlightVisible(false);
          setTmpData(initialProduct);
        }}
        okText="Yes"
        confirmLoading={isLoadingUpdateStatus}
        okButtonProps={{ type: 'primary' }}
      >
        <p>
          Are you sure want to change <b>"{tmpData.productName}"</b>{' '}
          {!tmpData.isHighlight ? 'to ' : 'remove from '}
          highlight?
          {/* <b>"{!tmpData.isPublished ? 'Active' : 'Inactive'}"</b>?.{' '} */}
          {/* {!tmpData.isPublished} */}
        </p>
      </Modal>
    </React.Fragment>
  );
};

export const ContainerFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
`;

export default Products;

function sortCategories(categories: CategoryProps[]) {
  categories.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
  return categories;
}
