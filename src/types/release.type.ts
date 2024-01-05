import { BaseResponsePaginationProps } from './config.type';

export interface ReleaseProps {
    releaseId?: string;
    releaseName: string;
    time?: Date | string;
    releaseAmount: number;
    createdAt?: Date | string;
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
    releaseName: '',
    releaseAmount: 0,
    isPublished: true,
}