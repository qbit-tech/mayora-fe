import { BaseResponsePaginationProps } from './config.type';

export interface TargetDefaultProps {
    // targetId?: string;
    id?: string;
    target: string;
    machineId: string;
    name: string;
    role: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isPublished?: boolean;
    statusLoading?: boolean;
}

export interface FetchAllTargetsResponse extends BaseResponsePaginationProps<TargetDefaultProps> {
    code: string;
    message: string;
    payload: {
        count: number
        prev: string
        next: string
        results: TargetDefaultProps[]
    }
}

export const initialTargetDefault: TargetDefaultProps = {
    target: '',
    machineId: '',
    name: '',
    role: '',
}