import React from 'react'
import { useNavigate } from 'react-router-dom';
import { MoreOutlined, SearchOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import { Row, Col, Space, Table, message, Modal, Switch, Dropdown, Menu, Button, Card, Tag } from 'antd';
import HeaderSection from '../../components/HeaderSection';
import { BaseResponseProps } from "../../types/config.type";
import { RegionProps, initialRegion } from '../../types/region.type';
import { httpRequest } from "../../helpers/api";
import useFetchList from '../../hooks/useFetchList';
import { formatDate } from '../../helpers/constant';
import Text from 'antd/lib/typography/Text';
import type { TableProps } from 'antd';
// import useAuth from "../../hooks/useAuth";
import { useAuthUser } from 'react-auth-kit';

interface ResponseProps extends BaseResponseProps<RegionProps> { }

const Region = () => {
    const navigate = useNavigate()
    // const { user }:any = useAuthUser();
    const auth = useAuthUser();
    const user = auth()
    console.log(user)
    const {
        isLoading,
        fetchList,
        setData,
        data,
        pagination,
        changePage
    } = useFetchList<RegionProps>({
        endpoint: 'region'
    });

    const [isLoadingUpdate, setIsLoadingUpdate] = React.useState(false);
    const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
    const [tmpData, setTmpData] = React.useState<RegionProps>(initialRegion);
    const [confirmationType, setConfirmationType] = React.useState<string>("");


    const handleCreateRegion = () => {
        navigate({ pathname: "/regions/add" });
    };

    const handleDelete = async () => {
        try {
            setIsLoadingUpdate(true);
            // const permissions = user.roles.map(
            //   (item) => item.permissions["ROLE"]["DELETE"]["value"]
            // );
            // if (permissions.includes(true)) {
            let newData = [];
            await httpRequest.delete<ResponseProps>("/region/" + tmpData.id);
            newData = data.filter((item) => {
                return item.id !== tmpData.id;
            });
            setData(newData);
            message.success("Success delete " + tmpData.districtName);
            setIsModalVisible(false);
            setTmpData(initialRegion);
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
            setTmpData(initialRegion);
            setIsLoadingUpdate(false);
        }
    };

    const columns = [
        {
            title: 'Province Name',
            dataIndex: 'provinceName',
            key: 'provinceName',
            render: (provinceName: string) => provinceName
        },
        {
            title: 'Regency Name',
            dataIndex: 'regencyName',
            key: 'regencyName',
            render: (regencyName: string) => regencyName
        },
        {
            title: 'District Name',
            dataIndex: 'districtName',
            key: 'districtName',
            render: (districtName: string) => districtName
        },
        {
            title: 'ZIP Code',
            dataIndex: 'zipCode',
            key: 'zipCode',
            render: (zipCode: string) => zipCode
        },
        {
            title: 'JNE Code',
            dataIndex: 'jneCode',
            key: 'jneCode',
            render: (jneCode: string) => jneCode
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
            render: (_: any, record: RegionProps) => (
                <Dropdown overlay={() => menu(record)} placement="bottomRight">
                    <MoreOutlined style={{ cursor: 'pointer' }} />
                </Dropdown>
            ),
        },
    ] as TableProps<RegionProps>['columns'];

    const handleClick = (key: string, record: RegionProps) => {
        if (key === 'edit') {
            navigate({
                pathname: '/regions/' + record.id + '/edit',
            });

        } else if (key === "delete") {
            setConfirmationType("delete");
            setIsModalVisible(true);
            setTmpData(record);
        }
    }

    const menu = (record: RegionProps) => (
        <Menu onClick={(e) => handleClick(e.key, record)}>
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
    const rightAction: any =
        user?.role?.permissions["REGION"]["CREATE"]["value"]
            === true ? (
            <Button
                icon={<PlusOutlined />}
                style={{ marginRight: 20 }}
                type='primary'
                onClick={handleCreateRegion}
            >
                Add Region
            </Button>
        ) : (
            false
        )
    return (
        <React.Fragment>
            <HeaderSection
                icon={<UserOutlined />}
                title={'Region'}
                subtitle={'Manage Region'}
                rightAction={[
                    rightAction
                ]}
            />

            <Space direction="vertical" style={{ width: '100%' }}>
                <Card bordered={false} size="small">
                    <Table
                        rowKey="id"
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
                    return (
                        <Modal
                            title="Delete confirmation"
                            open={isModalVisible}
                            onOk={handleDelete}
                            onCancel={() => {
                                setIsModalVisible(false);
                                setTmpData(initialRegion);
                            }}
                            okText="Yes"
                            confirmLoading={isLoadingUpdate}
                            okButtonProps={{ type: "primary" }}
                        >
                            <p>
                                Are you sure want to delete <b>"{tmpData.districtName}"</b> ?
                            </p>
                        </Modal>
                    )
                })()}
            </Space>
        </React.Fragment>
    );
}
export default Region