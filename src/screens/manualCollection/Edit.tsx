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
import { InputWithLabel } from '../../components/InputWithLabel';
import { IManualollectionListItem } from '../../data/model/manual-collection';

interface ILocation {
  id: string;
}

interface ResponseProps extends BaseResponseProps<CategoryProps> {
  payload: Omit<CategoryProps, 'createdAt' | 'updatedAt'>;
}
const { Title, Text } = Typography;

const CategoryEdit: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<keyof ILocation>() as ILocation;
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
  const [category, setCategory] = React.useState<IManualollectionListItem>();
  const [tmpSubCategory, setTmpSubCategory] = React.useState<CategoryProps>(
    initialProductCategories
  );
  const [tmpSubCategoryId, setTmpSubCategoryId] = React.useState<any[]>([]);
  const [categories, setCategories] = React.useState<
    Array<Omit<CategoryProps, 'subCategories'>>
  >([]);



  React.useEffect(() => {
    if (id) {
      const fetchDetail = async () => {
        try {
          setIsLoading(true);

          const res = await httpRequest.get<ResponseProps>(
            '/manual-collection/' + id
          );
          console.log('product object : ', res.data.payload);
          // const manual: IManualollectionListItem = res.data.payload
          // setCategory(manual)
          setCategories(res.data.payload.subCategories);

          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      };
      fetchDetail();
    }
  }, [location]);



  return (
    <React.Fragment>
      <HeaderSection
        icon="back"
        title={'Edit'+ ' Category'}
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
            // onFinish={handleSubmit}
            autoComplete="off"
          >
            <InputWithLabel label="Shift">
                <Input
                    style={{ marginBottom: 10 }}
                    // onChange={(e)=>props.setValue(e.target.value)}
                    placeholder="Category"
                    // value={props.value}
                />
            </InputWithLabel>
            
          </Form>
        </Card>
      </Spin>
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
