import { BaseResponsePaginationProps } from './config.type';

export interface TargetOEEProps {
    // targetId?: string;
    id?: string;
    target: string;
    machineId: string;
    name: string;
    role: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isPublished?: boolean;
    statusLoading?: boolean;
}

export interface FetchAllTargetsResponse extends BaseResponsePaginationProps<TargetOEEProps> {
    code: string;
    message: string;
    payload: {
        count: number
        prev: string
        next: string
        results: TargetOEEProps[]
    }
}

export const initialTargetOEE: TargetOEEProps = {
    target: '',
    machineId: '',
    name: '',
    role: '',
}