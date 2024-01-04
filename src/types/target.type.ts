import { BaseResponsePaginationProps } from './config.type';

export interface TargetProps {
    targetId?: string;
    target: string;
    activeTarget: string;
    name: string;
    role: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isPublished?: boolean;
    statusLoading?: boolean;
}

export interface FetchAllTargetsResponse extends BaseResponsePaginationProps<TargetProps> {
    code: string;
    message: string;
    payload: {
        count: number
        prev: string
        next: string
        results: TargetProps[]
    }
}

export const initialTarget: TargetProps = {
    target: '',
    activeTarget: '',
    name: '',
    role: '',
}