import React, { useEffect, useState } from 'react';
import AppLayout from '../layout/AppLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { FolderOpenOutlined, CheckOutlined, FormOutlined, MoreOutlined, TagOutlined, PlusSquareOutlined, CarryOutOutlined} from '@ant-design/icons';
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
  Tree,
  Spin
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
import Category from '../../components/Category/Category';
import { CategoryLevel2, CategoryList, ICategoryListItem } from '../../data/model';
import TabPane from '../../components/Category/TabPane';
import axios from 'axios';
import { IManualollectionListItem } from '../../data/model/manual-collection';
import ManualTable from '../../components/manual-collection/Category';

interface ResponseProps extends BaseResponseProps<ProductProps> {
  payload: Omit<ProductProps, 'createdAt' | 'updatedAt'>;
}

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedLv2, setSelectedlv2] = useState<string>('')
  const [isLoadingTransaction, setIsLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [categoryType, setCategoryType] = useState<string>('manualcollection')
  const [unit, setUnit] = useState<string>('unit1')

  const {
		isLoading,
		data,
    fetchList
	} = useFetchList<ICategoryListItem>({
		endpoint: "category-parents/manual-collection",
	});


  const addNewCategory = async() =>{
    if (name === "" || name === null || name === undefined) {
        return message.error("Category Name is required");
    }

    if (categoryType === "" || categoryType === null || categoryType === undefined) {
        return message.error("Category Type is required");
    }

    if (unit === "" || unit === null || unit === undefined) {
        return message.error("Unit is required");
    }

    try {
        setIsLoading(true)
        await axios.post(
          process.env.REACT_APP_BASE_URL + '/category',
          {
            categoryParentId:selectedLv2,
            name,
            categoryType,
            unit
          }
        );
        message.success("Successfully created category");
        setIsLoading(false)
        await fetchList()
    } catch (error) {
        setIsLoading(false)
        return message.error("Error create category");
    }
  }

  const renderChildren = (children: ICategoryListItem[]) : DataNode[] => {
    return children.map(child => ({
      title: child.name,
      key: child.id,
      icon: <FolderOpenOutlined />,
      children: child.level5.length > 0 || child.categoryLevel === 'level4' ? [
        {
          title: <ManualTable data={child.level5} fetchList={fetchList}/>,
          key: `Table-${child.id}`
        }
      ] : (child.children && child.children.length > 0) ? renderChildren(child.children) : []
    }))
  }

  const tabItems: TabsProps['items'] =  data.map((item) => ({
    key: item.id,
    label: item.name,
    children: <TabPane treeData={renderChildren(item.children)}/>,
  }));
  
  return (
    <React.Fragment>
      <HeaderSection
        title="Manual Collection"
      />
      <div>
        {
          isLoading ? <Spin /> :
          <>
            <Tabs defaultActiveKey="1" items={tabItems} type="card" />
          </>
        }
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
