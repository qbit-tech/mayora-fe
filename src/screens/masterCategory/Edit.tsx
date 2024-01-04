import {
  CloseOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Form,
  FormInstance,
  Input,
  Typography,
  message,
  Modal,
  Radio,
  Select,
  Space,
  Upload,
  Image,
  Button,
  Card,
  Spin,
  Row,
  Col,
  InputNumber,
  Divider,
  Switch,
  Table,
  TableProps,
} from 'antd';
import React, { useEffect, useRef } from 'react';
import {
  UploadChangeParam,
  RcFile,
  UploadProps,
  UploadFile,
} from 'antd/lib/upload/interface';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import HeaderSection from '../../components/HeaderSection';
import AppLayout from '../layout/AppLayout';
import { httpRequest } from '../../helpers/api';
import { BaseResponseProps } from '../../types/config.type';
import styled from 'styled-components';
import { generateFormRules } from '../../helpers/formRules';
import { generateQueryString } from '../../helpers/generateQueryString';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getErrorMessage } from '@qbit-tech/libs-react';
import {
  CategoryProps,
  initialProductCategories,
} from '../../types/category.type';
import { formatYearToTime } from '../../helpers/constant';

interface ILocation {
  categoryId: string;
}

interface ResponseProps extends BaseResponseProps<CategoryProps> {
  payload: Omit<CategoryProps, 'createdAt' | 'updatedAt'>;
}
const { Title, Text } = Typography;

const CategoryEdit: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId } = useParams<keyof ILocation>() as ILocation;
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingAction, setIsLoadingAction] = React.useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [isChangeStatusModalOpen, setIsChangeStatusModalOpen] =
    React.useState<boolean>(false);
  const [IsSubCatModalOpen, setIsSubCatModalOpen] =
    React.useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] =
      React.useState<boolean>(false);
  const [category, setCategory] = React.useState<CategoryProps>(
    initialProductCategories
  );
  const [tmpSubCategory, setTmpSubCategory] = React.useState<CategoryProps>(
    initialProductCategories
  );
  const [tmpSubCategoryId, setTmpSubCategoryId] = React.useState<any[]>([]);
  const [categories, setCategories] = React.useState<
    Array<Omit<CategoryProps, 'subCategories'>>
  >([]);

  const showModalBack = () => {
    setIsModalOpen(true);
  };

  const handleOkModalBack = () => {
    IsSubCatModalOpen ? setIsSubCatModalOpen(false) : navigate(-1);
    setIsModalOpen(false);
  };

  const handleCancelModalBack = () => {
    setIsModalOpen(false);
  };

  const createCategory = async (
    props: Omit<
      CategoryProps,
      'createdAt' | 'updatedAt' | 'categoryId' | 'statusLoading'
    >
  ) => {
    try {
      setIsLoadingAction(true);

      const res: any = await httpRequest.post('/product/categories', {
        categoryName: category.categoryName,
        description: category.description,
        isPublished: category.isPublished === false ? category.isPublished : true,
      });
      
      if (res && categories.length > 0) {
        const subCategories = categories.map((subcat: any) => {
          delete subcat.createdAt;
          return {
            ...subcat,
            parentCategoryId: res.data.payload.categoryId,
          };
        });

        await httpRequest.post('/product/categories/bulk', {
          bulk: subCategories,
        });
      }

      message.success('Success create ' + category.categoryName);
      navigate(-1);
    } catch (error) {
      setIsLoadingAction(false);
      message.error(getErrorMessage(error));
    }
  };

  const updateCategory = async (
    props: Omit<CategoryProps, 'createdAt' | 'updatedAt' | 'statusLoading'>
  ) => {
    try {
      setIsLoadingAction(true);

      const dataToBeSent = {
        categoryName: category.categoryName,
        description: category.description,
        isPublished: category.isPublished === false ? category.isPublished : true,
      };

      console.log(categoryId)

      if (categoryId) {
        await httpRequest.patch('/product/categories/' + categoryId, dataToBeSent)

        if (categories.length > 0) {
          const subCategories = categories.map((subcat: any) => {
            delete subcat.createdAt;
            return {
              ...subcat,
              parentCategoryId: categoryId,
            };
          });

          console.log(subCategories)
          console.log(tmpSubCategoryId)
          // return true;

          await httpRequest.post('/product/categories/bulk', {
            bulk: subCategories,
          });

          // if(tmpSubCategoryId.length > 0){
          //   await httpRequest.delete<any>(`/product/categories/${tmpSubCategoryId}`)
          // }

          // for (const categoryId of tmpSubCategoryId){
          //   console.log(categoryId)
          //   await httpRequest.delete<any>(`/product/categories/${categoryId}`)
          // }

        }
      }
      // return true
      message.success('Success update ' + props.categoryName + ' data');
      navigate(-1);
    } catch (error) {
      setIsLoadingAction(false);
      message.error(getErrorMessage(error));
    }
  };

  const createSubCat = async () => {
    try {
      setIsLoadingAction(true);

      const filter = ({ categoryName }: any) => ({ categoryName });

      const fields = filter({ ...tmpSubCategory });

      const checkDuplicate = categories.filter(
        (category) => category.categoryName === tmpSubCategory.categoryName
      );

      const errorMessage = [];

      for (const [key, value] of Object.entries(fields)) {
        if (!value) errorMessage.push(key + ' must not be empty');
      }

      if (checkDuplicate.length > 0)
        errorMessage.push('SubCategory name must be unique');

      if (errorMessage.length !== 0) {
        setIsLoadingAction(false);
        message.error(errorMessage[0]);
      }

      if (errorMessage.length === 0) {
        const formData = {
          categoryName: tmpSubCategory.categoryName,
          isPublished:
            tmpSubCategory.isPublished === false
              ? tmpSubCategory.isPublished
              : true,
          createdAt: new Date(),
        };

        setCategories([...categories, formData]);

        setTmpSubCategory(initialProductCategories);

        setIsSubCatModalOpen(false);
        setIsLoadingAction(false);
      }
    } catch (error) {
      if (getErrorMessage(error).includes('categoryName must be unique')) {
        message.error('Category Name already registered');
      } else {
        message.error(getErrorMessage(error));
      }
      setIsLoadingAction(false);
    }
  };

  const handleStatusChange = async () => {
    try {
      // setIsLoadingUpdateStatus(true);
      let newData = [];

      newData = categories.map((item) => {
        if (item.categoryName === tmpSubCategory.categoryName) {
          return {
            ...item,
            isPublished: !tmpSubCategory.isPublished,
            statusLoading: false,
          };
        }
        return item;
      });
      setCategories(newData);

      const dataToBeSent = {
        isPublished: tmpSubCategory.isPublished ? false : true
      }

      await httpRequest.patch(`/product/categories/${tmpSubCategory.categoryId}`, dataToBeSent);
      
      message.success(
        'Success change ' + tmpSubCategory.categoryName + ' status'
      );

      // setIsLoadingUpdateStatus(false);
      setIsChangeStatusModalOpen(false);
      setTmpSubCategory(initialProductCategories);
    } catch (error: any) {
      message.error(error.data.message);
      setIsChangeStatusModalOpen(false);
      setTmpSubCategory(initialProductCategories);
    }
  };

  const handleDelete = async () => {
    try {
      let newData = [];
      newData = categories.filter((item) => {
        return item.categoryName !== tmpSubCategory.categoryName;
      });
      setCategories(newData);
      setTmpSubCategoryId(prev => [...prev, tmpSubCategory.categoryId?.toString()]);

      await httpRequest.delete<any>(`/product/categories/${tmpSubCategory.categoryId}`)   
      
      message.success(
        `Success delete sub category ${tmpSubCategory.categoryName}`
      );

      setIsDeleteModalOpen(false);
      setTmpSubCategory(initialProductCategories);
    } catch (error: any) {
      message.error(error.data.message);
      setIsDeleteModalOpen(false);
      setTmpSubCategory(initialProductCategories);
    }
  };

  const handleSubmit = async (
    values: Omit<CategoryProps, 'createdAt' | 'updatedAt' | 'statusLoading'>
  ) => {
    if (categoryId) {
      updateCategory(values);
    } else {
      createCategory(values);
    }
  };

  React.useEffect(() => {
    if (categoryId) {
      const fetchCategoryDetail = async () => {
        try {
          setIsLoading(true);

          const res = await httpRequest.get<ResponseProps>(
            '/product/categories/' + categoryId
          );
          console.log('product object : ', res.data.payload);
          form.setFieldsValue({
            ...res.data.payload,
          });
          setCategory(res.data.payload)
          setCategories(res.data.payload.subCategories);

          const bcDetails = [
            {
              field: 'categoryId',
              value: categoryId,
              label: res.data.payload.categoryName,
            },
          ];

          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      };
      fetchCategoryDetail();
    }
  }, [categoryId, location]);

  const columns = [
    {
      title: 'NAME',
      dataIndex: 'categoryName',
      key: 'categoryName',
      align: 'left',
      width: 400,
      render: (text: string, record: CategoryProps) => record?.categoryName,
    },
    {
      title: 'STATUS',
      key: 'isPublished',
      dataIndex: 'isPublished',
      align: 'left',
      render: (isPublished: any, record: CategoryProps) => (
        <>
          {
            <Switch
              checked={isPublished === true}
              onChange={() => {
                setIsChangeStatusModalOpen(true);
                setTmpSubCategory(record);
              }}
            />
          }
        </>
      ),
    },
    {
      title: 'CREATED AT',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'left',
      render: (createdAt: any) => <div>{formatYearToTime(createdAt)}</div>,
    },
    {
      title: ' ',
      key: 'action',
      render: (_: any, record: CategoryProps) => (
        <Button
          onClick={() => {
            setIsDeleteModalOpen(true);
            setTmpSubCategory(record);
          }}
          style={{ background: 'transparent', border: 'none' }}
          icon={<DeleteOutlined />}
        ></Button>
      ),
    },
  ] as TableProps<any>['columns'];


  return (
    <React.Fragment>
      <HeaderSection
        icon="back"
        title={(categoryId ? 'Edit' : 'Add') + ' Category'}
        // subtitle="Manage your menu data"
        rightAction={
          <Space>
            <Button
              style={{ padding: '0px 32px' }}
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              style={{ padding: '0px 32px' }}
              loading={isLoadingAction}
              type="primary"
              onClick={() => form.submit()}
            >
              Save
            </Button>
          </Space>
        }
      />

      <Spin spinning={isLoading}>
        <Card bordered={false}>
          <Form
            form={form}
            name="productForm"
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Row>
              <Col span={5}>
                <Title level={5}>Category</Title>
                <Text style={{ color: '#768499' }}>
                  These are {!categoryId ? 'add' : 'edit'} category, you can change anything
                </Text>
              </Col>
              <Col offset={1} span={16}>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="categoryName"
                    >
                      <Title
                        level={5}
                        style={{
                          color: '#768499',
                          marginBottom: 2,
                          fontSize: 14,
                        }}
                      >
                        Category Name
                      </Title>
                      <Input
                        width="100%"
                        value={category?.categoryName}
                        onChange={(e) =>
                          setCategory({
                            ...category,
                            categoryName: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      label="Description"
                      name="description"
                    >
                      
                      <Input.TextArea
                        onChange={(e) =>
                          setCategory({
                            ...category,
                            description: e.target.value,
                          })
                        }
                        rows={4}
                        placeholder="Input description"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="isPublished"
                    >
                      <Title
                        level={5}
                        style={{
                          color: '#768499',
                          marginBottom: 2,
                          fontSize: 14,
                        }}
                      >
                        Status
                      </Title>
                      <Radio.Group
                        onChange={(e) =>
                          setCategory({
                            ...category,
                            isPublished: e.target.value,
                          })
                        }
                        defaultValue={true}
                        value={category?.isPublished}
                      >
                        <CustomRadio value={true}>Active</CustomRadio>
                        <CustomRadio value={false}>Inactive</CustomRadio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span={22}>
                <Divider />
              </Col>
            </Row>
          </Form>
          <Row>
            <Col span={5}>
              <Title level={5}>Sub Category</Title>
              <Text style={{ color: '#768499' }}>
                These are sub category list you can {!categoryId ? 'add' : 'edit'} anything
              </Text>
            </Col>
            <Col offset={1} span={16}>
              <Row className="mb-3" justify="end">
                <Button
                  type="primary"
                  onClick={() => {
                    setIsSubCatModalOpen(true);
                    console.log(categories);
                  }}
                >
                  Add Sub Category
                </Button>
              </Row>
              <Row>
                <Col span={24}>
                  <Table
                    loading={isLoading}
                    columns={columns}
                    pagination={false}
                    dataSource={categories && categories}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Spin>

      <Modal
        width={700}
        open={IsSubCatModalOpen}
        onOk={() => {
          createSubCat();
        }}
        onCancel={() => {
          showModalBack();
        }}
        okText="Save"
        confirmLoading={isLoadingAction}
        okButtonProps={{ type: 'primary' }}
      >
        <Title level={4} style={{ color: 'black', marginBottom: 20 }}>
          Add Sub Category
        </Title>
        <Form
          form={form}
          name="subcatform"
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
          >
            <Title
              level={5}
              style={{ color: '#768499', marginBottom: 2, fontSize: 14 }}
            >
              Category Name
            </Title>
            <Input
              width="100%"
              value={tmpSubCategory.categoryName}
              onChange={(e) =>
                setTmpSubCategory({
                  ...tmpSubCategory,
                  categoryName: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item
          >
            <Title
              level={5}
              style={{ color: '#768499', marginBottom: 2, fontSize: 14 }}
            >
              Status
            </Title>
            <Radio.Group
              onChange={(e) => {
                setTmpSubCategory({
                  ...tmpSubCategory,
                  isPublished: e.target.value,
                });
              }}
              defaultValue={true}
              value={tmpSubCategory.isPublished}
            >
              <CustomRadio value={true}>Active</CustomRadio>
              <CustomRadio value={false}>Inactive</CustomRadio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Cancel Confirmation"
        open={isModalOpen}
        onOk={handleOkModalBack}
        onCancel={handleCancelModalBack}
      >
        <p>Are you sure ? Your data won't be save.</p>
      </Modal>

      <Modal
        title="Update status confirmation"
        open={isChangeStatusModalOpen}
        onOk={handleStatusChange}
        onCancel={() => {
          setIsChangeStatusModalOpen(false);
          setTmpSubCategory(initialProductCategories);
        }}
        okText="Yes"
        okButtonProps={{ type: 'primary' }}
      >
        <p>
          Are you sure want to change <b>"{tmpSubCategory.categoryName}"</b>{' '}
          status to <b>"{!tmpSubCategory.isPublished ? 'Active' : 'Inactive'}"</b>
          ?. {!tmpSubCategory.isPublished}
        </p>
      </Modal>
      <Modal
        title="Delete confirmation"
        open={isDeleteModalOpen}
        onOk={handleDelete}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setTmpSubCategory(initialProductCategories);
        }}
        okText="Yes"
        okButtonProps={{ type: 'primary' }}
      >
        <p>
          Are you sure want to delete <b>"{tmpSubCategory.categoryName}"</b> ?
        </p>
      </Modal>
    </React.Fragment>
  );
};

export default CategoryEdit;

const CustomRadio = styled(Radio)`
  margin-right: 5rem;
  .ant-radio-checked .ant-radio-inner {
    border-color: #1e1e1e;
    border-width: 2px;
    box-shadow: none;
  }
  .ant-radio:hover .ant-radio-inner {
    background-color: white;
  }
  .ant-radio-checked .ant-radio-inner:after {
    background-color: #1e1e1e;
  }
`;

const CustomUpload = styled(Upload)`
  .ant-upload {
    text-align: left;
    display: none;
  }

  .ant-upload-list-picture-card .ant-upload-list-item {
    padding: 0;
    border: none;
  }

  .ant-upload-list-picture-card-container {
    width: 144px !important;
    height: 104px;
    margin-right: 0;
  }

  .ant-upload-list-picture-card .ant-upload-list-item-thumbnail,
  .ant-upload-list-picture-card .ant-upload-list-item-thumbnail img {
    object-fit: cover !important;
  }
`;
