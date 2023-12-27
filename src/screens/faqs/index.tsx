import { MoreOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Badge,
  Button,
  Col,
  Dropdown,
  Input,
  Menu,
  message,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  Table,
  Tabs,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IconArrowDown } from '../../assets/icons';
import CustomPagination from '../../components/CustomPagination';
import HeaderSection from '../../components/HeaderSection';
import { httpRequest } from '../../helpers/api';
import { formatYearToTime, PAGE_SIZE_OPTIONS } from '../../helpers/constant';
import useFetchList from '../../hooks/useFetchList';
import { FAQSProps, initialFaqs } from '../../types/faqs.type';
import AppLayout from '../layout/AppLayout';

const { Option } = Select;

export default function FAQs() {
  const navigate = useNavigate();
  const {
    isLoading,
    data,
    pagination,
    setData,
    setSearch,
    fetchList,
    setQuery,
    changePage,
    changeLimit,
  } = useFetchList<FAQSProps>({
    endpoint: 'faqs',
    limit: +PAGE_SIZE_OPTIONS[0],
  });
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [isModalVisibleDelete, setIsModalVisibleDelete] =
    React.useState<boolean>(false);
  const [isModalVisibleDetail, setIsModalVisibleDetail] =
    React.useState<boolean>(false);
  const [tmpData, setTmpData] = React.useState<FAQSProps>(initialFaqs);
  const [isLoadingUpdateStatus, setIsLoadingUpdateStatus] =
    React.useState<boolean>(false);

  const columns = [
    {
      title: 'QUESTIONS',
      dataIndex: 'questions',
      key: 'questions',
      width: '35%',
      render: (text: string, record: FAQSProps) => {
        return (
          <div
            className="table-link"
            onClick={() => {
              setIsModalVisibleDetail(true);
              setTmpData(record);
            }}
          >
            {record.question}
          </div>
        );
      },
    },

    {
      title: 'ANSWER',
      dataIndex: 'answer',
      key: 'answer',
      width: '35%',

      render: (text: string, record: FAQSProps) => {
        return <div className="line-clamp-2">{record.answer}</div>;
      },
    },
    {
      title: 'STATUS',
      key: 'status',
      dataIndex: 'status',
      render: (status: any, record: FAQSProps) => (
        <>
          {
            <Switch
              //   loading={record.statusLoading}
              checked={record.isPublished}
              onChange={() => {
                setIsModalVisible(true);
                setTmpData(record);
              }}
            />
          }
        </>
      ),
    },
    {
      title: 'CREATED AT',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: any) => <div>{formatYearToTime(createdAt)}</div>,
    },
    {
      title: ' ',
      key: 'action',
      render: (_: any, record: FAQSProps) => (
        <Dropdown overlay={() => menu(record)} placement="bottomRight">
          <MoreOutlined style={{ cursor: 'pointer' }} />
        </Dropdown>
      ),
    },
  ];

  const handleDelete = async () => {
    try {
      setIsLoadingUpdateStatus(true);

      const res = await httpRequest.delete<{ payload: { isSuccess: boolean } }>(
        '/faqs/' + tmpData.faqId
      );

      if (res?.data?.payload?.isSuccess) {
        fetchList();
        message.success('Success delete ' + tmpData.question);
      }
    } catch (error: any) {
      message.error(error.data.message);
    } finally {
      setTmpData(initialFaqs);
      setIsModalVisibleDelete(false);
      setIsLoadingUpdateStatus(false);
    }
  };

  const menu = (record: FAQSProps) => (
    <Menu onClick={(e) => handleClickAction(record, e.key)}>
      <Menu.Item key="edit">Edit FAQ</Menu.Item>
      <Menu.Item key="delete">Delete FAQ</Menu.Item>
    </Menu>
  );

  const handleClickAction = (props: FAQSProps, key: string) => {
    if (key === 'detail') {
      navigate(`/news/`);
    } else if (key === 'edit') {
      navigate(`/faqs/${props.faqId}/edit`);
    } else if (key === 'delete') {
      setTmpData(props);
      setIsModalVisibleDelete(true);
    }
  };

  const handleStatusChange = async () => {
    try {
      setIsLoadingUpdateStatus(true);
      await httpRequest.patch('/faqs/' + tmpData.faqId, {
        isPublished: !tmpData.isPublished,
      });

      message.success('Success change ' + tmpData.answer + ' status.');

      setIsLoadingUpdateStatus(false);
      setIsModalVisible(false);
      setTmpData(initialFaqs);
      fetchList();
    } catch (error: any) {
      message.error(error.data.message);
      setIsModalVisible(false);
      setTmpData(initialFaqs);
      setIsLoadingUpdateStatus(false);
    }
  };

  const handleFilterStatus = (status: string | boolean) => {
    console.log(status);
    if (status === 'all') {
      setQuery((oldVal) => ({ ...oldVal, isPublished: '' }));
    } else {
      setQuery((oldVal) => ({ ...oldVal, isPublished: status }));
    }
  };

  return (
    <>
      <HeaderSection
        title="FAQs"
        rightAction={
          <Space>
            <Button
              style={{ padding: '0px 32px' }}
              type="primary"
              onClick={() => navigate('/faqs/add')}
            >
              Add FAQ
            </Button>
          </Space>
        }
      />
      <Row gutter={{ xs: 8, sm: 15 }} className="mb-6">
        <Col span={18}>
          <Typography.Text className="text-3 text-gray block font-semibold mb-1">
            Search
          </Typography.Text>
          <Input
            placeholder="Search by question"
            suffix={<SearchOutlined />}
            allowClear
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col span={6}>
          <Typography.Text className="text-3 text-gray block font-semibold mb-1">
            Status
          </Typography.Text>
          <Select
            allowClear
            onChange={handleFilterStatus}
            placeholder="Status"
            defaultValue="all"
            suffixIcon={<IconArrowDown />}
          >
            <Option value="all">All</Option>
            <Option value={'true'}>Active</Option>
            <Option value={'false'}>Inactive</Option>
          </Select>
        </Col>
      </Row>

      <Row style={{ paddingBottom: 24 }}>
        <Col span={24}>
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={data && data}
            pagination={{
              pageSize: pagination.perPage,
              current: pagination.page,
              style: { display: 'none' },
            }}
          />
        </Col>
        <CustomPagination
          data={data && data}
          pagination={pagination}
          changeLimit={changeLimit}
          changePage={changePage}
        />
      </Row>
      <Modal
        title="Update status confirmation"
        visible={isModalVisible}
        onOk={handleStatusChange}
        onCancel={() => {
          setIsModalVisible(false);
          setTmpData(initialFaqs);
        }}
        okText="Yes"
        confirmLoading={isLoadingUpdateStatus}
        okButtonProps={{ type: 'primary' }}
      >
        <p>
          Are you sure want to change <b>"{tmpData.answer}"</b> status to{' '}
          <b>"{!tmpData.isPublished ? 'Active' : 'Inactive'}"</b>?.{' '}
          {!tmpData.isPublished}
        </p>
      </Modal>
      <Modal
        title="Confirm delete confirmation"
        visible={isModalVisibleDelete}
        onOk={handleDelete}
        onCancel={() => {
          setIsModalVisibleDelete(false);
          setTmpData(initialFaqs);
        }}
        okText="Yes"
        confirmLoading={isLoadingUpdateStatus}
        okButtonProps={{ type: 'primary' }}
      >
        <p>
          Are you sure want to delete question <b>"{tmpData.question}"</b> from
          FAQs?
        </p>
      </Modal>

      <Modal
        title="Detail"
        visible={isModalVisibleDetail}
        onOk={handleDelete}
        onCancel={() => {
          setIsModalVisibleDetail(false);
          setTmpData(initialFaqs);
        }}
        footer={null}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Typography.Text className="text-4 text-semibold text-primary-black block">
              Question
            </Typography.Text>
            <Typography.Text className="text-3.5 text-primary-black">
              {tmpData.question ?? 'Not Set'}
            </Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text className="text-4 text-primary-black block">
              Answer
            </Typography.Text>
            <Typography.Text className="text-3.5 text-primary-black">
              {tmpData.answer ?? 'Not Set'}
            </Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text className="text-4 text-primary-black block">
              Status
            </Typography.Text>
            <Typography.Text className="text-3.5 text-primary-black">
              {tmpData.isPublished ? 'Active' : 'Inactive'}
            </Typography.Text>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
