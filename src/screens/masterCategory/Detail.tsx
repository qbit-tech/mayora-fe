import {
  Row,
  Col,
  Card,
  Typography,
  Image,
  Divider,
  Table,
  Switch,
  Button,
  TableProps,
  Modal,
  message,
  Space,
  Form,
  Input,
  Radio,
  Spin,
  Tag,
} from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderSection from '../../components/HeaderSection';
import { httpRequest } from '../../helpers/api';
import { BaseResponseProps } from '../../types/config.type';
import {
  CategoryProps,
  initialProductCategories,
} from '../../types/category.type';
import { formatYearToTime } from '../../helpers/constant';
import { replaceDashWithSpace } from '../../helpers/replaceDashWithSpace';
import { capitalizeFirstLetter } from '../../helpers/text';
import useDetailBreadcrumbs from '../../hooks/useDetailBreadcrumbs';
import styled from 'styled-components';
import { DeleteOutlined } from '@ant-design/icons';
import NotSet from '../../components/NotSet';

interface ResponseProps extends BaseResponseProps<CategoryProps> {
  payload: Omit<CategoryProps, 'createdAt' | 'updatedAt'>;
}

interface ILocation {
  categoryId: string;
}

const { Title, Text } = Typography;

const CategoryDetail: React.FC = () => {
  const [form] = Form.useForm();
  const { categoryId } = useParams<keyof ILocation>() as ILocation;
  const navigate = useNavigate();
  const { setBreadcrumbDetails } = useDetailBreadcrumbs();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingAction, setIsLoadingAction] = React.useState<boolean>(false);
  const [category, setCategory] = React.useState<CategoryProps>(
    initialProductCategories
  );
  const [categories, setCategories] = React.useState<
    Array<Omit<CategoryProps, 'subCategories'>>
  >([]);

  const [isChangeStatusModalOpen, setIsChangeStatusModalOpen] =
    React.useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    React.useState<boolean>(false);
  const [isAddSubCategoryModal, setIsAddSubCategoryModal] =
    React.useState<boolean>(false);
  const [tmpSubCategory, setTmpSubCategory] = React.useState<CategoryProps>(
    initialProductCategories
  );
  const [IsSubCatModalOpen, setIsSubCatModalOpen] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchCategoryDetail = async () => {
      try {
        setIsLoading(true);

        const res = await httpRequest.get<ResponseProps>(
          '/product/categories/' + categoryId
        );
        const getPointAmount = await httpRequest.get<any>(
          '/app-configs/' + `POINT_${categoryId}`
        );

        const split = getPointAmount?.data?.payload?.value?.includes('/')
          ? getPointAmount?.data?.payload?.value?.split('/')
          : [];

        setCategory({
          ...res.data.payload,
        });

        setCategories(res.data.payload.subCategories);

        const bcDetails = [
          {
            field: 'categoryId',
            value: categoryId,
            label: 'Detail Category',
          },
        ];
        setBreadcrumbDetails(bcDetails);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchCategoryDetail();
  }, [categoryId, isLoadingAction]);


  const handleEditCategory = () => {
    navigate('/categories/' + categoryId + '/edit');
  };

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
              disabled={true}
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
  ] as TableProps<any>['columns'];

  return (
    <React.Fragment>
      <HeaderSection
        icon="back"
        title={capitalizeFirstLetter(category?.categoryName)}
        rightAction={
          <Space>
            <Button
              style={{ padding: '0px 32px' }}
              type="primary"
              onClick={handleEditCategory}
            >
              Edit
            </Button>
          </Space>
        }
      />
      {isLoading ? (
        <Spin spinning />
      ) : (
        <>
          <Spin spinning={isLoading}>
            <Spin spinning={isLoading}>
              <Card bordered={false}>
                <Form
                  form={form}
                  name="productForm"
                  layout="vertical"
                  autoComplete="off"
                >
                  <Row>
                    <Col span={5}>
                      <Title level={5}>Category</Title>
                    </Col>
                    <Col offset={1} span={16}>
                      <Row style={{ marginBottom: '0.7rem' }}>
                        <Col span={24}>
                          <Title
                            level={5}
                            style={{
                              marginBottom: 2,
                              fontSize: 14,
                            }}
                          >
                            Category Name
                          </Title>
                          <Text>
                            {category?.categoryName}
                          </Text>
                        </Col>
                      </Row>
                      <Row style={{ marginBottom: '0.7rem' }}>
                        <Col span={24}>
                          <Title
                            level={5}
                            style={{
                              marginBottom: 5,
                              fontSize: 14,
                            }}
                          >
                            Description
                          </Title>
                          <Text>
                            {
                              category?.description ? category?.description : <NotSet value='No Description' />
                            }
                          </Text>
                        </Col>
                      </Row>
                      <Row style={{ marginBottom: '0.7rem' }}>
                        <Col span={24}>
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
                          {
                            <Tag
                              style={{
                                border: `2px solid ${category?.isPublished ? '#31d63a' : '#D81F64'}`,
                                color: `${category?.isPublished ? '#31d63a' : '#D81F64'}`,
                              }}
                            >
                              {category?.isPublished ? 'Active' : 'Inactive'}
                            </Tag>
                          }
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
                  </Col>
                  <Col offset={1} span={16}>
                    <Row style={{ marginBottom: '0.7rem' }}>
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
          </Spin>
        </>
      )}
    </React.Fragment>
  );
};

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

export default CategoryDetail;
