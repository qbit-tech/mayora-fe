import React, { useEffect, useState } from 'react';
import AppLayout from '../layout/AppLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { FolderOpenOutlined, CheckOutlined, FormOutlined, MoreOutlined, TagOutlined, PlusSquareOutlined, CarryOutOutlined, DownOutlined} from '@ant-design/icons';
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
  Spin,
  DatePicker
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
import { DetailUserWithMachine } from '../../data/model/machines';
import { useAuthUser } from 'react-auth-kit';
import dayjs from 'dayjs';
import moment from 'moment';

interface ResponseProps extends BaseResponseProps<ProductProps> {
  payload: Omit<ProductProps, 'createdAt' | 'updatedAt'>;
}

const Categories = () => {
  const auth = useAuthUser();
  let machines: DetailUserWithMachine[] = auth()?.machines
  const [selectedMachine, setSelectedMachine] = useState<DetailUserWithMachine>(machines[0])
  const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'))

  const {
		isLoading,
		data,
    fetchList
	} = useFetchList<ICategoryListItem>({
		endpoint: "category-parents/manual-collection" + '/' + date,
	});

  useEffect(()=>{
    fetchList()
  },[date])

  const renderChildren = (children: ICategoryListItem[]) : DataNode[] => {
    return children.map(child => ({
      title: child.name,
      key: child.id,
      icon: <FolderOpenOutlined />,
      children: child.level5.length > 0 || child.categoryLevel === 'level4' ? [
        {
          title: <ManualTable data={child.level5} fetchList={fetchList} idMachine={selectedMachine ? selectedMachine.machineId : undefined}/>,
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
        rightAction={
          <React.Fragment>
            <Dropdown overlay={
              <Menu>             
                {
                  machines.map((record) => (
                    <Menu.Item key={record.machineId} onClick={() => setSelectedMachine(record)}>
                      {record.machine.name}
                    </Menu.Item>
                  ))
                }
              </Menu>
            }>
              <Button>
                <span className="mr-2">
                  {selectedMachine?.machine.name}
                </span>
                <DownOutlined />
              </Button>
            </Dropdown>
            <DatePicker style={{ marginLeft: 10 }} value={dayjs(date, 'YYYY-MM-DD')} onChange={(value, stringValue)=>setDate(stringValue)}/>
          </React.Fragment>
        }
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
