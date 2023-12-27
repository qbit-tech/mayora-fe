import React from 'react'
import { useNavigate } from 'react-router-dom';
import { MoreOutlined, SearchOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import { Row, Col, Space, Table, message, Modal, Switch, Dropdown, Menu, Button, Card, Tag } from 'antd';
import HeaderSection from '../../components/HeaderSection';
import { BaseResponseProps } from "../../types/config.type";
import { RoleProperties, initialRole } from '../../types/role.type';
import { httpRequest } from "../../helpers/api";
import useFetchList from '../../hooks/useFetchList';
import { formatDate } from '../../helpers/constant';
import Text from 'antd/lib/typography/Text';
import type { TableProps } from 'antd';
// import useAuth from "../../hooks/useAuth";
import { useAuthUser } from 'react-auth-kit';

interface ResponseProps extends BaseResponseProps<RoleProperties> { }

const Role = () => {
  const navigate = useNavigate()
  // const { user }:any = useAuth();
  const auth = useAuthUser();
  console.log(auth())
  const {
    isLoading,
    fetchList,
    setData,
    data,
    pagination,
    changePage
  } = useFetchList<RoleProperties>({
    endpoint: 'roles'
  });

  const [isLoadingUpdate, setIsLoadingUpdate] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [tmpData, setTmpData] = React.useState<RoleProperties>(initialRole);
  const [confirmationType, setConfirmationType] = React.useState<string>("");

  const handleClickDetail = (e: RoleProperties) => {
    navigate('/' + 'role' + '/' + e.roleId)
  }

  const handleCreateRole = () => {
    navigate({ pathname: "/role/add" });
  };

  const handleStatusChange = async () => {
    try {
      setIsLoadingUpdate(true);
      // const permissions = user.roles.map(
      //   (item) => item.permissions["ROLE"]["UPDATE"]["value"]
      // );
      // if (permissions.includes(true)) {
      let newData = [];
      newData = data.map((item) => {
        if (item.roleId === tmpData.roleId) {
          return {
            ...item,
            statusLoading: true,
          };
        }
        return item;
      });

      const newStatus = (tmpData.isActive === true) ? false : true;

      const res = await httpRequest.patch<ResponseProps>(
        '/roles/' + tmpData.roleId,
        {
          roleId: tmpData.roleId,
          isActive: newStatus,
        }
      );

      newData = data.map((item) => {
        if (item.roleId === res.data.payload.roleId) {
          return {
            ...item,
            isActive: res.data.payload.isActive,
            statusLoading: false,
          };
        }
        return item;
      });
      setData(newData);

      message.success('Success change ' + tmpData.roleName + ' status.');
      setIsModalVisible(false);
      setTmpData(initialRole);
      setIsLoadingUpdate(false);
      // } else {
      //   message.error("Your account don't have permission to update data.");
      //   setIsModalVisible(false);
      //   setTmpData(initialRole);
      //   setIsLoadingUpdate(false);
      // }
    } catch (error: any) {
      message.error(error.data.message);
      setIsModalVisible(false);
      setTmpData(initialRole);
      setIsLoadingUpdate(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoadingUpdate(true);
      // const permissions = user.roles.map(
      //   (item) => item.permissions["ROLE"]["DELETE"]["value"]
      // );
      // if (permissions.includes(true)) {
      let newData = [];
      await httpRequest.delete<ResponseProps>("/roles/" + tmpData.roleId);
      newData = data.filter((item) => {
        return item.roleId !== tmpData.roleId;
      });
      setData(newData);
      message.success("Success delete " + tmpData.roleName);
      setIsModalVisible(false);
      setTmpData(initialRole);
      setIsLoadingUpdate(false);
      // } else {
      //   message.error("Your account don't have permission to delete data.");
      //   setIsModalVisible(false);
      //   setTmpData(initialRole);
      //   setIsLoadingUpdate(false);
      // }
    } catch (error: any) {
      message.error(error.data.message);
      setIsModalVisible(false);
      setTmpData(initialRole);
      setIsLoadingUpdate(false);
    }
  };

  const handleSoftDelete = async () => {
    try {
      setIsLoadingUpdate(true);
      // const permissions = user.roles.map(
      //   (item) => item.permissions["ROLE"]["DELETE"]["value"]
      // );
      // if (permissions.includes(true)) {

      const res = await httpRequest.delete<any>(
        "/roles/" + tmpData.roleId + '/request'
      );

      fetchList()

      message.success("Success soft delete " + tmpData.roleName);
      setIsLoadingUpdate(false);
      setIsModalVisible(false);
      setTmpData(initialRole);
      // } else {
      //   message.error("Your account don't have permission to delete roles.");
      //   // console.log(permissions);
      //   setIsLoadingUpdate(false);
      //   setIsModalVisible(false);
      //   setTmpData(initialRole);
      // }
    } catch (error: any) {
      message.error(error.data.message);
      setIsModalVisible(false);
      setTmpData(initialRole);
      setIsLoadingUpdate(false);
    }
  };

  const handleActivateRole = async () => {
    try {
      setIsLoadingUpdate(true);
      // const permissions = user.roles.map(
      //   (item) => item.permissions["ROLE"]["UPDATE"]["value"]
      // );
      // if (permissions.includes(true)) {

      const newStatus = "active";

      const res = await httpRequest.patch<ResponseProps>(
        "/roles/" + tmpData.roleId,
        {
          ...tmpData,
          roleId: tmpData.roleId,
          status: newStatus,
        }
      );

      fetchList()

      message.success("Success change " + tmpData.roleName + " status.");
      setIsModalVisible(false);
      setTmpData(initialRole);
      setIsLoadingUpdate(false);
      // } else {
      //   message.error("Your account don't have permission to update roles.");
      //   setIsModalVisible(false);
      //   setTmpData(initialRole);
      //   setIsLoadingUpdate(false);
      // }
    } catch (error: any) {
      message.error(error.data.message);
      setIsModalVisible(false);
      setTmpData(initialRole);
      setIsLoadingUpdate(false);
    }
  };

  const columns = [
    {
      title: 'Role Name',
      dataIndex: 'roleName',
      key: 'roleName',
      render: (roleName: string, record: RoleProperties) => {
        return (
          <a
            href={
              // user.roles
              //   .map((item) => item.permissions["ROLE"]["DETAIL"]["value"])
              //   .includes(true) ? 
              '/' + 'role' + '/' + record.roleId
              // : 
              // 'javascript:'
            }
            className="table-link"
            style={{
              color: 'inherit'
            }}
            onClick={() => {
              // const permissions = user.roles.map(
              //   (item) => item.permissions["ROLE"]["DETAIL"]["value"]
              // );
              // if (permissions.includes(true)) {
              handleClickDetail(record)
              // } else {
              //     message.error("Your account don't have permissions.");
              // }
            }}>
            {roleName}
          </a>
        );
      },
    },
    {
      title: 'Description',
      dataIndex: 'roleDescription',
      key: 'roleDescription',
      align: 'left',
      render: (roleDescription: string, record: RoleProperties) => (
        <div style={{ textAlign: 'justify' }}>{
          record.roleDescription ? record.roleDescription.length > 200 ?
            <p>
              {
                record.roleDescription.split(/\s+/, 35).join(' ') + '...'
              } <span style={{ color: 'blue' }}>Read more</span>
            </p> : record.roleDescription : ''
        }</div>

      )
    },
    // {
    //     title: 'PERMISSIONS',
    //     dataIndex: 'permissions',
    //     key: 'permissions',
    //     width: '150',
    //     render: (permissions: string, record: RoleProperties) => (
    //         <div>{permissions}</div>
    //     )
    // },
    {
      title: 'Status',
      key: 'isActive',
      align: 'center',
      dataIndex: 'isActive',
      render: (status: any, record: RoleProperties) => (
        <>
          {(() => {
            if (record.isDeleted === false) {
              return (
                <Switch
                  checked={status === true}
                  onChange={() => {
                    // const permissions = user.roles.map(
                    //   (item) => item.permissions["ROLE"]["UPDATE"]["value"]
                    // );
                    // if (permissions.includes(true)) {
                    setConfirmationType('status')
                    setIsModalVisible(true);
                    setTmpData(record);
                    // } else {
                    //     message.error("Your account don't have permissions.");
                    // }
                  }}
                />
              )
            } else {
              return (
                <Tag
                  style={{
                    border: "2px solid #D81F64",
                    color: "#D81F64",
                    marginBottom: "7%",
                  }}>
                  Deleted
                </Tag>)
            }

          })()}
        </>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: any) => <div>{formatDate(createdAt)}</div>,
    },
    {
      title: 'ACTION',
      key: 'action',
      render: (_: any, record: RoleProperties) => (
        <Dropdown overlay={() => menu(record)} placement="bottomRight">
          <MoreOutlined style={{ cursor: 'pointer' }} />
        </Dropdown>
      ),
    },
  ] as TableProps<RoleProperties>['columns'];

  const handleClick = (key: string, record: RoleProperties) => {
    if (key === 'edit') {
      navigate({
        pathname: '/role/' + record.roleId + '/edit',
      });

    } else if (key === "delete") {
      setConfirmationType("delete");
      setIsModalVisible(true);
      setTmpData(record);
    } else if (key === "softDelete") {
      setTmpData(record);
      setConfirmationType('softDelete')
      setIsModalVisible(true)
    } else if (key === "activateRole") {
      setTmpData(record);
      setConfirmationType('activateRole')
      setIsModalVisible(true)
    } else if (key === 'details') {
      navigate('/' + 'role' + '/' + record.roleId)
    }
  }

  const menu = (record: RoleProperties) => (
    <Menu onClick={(e) => handleClick(e.key, record)}>
      {/* {user.roles
                .map((item) => item.permissions["ROLE"]["DETAIL"]["value"])
                .includes(true) ? ( */}
      <Menu.Item key="details">Details</Menu.Item>
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
                .includes(true) ? (
                <Menu.Item key="delete">Delete</Menu.Item>
            ) : (
                false
            )} */}
      {/* {user.roles
            .map(
            (item) => item.permissions["ROLE"]["DELETE"]["value"]
            )
            .includes(true) ? 
            record.status !== 'deleted'? ( */}
      <Menu.Item key="softDelete">Soft Delete</Menu.Item>
      {/* ) : (
            false
        ) : (
            false
        )
        } */}
      {/* {user.roles
            .map(
            (item) => item.permissions["ROLE"]["DELETE"]["value"]
            )
            .includes(true) ? 
            record.status === 'deleted'? ( */}
      <Menu.Item key="delete">Hard Delete</Menu.Item>
      {/* ) : (
            false
        ) : (
            false
        )
        } */}
      {/* {user.roles
            .map(
            (item) => item.permissions["ROLE"]["DELETE"]["value"]
            )
            .includes(true) ? 
            record.status === 'deleted'? ( */}
      <Menu.Item key="activateRole">Activate Role</Menu.Item>
      {/* ) : (
            false
        ) : (
            false
        )
        } */}
    </Menu>
  );
  const rightAction: any =
    // user.roles
    // .map((item) => item.permissions["ROLE"]["CREATE"]["value"])
    // .includes(true) ? (
    <Button
      icon={<PlusOutlined />}
      style={{ marginRight: 20 }}
      type='primary'
      onClick={handleCreateRole}
    >
      Add Role
    </Button>
  // ) : (
  //   false
  // )
  return (
    <React.Fragment>
      <HeaderSection
        icon={<UserOutlined />}
        title={'ROLE'}
        subtitle={'Manage Role'}
        rightAction={[
          rightAction
        ]}
      />

      <Space direction="vertical" style={{ width: '100%' }}>
        <Card bordered={false} size="small">
          <Table
            rowKey="userId"
            loading={isLoading}
            columns={columns}
            dataSource={
              // user.roles
              //   .map((item) => item.permissions["ROLE"]["LIST"]["value"])
              //   .includes(true)
              //   ? 
              data
              // : undefined
            }
            pagination={{
              current: pagination.page,
              total: pagination.totalData,
              defaultPageSize: pagination.perPage,
              pageSize: pagination.perPage,
              onChange: changePage
            }}
          />
        </Card>
        {(() => {
          if (confirmationType === "status") {
            return (
              <Modal
                title="Update status confirmation"
                open={isModalVisible}
                onOk={handleStatusChange}
                onCancel={() => {
                  setIsModalVisible(false);
                  setTmpData(initialRole);
                }}
                okText="Yes"
                confirmLoading={isLoadingUpdate}
                okButtonProps={{ type: 'primary' }}
              >
                <p>
                  Are you sure want to change <b>"{tmpData.roleName}"</b> status to{' '}
                  <b>"{tmpData.isActive === true ? 'Inactive' : 'Active'}"</b>?.{' '}
                  {tmpData.isActive === true
                    ? 'If this role status is changed to "Inactive", then this role cannot be access'
                    : 'If this role status is changed to "Active", then this role can be access'}
                </p>
              </Modal>
            )
          } else if (confirmationType === 'description') {
            return (
              <Modal
                title="Description"
                open={isModalVisible}
                onCancel={() => {
                  setIsModalVisible(false);
                  setTmpData(initialRole);
                }}
                footer={null}
                confirmLoading={isLoadingUpdate}
              >
                <div style={{ textAlign: "center" }}>
                  {tmpData.roleDescription}
                </div>
              </Modal>
            )
          } else if (confirmationType === "activateRole") {
            return (
              <Modal
                title="Activate role confirmation"
                open={isModalVisible}
                onOk={handleActivateRole}
                onCancel={() => {
                  setIsModalVisible(false);
                  setTmpData(initialRole);
                }}
                okText="Yes"
                confirmLoading={isLoadingUpdate}
                okButtonProps={{ type: "primary" }}
              >
                <p>
                  Are you sure want to change <b>"{tmpData.roleName}"</b> status to{" "}
                  <b>"Active"</b>?.{" "}
                  If this role status is changed to "Active", then this user can be use
                </p>
              </Modal>
            );
          } else if (confirmationType === "softDelete") {
            return (
              <Modal
                title="Soft delete confirmation"
                open={isModalVisible}
                onOk={handleSoftDelete}
                onCancel={() => {
                  setIsModalVisible(false);
                  setTmpData(initialRole);
                }}
                okText="Yes"
                confirmLoading={isLoadingUpdate}
                okButtonProps={{ type: "primary" }}
              >
                <p>
                  Are you sure want to soft delete <b>"{tmpData.roleName}"</b> ?
                </p>
              </Modal>
            );
          } else {
            return (
              <Modal
                title="Delete confirmation"
                open={isModalVisible}
                onOk={handleDelete}
                onCancel={() => {
                  setIsModalVisible(false);
                  setTmpData(initialRole);
                }}
                okText="Yes"
                confirmLoading={isLoadingUpdate}
                okButtonProps={{ type: "primary" }}
              >
                <p>
                  Are you sure want to hard delete <b>"{tmpData.roleName}"</b> ?
                </p>
              </Modal>
            )
          }
        })()}
      </Space>
    </React.Fragment>
  );
}
export default Role