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
import React, { useEffect, useRef, useState } from 'react';
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
import { BaseResponseProps, HttpParam } from '../../types/config.type';
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
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import { CategoryList } from '../../data/model';
import { Http } from '../../utility/http';

interface ILocation {
  idCategory: string;
  shift:string;
  idMachine: string
}

interface ResponseProps extends BaseResponseProps<CategoryProps> {
  payload: Omit<CategoryProps, 'createdAt' | 'updatedAt'>;
}
const { Title, Text } = Typography;

const CategoryEdit: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { idCategory, shift, idMachine } = useParams<keyof ILocation>() as ILocation;
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingAction, setIsLoadingAction] = React.useState<boolean>(false);
  const [remark, setRemark] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [idManual, setIdManual] = useState<string>('')
  const [idCategoryData, setIdCategory] = useState<string>('')
  const [categoryName, setCategoryName] = useState<string>('')

  const fetchDetail = async () => {
    try {
      setIsLoading(true);

      const res = await httpRequest.get(
        '/manual-collections/' + idCategory + "/" + Number(shift)
      );
      const data: IManualollectionListItem = res.data.payload
      setIdManual(data.id)
      setRemark(data.remark)
      setValue(data.value)
      setIdCategory(data.categoryId)

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const fetchCategoryDetail = async () => {
    try {
      setIsLoading(true);

      const res = await httpRequest.get(
        '/categories/' + idCategory
      );
      const data: CategoryList = res.data.payload
      setCategoryName(data.name)
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (idCategory && shift) {
      fetchDetail();
      fetchCategoryDetail()
    }
  }, [location]);

  const handleCreate = async () =>{
    console.log("cretae awal dulu")
    if (value === "" || value === null || value === undefined) {
      return message.error("Value Name is required");
    }

    if (idCategory === "" || idCategory === null || idCategory === undefined) {
      return message.error("Id Category is required");
    }

    if (shift === "" || shift === null || shift === undefined) {
      return message.error("Shift is required");
    }

    try {
      setIsLoading(true)
      const params: HttpParam = {
        data: {
          machineId: idMachine,
          categoryId: idCategory,
          shift: Number(shift),
          value:value,
          remark:remark
        },
        method: "post",
        path: 'manual-collections'
      };

      const result = await Http(params);
      if (result.code === "success") {
        navigate('/manual-collection')
        setIsLoading(false)
        message.success("Successfully created manual collection");
      }else{
        setIsLoading(false)
        return message.error("Error create category");
      }
    } catch (error) {
        setIsLoading(false)
        return message.error("Error create category");
    }

  }

  const editManual = async() =>{
    if (value === "" || value === null || value === undefined) {
        return message.error("Value Name is required");
    }

    if (idManual === "" || idManual === null || idManual === undefined) {
      return message.error("Id Category is required");
    }

    if (idCategoryData === "" || idCategoryData === null || idCategoryData === undefined) {
      return message.error("Id Category is required");
    }

    try {
      setIsLoading(true)
      const params: HttpParam = {
        data: {
          categoryId: idCategoryData,
          value:value,
          remark:remark
        },
        method: "patch",
        path: 'manual-collections/' + idManual
      };

      const result = await Http(params);
      if (result.code === "success") {
        navigate('/manual-collection')
        setIsLoading(false)
        message.success("Successfully edited manual collection");
      }else{
        setIsLoading(false)
        return message.error("Error create category");
      }
    } catch (error) {
        setIsLoading(false)
        return message.error("Error create category");
    }
  }

  return (
    <React.Fragment>
      <HeaderSection
        icon="back"
        title={'Edit'+ ' Manual Collection'}
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
              onClick={() => idManual === '' ||  idManual === undefined || idManual === null ? handleCreate() : editManual()}
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
                    disabled
                    placeholder="Shift"
                    value={shift}
                />
            </InputWithLabel>
            <InputWithLabel label="Category">
                <Input
                    style={{ marginBottom: 10 }}
                    placeholder="Category"
                    value={categoryName}
                    disabled
                />
            </InputWithLabel>
            <InputWithLabel label="Value">
                <Input
                    style={{ marginBottom: 10 }}
                    onChange={(e)=>setValue(e.target.value)}
                    placeholder="Value"
                    value={value}
                    type='number'
                />
            </InputWithLabel>
            <InputWithLabel label="Remark">
                <TextArea
                    style={{ marginBottom: 10 }}
                    onChange={(e)=>setRemark(e.target.value)}
                    placeholder="Remark"
                    value={remark}
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
