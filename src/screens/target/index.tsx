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
import DefaultTargetData from './targetData/defaultTargetData';
import CurrentTargetData from './targetData/currentTargetData';
import OEETargetData from './targetData/oeeTargetData';
import ProductionTargetLog from './targetData/targetTable/productionTargetLog';
import OEETargetLog from './targetData/targetTable/oeeTargetLog';
import { set } from 'date-fns';


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
    const [onSuccess, setOnSuccess] = React.useState<boolean>(false);

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

    const handleOnSuccessChange = (value: boolean) => {
        setOnSuccess(value);
    };

    React.useEffect(() => {
        console.log('parent',onSuccess);
    }, [onSuccess]);

    const TabPane1 = () => {
        return (
            <div style={{ height: 'auto', width: '100%', backgroundColor: 'white', padding: "20px" }}>
                <React.Fragment>

                    <Row gutter={20}>
                        <DefaultTargetData />
                        <CurrentTargetData onSuccessCallback={handleOnSuccessChange}/>
                    </Row>



                    <Row>

                        <Text style={{ fontWeight: "bold", marginTop: 20 }}>Production Target Log</Text>
                        
                        <ProductionTargetLog onSuccess={onSuccess} setOnSuccess={setOnSuccess} display={true} />
                    
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
                        
                        <OEETargetData onSuccessCallback={handleOnSuccessChange} />

                    </Row>

                    <Row>
                        <Text style={{ fontWeight: "bold", marginTop: 20 }}>OEE Target Log</Text>
                    </Row>

                    <Row>
                        <OEETargetLog onSuccess={onSuccess} setOnSuccess={setOnSuccess} display={true} />
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
