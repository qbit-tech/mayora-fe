import React, { useState } from 'react';
import {
    Typography,
} from 'antd';
import { formatDate, PAGE_SIZE_OPTIONS } from '../../../helpers/constant';
import { initialTargetDefault, TargetDefaultProps } from '../../../types/targetDefault.type';
import useCustomDataFetcher from '../../../hooks/useCustomDataFetcher';

const { Text, Link } = Typography;

const CurrentTargetData = () => {

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
    } = useCustomDataFetcher<TargetDefaultProps>({
        endpoint: 'productionTargets',
        limit: +PAGE_SIZE_OPTIONS[0],
    });
    


    return (
        <React.Fragment>

                {
                    data.length > 0 && data[0].target
                }

        </React.Fragment>
    );

};

export default CurrentTargetData;