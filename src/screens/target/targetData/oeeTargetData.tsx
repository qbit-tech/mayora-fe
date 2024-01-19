import React, { useState } from 'react';
import {
    Typography,
} from 'antd';
import { formatDate, PAGE_SIZE_OPTIONS } from '../../../helpers/constant';
import { initialTargetOEE, TargetOEEProps } from '../../../types/targetOEE.type';
import useCustomDataFetcher from '../../../hooks/useCustomDataFetcher';

const { Text, Link } = Typography;

const OEETargetData = () => {

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
    


    return (
        <React.Fragment>

                {
                    data.length > 0 && data[0].target
                }

        </React.Fragment>
    );

};

export default OEETargetData;