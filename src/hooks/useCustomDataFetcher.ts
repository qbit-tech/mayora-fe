import React from 'react';
import { useDebounce } from 'use-debounce';
import { AxiosInstance } from 'axios';
import useSWR, { mutate } from 'swr';
import { generateQueryString } from '../helpers/generateQueryString';
import {
    IHttpResponse,
    INITIAL_QUERY,
    IPayloadPagination,
    IQuery,
} from '../helpers/pagination';
import { httpRequest } from '../helpers/api';

type Props = {
    endpoint: string;
    initialQuery?: Object;
    limit?: number;
    pushData?: boolean;
    apiRequest?: AxiosInstance;
    fetchable?: boolean;
};

const DEFAULT_LIMIT = 25;

export default function useCustomDataFetcher<DataType, ExtendType = {}>(props: Props) {
    const fetchable = props.fetchable === undefined ? true : props.fetchable;
    const apiRequest: AxiosInstance = props.apiRequest || httpRequest;
    const [query, setQuery] = React.useState<IQuery<ExtendType>>({
        ...INITIAL_QUERY,
        limit: props.limit || DEFAULT_LIMIT,
        offset: 0,
        ...props.initialQuery,
    } as IQuery<ExtendType>);

    const [search, setSearch] = React.useState<string>();
    const [searchValue] = useDebounce(search, 500);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [page, setPage] = React.useState<number>(1);
    const [totalData, setTotalData] = React.useState<number>(0);

    const key = fetchable ? `${props.endpoint}${generateQueryString({ ...query, search: searchValue, page })}` : null;

    const { data: customData, error: customDataError } = useSWR(
        key,
        (url) =>
            apiRequest
                .get<IHttpResponse<IPayloadPagination<DataType>>>(url)
                .then((res) => {
                    setTotalData(res.data.payload.count);
                    return res.data.payload;
                }),
        {
            initialData: { results: [], ...query },
            revalidateOnFocus: true,
            shouldRetryOnError: true,
        }
    );

    const fetchList = () => {
        return {
            data: customData?.results || [],
            isLoading: !customDataError && !customData,
            error: customDataError,
        };
    };

    const changePage = (newPage: number, perPage: number) => {
        setPage(newPage);
        setQuery((oldVal) => ({
            ...oldVal,
            limit: perPage,
            offset: (newPage - 1) * perPage,
        }));
        mutate(key);
    };

    const changeLimit = (perPage: number) => {
        setPage(1);
        setQuery((oldVal) => ({
            ...oldVal,
            limit: perPage,
            offset: 0,
        }));
        mutate(key);
    };

    React.useEffect(() => {
        setQuery((e: IQuery<ExtendType>) => ({
            ...e,
            search: searchValue as string,
        }));
    }, [searchValue]);

    return {
        isLoading,
        setIsLoading,
        data: customData?.results || [],
        pagination: {
            perPage: query.limit || DEFAULT_LIMIT,
            page,
            totalData,
        },
        query,
        fetchList,
        setQuery,
        setSearch,
        changePage,
        changeLimit,
    };
}