export enum EVoucherDiscountType {
	nominal = 'nominal',
	percentage = 'percentage',
}

export enum EVoucherStatus {
	pending = 'pending',
	used = 'used',
	available = 'available',
	expired = 'expired',
}

export enum EVoucherType {
	generate = 'generate',
	event = 'event',
}

export type Requirement = {
	minTotalTransaction: number;
};

export type VoucherEventProperties = {
	voucherEventId: string;
	title: string;
	description: string;
	createdAt?: Date;
	updatedAt?: Date;
	vouchers?: VoucherProperties[];
	tags?: VoucherTagProperties[];
};

export type VoucherTagProperties = {
	voucherTagId: string;
	name: string;
	published: boolean;
	createdAt?: Date;
	updatedAt?: Date;
	events?: VoucherEventProperties[];
};

export type VoucherProperties = {
	voucherCode: string;
	voucherEventId: string;
	discountType: EVoucherDiscountType;
	discountValue: number;
	maxDiscountValue: number;
	requirement: Requirement;
	limitMaxUsePerPerson: number;
	limitMaxUseUser: number;
	validStartAt: Date;
	validEndAt: Date;
	refCommissionType: EVoucherDiscountType;
	refCommissionValue: number;
	voucherType: EVoucherType;
	voucherStatus: EVoucherStatus;
	updatedAt?: Date;
	createdAt?: Date;
	event?: VoucherEventProperties;
	totalUsed?: number;
};

export const initialVoucher: VoucherProperties = {
	voucherCode: '',
	voucherEventId: '',
	discountType: EVoucherDiscountType.nominal,
	discountValue: 0,
	maxDiscountValue: 0,
	requirement: {
		minTotalTransaction: 0,
	},
	limitMaxUsePerPerson: 1,
	limitMaxUseUser: 1,
	validStartAt: new Date(),
	validEndAt: new Date(),
	refCommissionType: EVoucherDiscountType.nominal,
	refCommissionValue: 0,
	voucherType: EVoucherType.generate,
	voucherStatus: EVoucherStatus.available,
};

export const initialVoucherEvent: VoucherEventProperties = {
	voucherEventId: '',
	title: '',
	description: '',
};
