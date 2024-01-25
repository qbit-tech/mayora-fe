import type { TableProps } from 'antd';
import {
    Col,
    Table,
    Typography
} from 'antd';
import React from 'react';
import CustomPagination from '../../../../components/CustomPagination';
import { PAGE_SIZE_OPTIONS, formatTime, formatYearToTimeWithSpace } from '../../../../helpers/constant';
import useFetchList from '../../../../hooks/useFetchList';
import { TargetCurrentProps } from '../../../../types/targetCurrent.type';



const { Text, Link } = Typography;

const ProductionTargetLog =
    (props: {
        onSuccess: boolean,
        setOnSuccess: any,
        display: boolean
    }) => {

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
        } = useFetchList<TargetCurrentProps>({
            endpoint: 'productionTargets/log',
            limit: +PAGE_SIZE_OPTIONS[0],
        });


        // if (props.onSuccess == true) {
        //     console.log('ini beneran')
        //     fetchList();
        // }
        React.useEffect(() => {
            if (props.onSuccess == true) {
                console.log('ini beneran')
                fetchList();
                props.setOnSuccess(false);
            }
        }, [props.onSuccess]);

        const columns = [
            {
                title: 'Updated At',
                dataIndex: 'updatedAt',
                key: 'updatedAt',
                render: (text: string, record: TargetCurrentProps) => {
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
                render: (text: string, record: TargetCurrentProps) => {
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
                render: (text: string, record: TargetCurrentProps) => {
                    return (
                        <div className="">
                            {record.activeTarget ? formatTime(record.activeTarget) : '-'}
                        </div>
                    );
                }
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (text: string, record: TargetCurrentProps) => {
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
                render: (text: string, record: TargetCurrentProps) => {
                    return (
                        <div className="">
                            {record.role ? record.role : '-'}
                        </div>
                    );
                }
            },
        ] as TableProps<TargetCurrentProps>['columns'];

        const { display } = props;

        return (
            <React.Fragment>
                {
                    display == true ?
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
                        : null
                }


            </React.Fragment>
        );

    };



export default ProductionTargetLog;

