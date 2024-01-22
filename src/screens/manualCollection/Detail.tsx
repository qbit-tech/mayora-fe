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
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import HeaderSection from '../../components/HeaderSection';
import { httpRequest } from '../../helpers/api';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import { CategoryList } from '../../data/model';
import { IManualollectionListItem } from '../../data/model/manual-collection';
import moment from 'moment';

interface ILocation {
  idCategory: string;
}

const { Title, Text } = Typography;

const CategoryEdit: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { idCategory } = useParams<keyof ILocation>() as ILocation;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [category, setCategory] = React.useState<CategoryList>();

  const fetchDetail = async () => {
    try {
      setIsLoading(true);
      console.log("bgyu",idCategory)

      const res = await httpRequest.get(
        '/categories/' + idCategory 
      );
      const data: CategoryList = res.data.payload
      setCategory(data)
        console.log("dtatat",data)

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (idCategory) {
      fetchDetail()
    }
  }, [location]);

  const columns = [
    {
        title: 'Category',
        dataIndex: 'name',
        key: 'name',
        render: (text: string, manual: IManualollectionListItem) => {
            return (
                <div className="">
                    {moment(manual.updatedAt).format('DD MMM YYYY HH:mm')}
                </div>
            );
        }
    },
    {
        title: 'Shift',
        dataIndex: 'shift',
        key: 'shift',
        render: (text: string, manual: IManualollectionListItem) => {
            return (
                <div className="">
                   {manual.shift}
                </div>
            );
        }
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (text: string, manual: IManualollectionListItem) => {
          return (
              <div className="">
                 {manual.value}
              </div>
          );
      }
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
      render: (text: string, manual: IManualollectionListItem) => {
          return (
              <div className="">
                 {manual.remark}
              </div>
          );
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, manual: IManualollectionListItem) => {
          return (
              <div className="">
                 Agus
              </div>
          );
      }
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (text: string, manual: IManualollectionListItem) => {
          return (
              <div className="">
                 Agus
              </div>
          );
      }
    },
];

  return (
    <React.Fragment>
      <HeaderSection
        icon="back"
        title={'Detail '+ category?.name}
        // subtitle="Manage your menu data"
      />

      <Spin spinning={isLoading}>
        <Table
          columns={columns}
          dataSource={category?.manualCollection}
          pagination={false}
          style={{ marginTop: 10, width: '100%' }}
        />
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
