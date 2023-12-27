import { BaseResponsePaginationProps } from './config.type';

export interface SubscriptionProps {
    id: string;
    userId: string;
    email: string;
    subscriptionTypes: string[];
    updatedAt: Date;
    createdAt: Date;
}

export interface FetchAllSubscriptionResponse extends BaseResponsePaginationProps<SubscriptionProps> {
	code: string;
	message: string;
	payload: {
		count: number;
		prev: string;
		next: string;
		results: SubscriptionProps[];
	};
}

export const initialSubscription: SubscriptionProps = {
	id: '',
    userId: '',
    email: '',
    subscriptionTypes: [],
    updatedAt: new Date(),
    createdAt: new Date(),
};