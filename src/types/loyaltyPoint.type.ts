import { BaseResponsePaginationProps } from './config.type';
import { UserProperties } from './user.type';

export interface LoyaltyProps {
	loyaltyId: string;
	loyaltyName: string;
	color: string;
	minPoint: number;
	maxPoint: number;
	minTotalTransaction: number;
	maxTotalTransaction: number;
	benefits: JSONLoyaltyBenefit;
	customers: UserProperties[];
	updatedAt?: Date | string;
	createdAt?: Date | string;
	statusLoading?: boolean;
	points?: {
		createdAt: Date;
		currentAmount: number;
		currentState: string;
		pendingAmount: number;
		pointId: string;
		updatedAt: Date;
		userId: string;
	}[];
}

export type JSONLoyaltyBenefit = {
	freeOngkir?: JSONLoyaltyBenefitFreeOngkir[];
	discounts?: JSONLoyaltyBenefitDiscount[];
	birthdayGift?: JSONLoyaltyBenefitBirthdayGift;
	otherBenefits?: string[];
};

type JSONLoyaltyBenefitFreeOngkir = {
	minSpend: number;
	provinceName: string;
	regencies: string[];
	maxDiscount: number;
};

type JSONLoyaltyBenefitDiscount = {
	categoryId: string;
	discountPercentage: number;
};

type JSONLoyaltyBenefitBirthdayGift = {
	type: 'default';
};

type JSONOngkirLocation = {
	province: string;
	city: string;
};

export interface FetchAllLoyaltyResponse extends BaseResponsePaginationProps<LoyaltyProps> {
	code: string;
	message: string;
	payload: {
		count: number;
		prev: string;
		next: string;
		results: LoyaltyProps[];
	};
}

export const initialLoyalty: LoyaltyProps = {
	loyaltyId: '',
	loyaltyName: '',
	color: '',
	minPoint: 0,
	maxPoint: 0,
	minTotalTransaction: 0,
	maxTotalTransaction: 0,
	customers: [],
	benefits: {
		freeOngkir: [
			{
				minSpend: 0,
				provinceName: '',
				regencies: [],
				maxDiscount: 0,
			},
		],
		discounts: [
			{
				categoryId: '',
				discountPercentage: 0,
			},
		],
		birthdayGift: {
			type: 'default',
		},
		otherBenefits: [],
	},
	updatedAt: '',
	createdAt: '',
	statusLoading: false,
};
