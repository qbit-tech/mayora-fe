import React, { useState } from 'react';
import AppLayout from '../layout/AppLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { FolderOpenOutlined, CheckOutlined, FormOutlined, MoreOutlined, TagOutlined } from '@ant-design/icons';
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
    Divider,
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
import { initialTarget, TargetProps } from '../../types/target.type';
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

const { Text, Link } = Typography;

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

    const [tempRelease, setTempRelease] = React.useState<TargetProps>(
        initialTarget
    );

    const {
        isLoading,
        setIsLoading,
        data,
        pagination,
        // setData,
        setSearch,
        fetchList,
        setQuery,
        changePage,
        changeLimit,
    } = useCustomDataFetcher<TargetProps>({
        endpoint: 'product/target',
        limit: +PAGE_SIZE_OPTIONS[0],
    });

    const exampleData = [
        {
            target: "3000",
            activeTarget: "09:10",
            name: "Default Target",
            role: "Admin",
        },
        {
            target: "3000",
            activeTarget: "09:10",
            name: "Default Target",
            role: "Admin",
        },
        {
            target: "3000",
            activeTarget: "09:10",
            name: "Default Target",
            role: "Admin",
        },
    ]

    const columns = [
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (text: string, record: TargetProps) => {
                return (
                    <div className="">
                        {record.updatedAt ? formatDate(record.updatedAt) : '-'}
                    </div>
                );
            }
        },
        {
            title: 'Target',
            dataIndex: 'target',
            key: 'target',
            render: (text: string, record: TargetProps) => {
                return (
                    <div className="">
                        {record.target ? record.target : '-'}
                    </div>
                );
            }
        },
        {
            title: 'Active Target',
            dataIndex: 'activeTarget',
            key: 'activeTarget',
            render: (text: string, record: TargetProps) => {
                return (
                    <div className="">
                        {record.activeTarget ? record.activeTarget : '-'}
                    </div>
                );
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: TargetProps) => {
                return (
                    <div className="">
                        {record.name ? record.name : '-'}
                    </div>
                );
            }
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (text: string, record: TargetProps) => {
                return (
                    <div className="">
                        {record.role ? record.role : '-'}
                    </div>
                );
            }
        },
    ] as TableProps<TargetProps>['columns'];


    const TabPane1 = () => {
        return (
            <div style={{ height: '500px', width: '100%', backgroundColor: 'white', padding: "20px" }}>
                <React.Fragment>
                    <Row gutter={20}>
                        <Col span={8} className='gutter-row' style={{ border: "1px solid rgba(5, 5, 5, 0.26)", borderRadius: 5, padding: "10px", marginRight: 20 }}>
                            <Row>
                                <Text style={{ fontSize: 15 }}>Default Target</Text>
                            </Row>
                            <Row style={{ borderBottom: "2px solid rgba(5, 5, 5, 0.16)", marginBottom: 5 }}>
                                <Col>
                                    <Text style={{ fontSize: 40, fontWeight: "bold" }}>3000</Text>
                                </Col>
                                <Col offset={1}>
                                    <Link style={{ fontSize: 20, textDecoration: "underline", top: 20, position: "relative" }}>
                                        Edit
                                    </Link>
                                </Col>
                            </Row>
                            <Row>
                                <Text type='secondary' style={{ fontSize: 11 }}>Default Target akan berlaku seterusnya sebagai nilai awal apabila tidak ada pergantian nilai target</Text>
                            </Row>
                        </Col>
                        <Col span={8} className='gutter-row' style={{ border: "1px solid rgba(5, 5, 5, 0.26)", borderRadius: 5, padding: "10px" }}>
                            <Row>
                                <Col span={12}>
                                    <Text style={{ fontSize: 15 }}>Current Target</Text>
                                </Col>
                                <Col span={12} className='text-right'>
                                    <Text type='danger' style={{ fontSize: 15, fontWeight: "bold" }}>
                                        {new Date().getDate() + " " + new Date().toLocaleString('default', { month: 'short' }) + " " + new Date().getFullYear()}
                                    </Text>
                                </Col>
                            </Row>
                            <Row style={{ borderBottom: "2px solid rgba(5, 5, 5, 0.16)", marginBottom: 5 }}>
                                <Col>
                                    <Text style={{ fontSize: 40, fontWeight: "bold" }}>3000</Text>
                                </Col>
                                <Col offset={1}>
                                    <Link style={{ fontSize: 20, textDecoration: "underline", top: 20, position: "relative" }}>
                                        Edit
                                    </Link>
                                </Col>
                            </Row>
                            <Row>
                                <Text type='secondary' style={{ fontSize: 11 }}>Default Target akan berlaku seterusnya sebagai nilai awal apabila tidak ada pergantian nilai target</Text>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Text style={{ fontWeight: "bold", marginTop: 20 }}>Production Target Log</Text>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Table
                                columns={columns}
                                dataSource={exampleData}
                                pagination={false}
                                style={{ marginTop: 10, width: '100%' }}
                            />
                            <CustomPagination
                                data={data && data}
                                pagination={pagination}
                                changeLimit={changeLimit}
                                changePage={changePage}
                            />
                        </Col>
                    </Row>
                </React.Fragment>
            </div>
        )
    }

    const TabPane2 = () => {
        return (
            <div style={{ height: '500px', width: '100%', backgroundColor: 'white', padding: "20px" }}>
                <React.Fragment>
                    <Row gutter={20}>
                        <Col span={8} className='gutter-row' style={{ border: "1px solid rgba(5, 5, 5, 0.26)", borderRadius: 5, padding: "10px", marginRight: 20 }}>
                            <Row>
                                <Text style={{ fontSize: 15 }}>OEE Target</Text>
                            </Row>
                            <Row style={{ marginBottom: 5 }}>
                                <Col>
                                    <Text style={{ fontSize: 40, fontWeight: "bold" }}>90%</Text>
                                </Col>
                                <Col offset={1}>
                                    <Link style={{ fontSize: 20, textDecoration: "underline", top: 20, position: "relative" }}>
                                        Edit
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Text style={{ fontWeight: "bold", marginTop: 20 }}>OEE Target Log</Text>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Table
                                columns={columns}
                                dataSource={exampleData}
                                pagination={false}
                                style={{ marginTop: 10, width: '100%' }}
                            />
                            <CustomPagination
                                data={data && data}
                                pagination={pagination}
                                changeLimit={changeLimit}
                                changePage={changePage}
                            />
                        </Col>
                    </Row>
                </React.Fragment>
            </div>
        )
    }

    const tabItems: TabsProps['items'] = [
        {
            key: '1',
            label: 'Production Target',
            children: TabPane1(),
        },
        {
            key: '2',
            label: 'Target OEE',
            children: TabPane2(),
        },
    ];


    return (
        <React.Fragment>
            <HeaderSection
                // icon={<TagOutlined />}
                title="Target"
            />
            <div>
                <Tabs defaultActiveKey="1" items={tabItems} type="card" onChange={onChange} />
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
