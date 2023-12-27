import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BaseResponseProps, capitalizeFirstLetter, formatDate } from '@qbit-tech/libs-react';
import { Row, Col, Space, Table, message, Modal, Switch, Dropdown, Menu, Button, Card, Tag } from 'antd';
import HeaderSection from '../../components/HeaderSection';
import { SubscriptionProps, initialSubscription } from '../../types/subscription.type';
import { httpRequest } from '../../helpers/api';
import useFetchList from '../../hooks/useFetchList';
import type { TableProps } from 'antd';
import { useAuthUser } from 'react-auth-kit';
import { MoreOutlined, PlusOutlined } from '@ant-design/icons';
import CustomPagination from '../../components/CustomPagination';

const url = process.env.REACT_APP_BASE_URL
console.log(url)

interface ResponseProps extends BaseResponseProps<SubscriptionProps> {}

const Subscription = () => {
    const navigate = useNavigate()
    const auth = useAuthUser();
    const {
        isLoading,
        fetchList,
        setData,
        data,
        pagination,
        changeLimit,
        changePage
    } = useFetchList<SubscriptionProps>({
        endpoint: 'subscription/subscriptions'
    });

    const handleClick = (key: string, record: SubscriptionProps) => {
        // if (key === 'edit') {
        //     navigate({
        //         pathname: '/notification-schedules/'+record.id+'/edit',
        //     });
        // }
    }

    
    const menu = (record: SubscriptionProps) => (
        <Menu onClick={(e) => handleClick(e.key, record)}>
        {/* {user.roles
            .map((item) => item.permissions["ROLE"]["UPDATE"]["value"])
            .includes(true) ? ( */}
            <Menu.Item key="edit">
                <a href={process.env.REACT_APP_SUBSCRIPTION_REDIRECT_URL + `email=${record.email}`} target="_blank">Edit</a>
            </Menu.Item>
        {/* ) : (
            false
        )} */}
        </Menu>
    )
    
    const columns = [
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
            render: (userId: string) => userId
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (email: string) => email
        },
        {
            title: 'Type',
            dataIndex: 'subscriptionTypes',
            key: 'subscriptionTypes',
            render: (subscriptionTypes: string[]) => subscriptionTypes.map(type => capitalizeFirstLetter(type)).join(', ')
        },
        {
            title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt: any) => <div>{formatDate(createdAt)}</div>,
        },
        {
            title: '',
            key: 'action',
            render: (_: any, record: SubscriptionProps) => (
                <Dropdown overlay={() => menu(record)} placement="bottomRight">
                    <MoreOutlined style={{ cursor: 'pointer' }} />
                </Dropdown>
            ),
        },
    ] as TableProps<SubscriptionProps>['columns'];

    
  return (
    <React.Fragment>
        <HeaderSection
        // icon={<TagOutlined />}
        title="Subscription"
        />
        <Row style={{ paddingBottom: 24 }}>
        <Col span={24}>
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={data}
            pagination={{
              pageSize: pagination.perPage,
              current: pagination.page,
              style: { display: 'none' },
            }}
          />
        </Col>
        <CustomPagination
          data={data}
          pagination={pagination}
          changeLimit={changeLimit}
          changePage={changePage}
        />
      </Row>

    </React.Fragment>
  )
}

export default Subscription