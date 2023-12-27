import { BaseResponsePaginationProps } from './config.type';

export interface NotifScheduleProps {
    id: string;
    senderUserId: string;
    receiverUserIds: string[];
    title: string;
    message: string;
    body: any;
    type: string;
    status: string;
    metaSenderUser: any;
    scheduledAt: Date;
    updatedAt: Date;
    createdAt: Date;
}

export interface FetchAllNotifScheduleResponse extends BaseResponsePaginationProps<NotifScheduleProps> {
	code: string;
	message: string;
	payload: {
		count: number;
		prev: string;
		next: string;
		results: NotifScheduleProps[];
	};
}

export const initialNotifSchedule: NotifScheduleProps = {
	id: '',
    senderUserId: '',
    receiverUserIds: [],
    title: '',
    message: '',
    body: undefined,
    type: '',
    status: '',
    metaSenderUser: undefined,
    scheduledAt: new Date(),
    updatedAt: new Date(),
    createdAt: new Date(),
};