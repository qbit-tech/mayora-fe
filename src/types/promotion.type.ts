import { BaseResponsePaginationProps } from './config.type';
import { ProductProps } from './products.type';

export interface PromotionProps {
	promoId: string;
	promoCode: string;
	description: string;
	descriptionPromo?: string;
	amount: number;
	items: PromotionItems[];
	startAt?: Date;
	endAt?: Date;
	image?: string;
	createdAt?: Date | string;
	updatedAt?: Date | string;
	statusLoading?: boolean;
	isPublished?: boolean;
	isHighlight?: boolean;
	isArchive?: boolean;
	status?: string;
	originalPrice?: number;
	finalPrice?: number;
	discountText?: string;
}

export interface PromotionItems {
	promotionItemsId: string;
	productId: string;
	product: ProductProps;
	promoId: string;
	quantity: number;
	salesPrice: number;
	totalAmount: number;
	discAmount: number;
	discPercentage: number;
	createdAt?: Date | string;
	updatedAt?: Date | string;
	statusLoading?: boolean;
}

export interface FetchAllPromotionResponse extends BaseResponsePaginationProps<PromotionProps> {
	code: string;
	message: string;
	payload: {
		count: number;
		prev: string;
		next: string;
		results: PromotionProps[];
	};
}

export const initialPromotion: PromotionProps = {
	promoId: '',
	promoCode: '',
	description: '',
	amount: NaN,
	items: [],
};
