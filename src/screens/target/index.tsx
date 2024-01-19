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
import { formatDate, formatTime, formatYearToTime, formatYearToTimeWithSpace, PAGE_SIZE_OPTIONS } from '../../helpers/constant';
import { initialProduct, ProductProps } from '../../types/products.type';
import { initialTarget, TargetProps } from '../../types/target.type';
import { initialTargetDefault, TargetDefaultProps } from '../../types/targetDefault.type';
import { initialTargetCurrent, TargetCurrentProps } from '../../types/targetCurrent.type';
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
import InputDefaultTarget from './modal/InputDefaultTarget';
import InputCurrentTarget from './modal/InputCurrentTarget';
import InputOeeTarget from './modal/InputOeeTarget';
import DefaultTargetData from './targetData/defaultTargetData';
import CurrentTargetData from './targetData/currentTargetData';
import OEETargetData from './targetData/oeeTargetData';
import ProductionTargetLog from './targetTable/productionTargetLog';
import OEETargetLog from './targetTable/oeeTargetLog';


interface ResponseProps extends BaseResponseProps<ProductProps> {
    payload: Omit<ProductProps, 'createdAt' | 'updatedAt'>;
}

const { Text, Link } = Typography;

const Categories = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isDefautModalVisible, setIsDefaultModalVisible] = useState(false);
    const [isCurrentModalVisible, setIsCurrentModalVisible] = useState(false);
    const [isOeeModalVisible, setIsOeeModalVisible] = useState(false);

    const onSelect = (selectedKeys: React.Key[], info: any) => {
        console.log('selected', selectedKeys, info);
    };

    const onChange = (key: string) => {
        console.log(key);
    };

    const [tempRelease, setTempRelease] = React.useState<TargetProps>(
        initialTarget
    );

    // const {
    //     isLoading,
    //     setIsLoading,
    //     data,
    //     pagination,
    //     // setData,
    //     setSearch,
    //     fetchList,
    //     setQuery,
    //     changePage,
    //     changeLimit,
    // } = useCustomDataFetcher<TargetCurrentProps>({
    //     endpoint: 'productionTargets',
    //     limit: +PAGE_SIZE_OPTIONS[0],
    // });

    const handleEditClickDefault = () => {
        setIsDefaultModalVisible(true);
    };

    const handleModalCancelDefault = () => {
        setIsDefaultModalVisible(false);
    };

    const handleEditClickCurrent = () => {
        setIsCurrentModalVisible(true);
    }

    const handleModalCancelCurrent = () => {
        setIsCurrentModalVisible(false);
    }

    const handleEditClickOee = () => {
        setIsOeeModalVisible(true);
    }

    const handleModalCancelOee = () => {
        setIsOeeModalVisible(false);
    }


    const TabPane1 = () => {
        return (
            <div style={{ height: 'auto', width: '100%', backgroundColor: 'white', padding: "20px" }}>
                <React.Fragment>

                    <Row gutter={20}>
                        <Col span={8} className='gutter-row' style={{ border: "1px solid rgba(5, 5, 5, 0.26)", borderRadius: 5, padding: "10px", marginRight: 20 }}>
                            <Row>
                                <Text style={{ fontSize: 15 }}>Default Target</Text>
                            </Row>
                            <Row style={{ borderBottom: "2px solid rgba(5, 5, 5, 0.16)", marginBottom: 5 }}>
                                <Col>
                                    <Text style={{ fontSize: 40, fontWeight: "bold" }}>
                                        {
                                            DefaultTargetData()
                                        }
                                    </Text>
                                </Col>
                                <Col offset={1}>
                                    <Link style={{ fontSize: 20, textDecoration: "underline", top: 20, position: "relative" }} onClick={handleEditClickDefault}>
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
                                    <Text style={{ fontSize: 40, fontWeight: "bold" }}>
                                        {
                                            CurrentTargetData()
                                        }
                                    </Text>
                                </Col>
                                <Col offset={1}>
                                    <Link style={{ fontSize: 20, textDecoration: "underline", top: 20, position: "relative" }} onClick={handleEditClickCurrent}>
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
                        {
                            ProductionTargetLog()
                        }
                    </Row>


                </React.Fragment>
            </div>
        )
    }

    const TabPane2 = () => {
        return (
            <div style={{ height: 'auto', width: '100%', backgroundColor: 'white', padding: "20px" }}>
                <React.Fragment>
                    <Row gutter={20}>
                        <Col span={8} className='gutter-row' style={{ border: "1px solid rgba(5, 5, 5, 0.26)", borderRadius: 5, padding: "10px", marginRight: 20 }}>
                            <Row>
                                <Text style={{ fontSize: 15 }}>OEE Target</Text>
                            </Row>
                            <Row style={{ marginBottom: 5 }}>
                                <Col>
                                    <Text style={{ fontSize: 40, fontWeight: "bold" }}>
                                        {OEETargetData()}%
                                    </Text>
                                </Col>
                                <Col offset={1}>
                                    <Link style={{ fontSize: 20, textDecoration: "underline", top: 20, position: "relative" }} onClick={handleEditClickOee}>
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
                        {
                            OEETargetLog()
                        }
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

            <InputDefaultTarget visibleInputDefaultTarget={isDefautModalVisible} onCancelInputDefaultTarget={handleModalCancelDefault} />
            <InputCurrentTarget visibleInputCurrentTarget={isCurrentModalVisible} onCancelInputCurrentTarget={handleModalCancelCurrent} />
            <InputOeeTarget visibleInputOeeTarget={isOeeModalVisible} onCancelInputOeeTarget={handleModalCancelOee} />
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
