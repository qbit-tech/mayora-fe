import React, { useEffect, useState } from 'react';
import AppLayout from '../layout/AppLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { DownOutlined, MoreOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
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
  DatePicker,
} from 'antd';
import type { MenuProps } from 'antd';
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
import { ITroubleListItem } from '../../data/model/trouble';
import moment from 'moment';
import useAuthUser from 'react-auth-kit/dist/hooks/useAuthUser';
import { DetailUserWithMachine } from '../../data/model/machines';

interface ResponseProps extends BaseResponseProps<ProductProps> {
  payload: Omit<ProductProps, 'createdAt' | 'updatedAt'>;
}

const Categories = () => {
  const navigate = useNavigate();
  const auth = useAuthUser();
  let machines: DetailUserWithMachine[] = auth()?.machines
  const [selectedMachine, setSelectedMachine] = useState<DetailUserWithMachine>(machines[0])

  const {
		isLoading,
		data,
    fetchList
	} = useFetchList<ITroubleListItem>({
		endpoint: "troubles/machine/" + selectedMachine.machineId,
	});

  useEffect(()=>{
    fetchList()
  },[selectedMachine])

  const columns = [
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
        render: (text: string, trouble: ITroubleListItem) => {
            return (
                <div className="">
                  {trouble.startTime && moment(trouble.startTime).format('HH:mm')} - {trouble.endTime &&  moment(trouble.endTime).format('HH:mm')}
                </div>
            );
        }
    },
    {
        title: 'Duration',
        dataIndex: 'Duration',
        key: 'Duration',
        render: (text: string, trouble: ITroubleListItem) => {
          const inputMoment = moment(trouble.endTime);
          const duration = moment.duration(inputMoment.diff(trouble.startTime));

            return (
                <div className="">
                  {duration.asMinutes()}
                </div>
            );
        }
    },
    {
      title: 'Category',
      dataIndex: 'Category',
      key: 'Category',
      render: (text: string, trouble: ITroubleListItem) => {
          return (
              <div className="">
                {trouble.categoryParent.name}
              </div>
          );
      }
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      render: (text: string, category: ITroubleListItem) => {
          return (
              <div className="">
                Andi Hidayat
              </div>
          );
      }
    },
    {
      title: 'Updated At',
      dataIndex: 'UpdatedAt',
      key: 'UpdatedAt',
      render: (text: string, trouble: ITroubleListItem) => {
          return (
              <div className="">
                {moment(trouble.updatedAt).format('DD MMM YYYY HH:mm')}
              </div>
          );
      }
    },
    {
        title: 'Action',
        dataIndex: 'Action',
        key: 'Action',
        render: (text: string, trouble: ITroubleListItem) => {
            return (
              <Button type="link" onClick={()=>navigate('edit/'+trouble.id+'/'+trouble.categoryParent.id)}>Edit</Button>
            );
        }
    },
];
  
  return (
    <React.Fragment>
      <HeaderSection
        // icon={<TagOutlined />}
        title="Trouble List"
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
            <DatePicker style={{ marginLeft: 10 }}  />
          </React.Fragment>
        }
      />
      <Table
           columns={columns}
           dataSource={data}
           pagination={false}
           style={{ marginTop: 10, width: '100%' }}
           loading={isLoading}
       />
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

