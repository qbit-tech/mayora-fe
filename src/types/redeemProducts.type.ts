import { BaseResponsePaginationProps } from './config.type';
import { ProductProps } from './products.type';

export interface RedeemProductProps {
	redeemProductId: string;
	productId: string;
	pointAmount: number;
	isPublished: boolean;
	updatedAt?: Date;
	createdAt?: Date;
	product?: ProductProps;
}

export const initialRedeemProduct: RedeemProductProps = {
	redeemProductId: '',
	productId: '',
	pointAmount: 0,
	isPublished: true,
};
