import React, { useState } from 'react';
import AppLayout from '../layout/AppLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { FolderOpenOutlined, CheckOutlined, FormOutlined, MoreOutlined, TagOutlined} from '@ant-design/icons';
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
  Tabs,
  Tree
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
import { TabsProps } from 'antd/lib';
import { DataNode } from 'antd/es/tree';

interface ResponseProps extends BaseResponseProps<ProductProps> {
  payload: Omit<ProductProps, 'createdAt' | 'updatedAt'>;
}

const { Text } = Typography;

const Categories = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showLine, setShowLine] = useState<boolean>(true);
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const [showLeafIcon, setShowLeafIcon] = useState<boolean | React.ReactNode>(true);

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };
  
  const onChange = (key: string) => {
    console.log(key);
  };

  const treeData: DataNode[] = [
    {
      title: 'parent 1',
      key: '0-0',
      icon: <FolderOpenOutlined />,
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          icon: <FolderOpenOutlined />,
          children: [
            { title: 'leaf', key: '0-0-0-0', icon: <TagOutlined /> },
            { title: 'leaf', key: '0-0-0-2', icon: <TagOutlined /> },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          icon: <FolderOpenOutlined />,
          children: [{ title: 'leaf', key: '0-0-1-0', icon: <TagOutlined /> }],
        },
        {
          title: 'parent 1-2',
          key: '0-0-2',
          icon: <FolderOpenOutlined />,
          children: [
            { title: 'leaf', key: '0-0-2-0', icon: <TagOutlined /> },
            {
              title: 'leaf',
              key: '0-0-2-1',
              icon: <FolderOpenOutlined />,
              switcherIcon: <FormOutlined />,
            },
          ],
        },
      ],
    },
    {
      title: 'parent 2',
      key: '0-1',
      icon: <FolderOpenOutlined />,
      children: [
        {
          title: 'parent 2-0',
          key: '0-1-0',
          icon: <FolderOpenOutlined />,
          children: [
            { title: 'leaf', key: '0-1-0-0', icon: <FolderOpenOutlined /> },
            { title: 'leaf', key: '0-1-0-1', icon: <FolderOpenOutlined /> },
          ],
        },
      ],
    },
  ];

  const TabPane1 = () => {
    return(
      <div style={{height : '500px', width: '100%', backgroundColor: 'white'}}>
        <div>
      <Tree
        showLine={ true }
        showIcon={true}
        defaultExpandedKeys={['0-0-0']}
        onSelect={onSelect}
        treeData={treeData}
      />
    </div>
      </div>
    )
  }
  
  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'Not Operating Day & Planned Down Time',
      children: TabPane1(),
    },
    {
      key: '2',
      label: 'Down Time Losses',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Speed Losses',
      children: 'Content of Tab Pane 3',
    },
    {
      key: '4',
      label: 'Defect & Rework Losses',
      children: 'Content of Tab Pane 3',
    },
  ];
  

  return (
    <React.Fragment>
      <HeaderSection
        // icon={<TagOutlined />}
        title="Master Category"
      />
      <div>
        <Tabs defaultActiveKey="1" items={tabItems} type="card" onChange={onChange} />;
      </div>
      
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

function sortCategories(categories: CategoryProps[]) {
  categories.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
  return categories;
}
