import { BaseResponsePaginationProps } from './config.type';

export interface TargetCurrentProps {
    // targetId?: string; 
    id?: string;
    target: string;
    machineId: string;
    activeTarget: Date | string;
    name: string;
    role: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    createdBy?: string;
    updatedBy?: string;
    isPublished?: boolean;
    statusLoading?: boolean;
}

export interface FetchAllTargetsResponse extends BaseResponsePaginationProps<TargetCurrentProps> {
    code: string;
    message: string;
    payload: {
        count: number
        prev: string
        next: string
        results: TargetCurrentProps[]
    }
}

export const initialTargetCurrent: TargetCurrentProps = {
    target: '',
    machineId: '',
    activeTarget: '',
    name: '',
    role: '',
}