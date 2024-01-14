import { BaseResponsePaginationProps } from './config.type';

export interface ReleaseProps {
    releaseId?: string;
    machineId?: any;
    time?: Date | string;
    amount: number;
    shift?: number;
    createdAt?: Date;
    updatedAt?: Date | string;
    isPublished: boolean;
    statusLoading?: boolean;
}

export interface FetchAllReleasesResponse extends BaseResponsePaginationProps<ReleaseProps> {
    code: string;
    message: string;
    payload: {
        count: number
        prev: string
        next: string
        results: ReleaseProps[]
    }
}

export const initialRelease: ReleaseProps = {
    machineId: '',
    amount: 0,
    shift: 0,
    isPublished: true,
}