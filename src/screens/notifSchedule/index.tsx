import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BaseResponseProps, formatDate } from '@qbit-tech/libs-react';
import { Row, Col, Space, Table, message, Modal, Switch, Dropdown, Menu, Button, Card, Tag } from 'antd';
import HeaderSection from '../../components/HeaderSection';
import { NotifScheduleProps, initialNotifSchedule } from '../../types/notifSchedule.type';
import { httpRequest } from '../../helpers/api';
import useFetchList from '../../hooks/useFetchList';
import type { TableProps } from 'antd';
import { useAuthUser } from 'react-auth-kit';
import { MoreOutlined, PlusOutlined } from '@ant-design/icons';
import CustomPagination from '../../components/CustomPagination';

interface ResponseProps extends BaseResponseProps<NotifScheduleProps> { }


const NotifSchedule = () => {
  const navigate = useNavigate()
  const auth = useAuthUser();
  const user = auth()
  const {
    isLoading,
    fetchList,
    setData,
    data,
    pagination,
    changeLimit,
    changePage
  } = useFetchList<NotifScheduleProps>({
    endpoint: 'notification-schedules'
  });


  const [isLoadingUpdate, setIsLoadingUpdate] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [tmpData, setTmpData] = React.useState<NotifScheduleProps>(initialNotifSchedule);
  const [modalType, setModalType] = React.useState<string>('');


  const handleCreateNotifSchedule = () => {
    navigate({ pathname: "/notification-schedules/add" });
  };

  const handleDelete = async () => {
    try {
      setIsLoadingUpdate(true);
      // const permissions = user.roles.map(
      //   (item) => item.permissions["ROLE"]["DELETE"]["value"]
      // );
      // if (permissions.includes(true)) {
      await httpRequest.delete<ResponseProps>("/notification-schedules/" + tmpData.id);

      //   setData(newData);
      message.success("Success delete schedule ");
      setIsModalVisible(false);
      setTmpData(initialNotifSchedule);
      fetchList()
      setIsLoadingUpdate(false);
      // } else {
      //   message.error("Your account don't have permission to delete data.");
      //   setIsModalVisible(false);
      //   setTmpData(initialRegion);
      //   setIsLoadingUpdate(false);
      // }
    } catch (error: any) {
      message.error(error.data.message);
      setIsModalVisible(false);
      setTmpData(initialNotifSchedule);
      setIsLoadingUpdate(false);
    }
  };

  const handleClick = (key: string, record: NotifScheduleProps) => {
    if (key === 'edit') {
      navigate({
        pathname: '/notification-schedules/' + record.id + '/edit',
      });

    } else if (key === "delete") {
      setModalType("delete");
      setIsModalVisible(true);
      setTmpData(record);
    } else if (key === 'details') {
      navigate('/' + 'notification-schedules' + '/' + record.id)
    }
  }

  const menu = (record: NotifScheduleProps) => (
    <Menu onClick={(e) => handleClick(e.key, record)}>
      {/* {user.roles
                .map((item) => item.permissions["ROLE"]["UPDATE"]["value"])
                .includes(true) ? ( */}
      <Menu.Item key="details">Detail</Menu.Item>
      {/* ) : (
                false
            )} */}
      {/* {user.roles
                .map((item) => item.permissions["ROLE"]["UPDATE"]["value"])
                .includes(true) ? ( */}
      <Menu.Item key="edit">Edit</Menu.Item>
      {/* ) : (
                false
            )} */}
      {/* {user.roles
                .map((item) => item.permissions["ROLE"]["DELETE"]["value"])
                .includes(true) ? ( */}
      <Menu.Item key="delete">Delete</Menu.Item>
      {/* ) : (
                false
            )} */}
    </Menu>
  );

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title: string) => title
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      render: (message: string, record: NotifScheduleProps) => {
        <div
          onClick={() => {
            setModalType("description");
            setIsModalVisible(true);
            setTmpData(record);
          }}>
          {
            record.message ? record.message.length > 200 ?
              <p>
                {
                  record.message.split(/\s+/, 35).join(' ') + '...'}<span style={{ color: 'blue' }}>Read more</span>
              </p>
              : record.message
              : ''}
        </div>
      }
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => type
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => status
    },
    {
      title: 'Scheduled At',
      dataIndex: 'scheduledAt',
      key: 'scheduledAt',
      render: (scheduledAt: any) => <div>{formatDate(scheduledAt)}</div>,
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
      render: (_: any, record: NotifScheduleProps) => (
        <Dropdown overlay={() => menu(record)} placement="bottomRight">
          <MoreOutlined style={{ cursor: 'pointer' }} />
        </Dropdown>
      ),
    },
  ] as TableProps<NotifScheduleProps>['columns'];


  const rightAction: any =
    // user.roles
    // .map((item) => item.permissions["ROLE"]["CREATE"]["value"])
    // .includes(true) ? (
    <Button
      icon={<PlusOutlined />}
      style={{ marginRight: 20 }}
      type='primary'
      onClick={handleCreateNotifSchedule}
    >
      Add Notif Schedule
    </Button>
  // ) : (
  //   false
  // )


  return (
    <React.Fragment>
      <HeaderSection
        // icon={<TagOutlined />}
        title="Notif Schedule"
        // subtitle="Manage your Categories"
        rightAction={rightAction}
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

      {(() => {
        if (modalType === 'description') {
          return (
            <Modal
              title="Message"
              open={isModalVisible}
              onCancel={() => {
                setIsModalVisible(false);
                setTmpData(initialNotifSchedule);
              }}
              footer={null}
              confirmLoading={isLoadingUpdate}
            >
              <div style={{ textAlign: "center" }}>
                {tmpData.message}
              </div>
            </Modal>
          )
        } else {
          return (
            <Modal
              title="Delete confirmation"
              open={isModalVisible}
              onOk={handleDelete}
              onCancel={() => {
                setIsModalVisible(false);
                setTmpData(initialNotifSchedule);
              }}
              okText="Yes"
              confirmLoading={isLoadingUpdate}
              okButtonProps={{ type: 'primary' }}
            >
              <p>
                Are you sure want to delete this notification schedule?
              </p>
            </Modal>
          )
        }
      }
      )()}
    </React.Fragment>
  )
}

export default NotifSchedule