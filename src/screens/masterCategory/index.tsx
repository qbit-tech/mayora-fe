import React, { useEffect, useState } from 'react';
import AppLayout from '../layout/AppLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { FolderOpenOutlined, CheckOutlined, FormOutlined, MoreOutlined, TagOutlined, PlusSquareOutlined} from '@ant-design/icons';
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
  HttpParam,
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
import { ICategoryListItem } from '../../data/model';
import TabPane from '../../components/Category/TabPane';
import { ModalAddCategoryView } from '../../components/Category/ModalAdd';
import axios from 'axios';
import { Http } from '../../utility/http';

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
		endpoint: "category-parents",
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
      const params: HttpParam = {
        data: {
          categoryParentId:selectedLv2,
          name,
          categoryType,
          unit
        },
        method: "post",
        path: 'categories/'
      };

      const result = await Http(params);
      if (result.code === "success") {
        await fetchList()
        setIsLoading(false)
        message.success("Successfully created category");
      }else{
        setIsLoading(false)
        return message.error("Error create category");
      }
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
          title: <Button type="primary" onClick={()=>{setIsModalOpen(true); setSelectedlv2(child.id)}}>Add New Category</Button>, 
          key: `BUTTON-${child.id}`
        },
        ...child.level5.map(next =>({
          title: <Category {...next} fetchList={fetchList} parentId={next.categoryParentId}/>, 
          key: next.id
        }))
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
        title="Master Category"
      />
      <div>
        {
          isLoading ? <Spin /> :
          <>
            <Tabs defaultActiveKey="1" items={tabItems} type="card" />
            <ModalAddCategoryView
              setName={setName}
              setUnit={setUnit}
              setCategoryType={setCategoryType}
              isModal={true}
              isModalOpen={isModalOpen}
              onClose={() => {
                addNewCategory()
                setIsModalOpen(false);
              } }
              onSuccess={() => {
                setIsModalOpen(false);
              } }
              onModalCancel={() => setIsModalOpen(false)}
            />
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
