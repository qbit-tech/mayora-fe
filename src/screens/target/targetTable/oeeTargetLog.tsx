import React, { useState } from 'react';
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
import HeaderSection from '../../../components/HeaderSection';
import { httpRequest } from '../../../helpers/api';
import {
    BaseResponsePaginationProps,
    BaseResponseProps,
} from '../../../types/config.type';
import styled from 'styled-components';
import useFetchList from '../../../hooks/useFetchList';
import useSWR from 'swr';
import { formatDate, formatTime, formatYearToTime, formatYearToTimeWithSpace, PAGE_SIZE_OPTIONS } from '../../../helpers/constant';
import { initialProduct, ProductProps } from '../../../types/products.type';
import { initialTarget, TargetProps } from '../../../types/target.type';
import { initialTargetDefault, TargetDefaultProps } from '../../../types/targetDefault.type';
import { initialTargetOEE, TargetOEEProps } from '../../../types/targetOEE.type';
import {
    CategoryProps,
    FetchAllCategoriesResponse,
    initialProductCategories,
} from '../../../types/category.type';
import { replaceDashWithSpace } from '../../../helpers/replaceDashWithSpace';
import CustomPagination from '../../../components/CustomPagination';
import { IconArrowDown } from '../../../assets/icons';
import useDetailBreadcrumbs from '../../../hooks/useDetailBreadcrumbs';
import type { TableProps } from 'antd';
import NotSet from '../../../components/NotSet';
import useCustomDataFetcher from '../../../hooks/useCustomDataFetcher';
import { TabsProps } from 'antd/lib';
import { DataNode } from 'antd/es/tree';
import InputDefaultTarget from '.././modal/InputDefaultTarget';
import InputCurrentTarget from '.././modal/InputCurrentTarget';
import InputOeeTarget from '.././modal/InputOeeTarget';
import DefaultTargetData from '.././targetData/defaultTargetData';
import CurrentTargetData from '.././targetData/currentTargetData';
import OEETargetData from '.././targetData/oeeTargetData';



const { Text, Link } = Typography;

const OEETargetLog = () => {

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
    } = useCustomDataFetcher<TargetOEEProps>({
        endpoint: 'oeeTargets',
        limit: +PAGE_SIZE_OPTIONS[0],
    });


    const columns = [
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (text: string, record: TargetOEEProps) => {
                return (
                    <div className="">
                        {record.updatedAt ? formatYearToTimeWithSpace(record.updatedAt) : '-'}
                    </div>
                );
            }
        },
        {
            title: 'Target',
            dataIndex: 'target',
            key: 'target',
            render: (text: string, record: TargetOEEProps) => {
                return (
                    <div className="">
                        {record.target ? record.target : '-'}%
                    </div>
                );
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: TargetOEEProps) => {
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
            render: (text: string, record: TargetOEEProps) => {
                return (
                    <div className="">
                        {record.role ? record.role : '-'}
                    </div>
                );
            }
        },
    ] as TableProps<TargetOEEProps>['columns'];


    return (
        <React.Fragment>
                <Col span={24}>
                    <Table
                        columns={columns}
                        dataSource={data}
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
        </React.Fragment>
    );

};


export default OEETargetLog;

