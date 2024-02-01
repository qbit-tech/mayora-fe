import {
  CloseOutlined,
  DeleteOutlined,
  PlusOutlined,
  RightOutlined,
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
import { ITroubleListItem } from '../../data/model/trouble';
import moment from 'moment';
import { CategoryList } from '../../data/model';
import axios from 'axios';
import { Http } from '../../utility/http';

interface ILocation {
  id: string;
  idCategory: string;
}

const CategoryEdit: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, idCategory } = useParams<keyof ILocation>() as ILocation;
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingCategory, setIsLoadingCategory] = React.useState<boolean>(false);
  const [trouble, setTrouble] = React.useState<ITroubleListItem>();
  const [category, setCategory] = React.useState<CategoryList>();
  const [remark, setRemark] = React.useState<string>('');

    const getDuration = () =>{
      const inputMoment = moment(trouble?.endTime);
      const duration = moment.duration(inputMoment.diff(trouble?.startTime));
      return duration.asMinutes()
    }

  const editTrouble = async() =>{
    if (remark === "" || remark === null || remark === undefined) {
        return message.error("Remark is required");
    }

    if (idCategory === "" || idCategory === null || idCategory === undefined) {
      return message.error("Category Id is required");
    }

    if (id === "" || id === null || id === undefined) {
      return message.error("Id Trouble is required");
    }
    try {
      setIsLoading(true)
      const params: HttpParam = {
        data: {
          remark:remark,
          categoryId:idCategory
        },
        method: "patch",
        path: 'troubles/' + id,
      };

      const result = await Http(params);
      if (result.code === "success") {
        navigate('/trouble-list')
        message.success("Successfully edit trouble");
      }
      setIsLoading(false)
    } catch (error) {
        setIsLoading(false)
        return message.error("Error edit trouble");
    }
  }

  React.useEffect(() => {
    if (id) {
      const fetchDetail = async () => {
        try {
          setIsLoading(true);

          const res = await httpRequest.get(
            '/troubles/' + id
          );
          console.log('product object : ', res.data.payload);
          setTrouble(res.data.payload);
          setRemark(res.data.payload.remark)

          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      };
      fetchDetail();
    }
  }, [location]);

  React.useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        try {
          setIsLoadingCategory(true);

          const res = await httpRequest.get(
            '/categories/' + idCategory
          );
          setCategory(res.data.payload);

          setIsLoadingCategory(false);
        } catch (error) {
          setIsLoadingCategory(false);
        }
      };
      fetchCategory();
    }
  }, [idCategory]);

  const CustomDropdown = () => (
    <div style={{ display: 'none' }}>
    </div>
  );

  return (
    <React.Fragment>
      <HeaderSection
        icon="back"
        title={'Edit'+ ' Trouble List'}
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
              // loading={isLoadingAction}
              type="primary"
              onClick={() => editTrouble()}
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
            <InputWithLabel label="Time">
                <Input
                    style={{ marginBottom: 10 }}
                    disabled
                    placeholder="Time"
                    value={`${trouble?.startTime && moment(trouble.startTime).format('HH:mm')}-${trouble?.endTime && moment(trouble.endTime).format('HH:mm')}`}
                />
            </InputWithLabel>
            <InputWithLabel label="Duration">
                <Input
                    style={{ marginBottom: 10 }}
                    // onChange={(e)=>props.setValue(e.target.value)}
                    placeholder="Duration"
                    value={`${getDuration()}`}
                    disabled
                />
            </InputWithLabel>
            <InputWithLabel label="Category">
                <Select
                    style={{ marginBottom: 10 }}
                    loading={isLoadingCategory}
                    defaultValue={category?.name}
                    placeholder="Category"
                    value={category?.name}
                    dropdownRender={() => <CustomDropdown />}
                    suffixIcon={<RightOutlined />}
                    onDropdownVisibleChange={()=>navigate('/trouble-list/edit/'+id+'/'+idCategory+'/select')}
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
