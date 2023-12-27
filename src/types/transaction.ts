import { StoreProps } from './store.type';
import { ProductProps } from './products.type';
import { UserProperties } from './user.type';

export enum ETransactionStatus {
  // payment_failed = "payment_failed", // pembayaran bermasalah
  // process = "process", // diproses

  // canceled = "canceled", // dibatalkan
  // rejected = "rejected", // ditolak
  // refunded = "refunded", // refunded
  // received = "received", //diterima

  created = 'created', // menunggu pembayaran
  paid = 'paid', // dibayar
  expired = 'expired', // expired
  scheduled_for_shipment = 'scheduled_for_shipment',
  shipped = 'shipped', // dikirim
  done = 'done', //diterima
}

export enum ECourierVendor {
  VINES = 'VINES',
}

export enum EPaymentType {
  PAYMENT_GATEWAY = 'PAYMENT_GATEWAY',
  POINT = 'POINT',
  VOUCHER = 'VOUCHER',
}

export enum EPaymentGateway {
  MIDTRANS = 'MIDTRANS',
}

export enum EPaymentMethod {
  bank_transfer = 'bank_transfer',
  instant_payment = 'instant_payment',
  outlet = 'outlet',
  credit_card = 'credit_card',
}

export enum EPaymentVendor {
  bri = 'bri',
  mandiri = 'mandiri',
  bca = 'bca',
  bni = 'bni',
  permata = 'permata',
  gopay = 'gopay',
  alfamart = 'alfamart',
  credit_card = 'credit_card',
}

export enum EPaymentStatus {
  failed_to_create_pg = 'failed_to_create_pg',
  waiting_payment = 'waiting_payment',
  paid = 'paid',
  expired = 'expired',
  failure = 'failure',
  cancel = 'cancel',
  rejected = 'rejected',
}

export enum EShipmentStatus {
  CREATED = 'CREATED',
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN PROGRESS',
  DELIVERED = 'DELIVERED',
}

export interface TransactionItemProperties {
  transactionItemId: string;
  transactionId: string;
  productId: string;
  metaProduct: any;
  qty: number;
  unitOfMeasure: string;
  pricePerUnit: number;
  totalFinalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
  transaction?: TransactionProps;
}

export type ShipToAddressProperties = {
  postalCode: number;
  province: string;
  regency: string;
  district: string;
  address: string;
  additionalInfo: string;
  receiverName: string;
  receiverPhone: string;
};

export interface TransactionShipmentProperties {
  transactionShipmentId: string;
  transactionId: string;
  courierVendor: string;
  shipToAdress: ShipToAddressProperties;
  weight: number;
  waybill?: string;
  shipmentStatus: EShipmentStatus;
  shipmentProgress: any;
  shipmentType: string;
  createdAt?: Date;
  updatedAt?: Date;
  transaction?: TransactionProps;
  courirService: {
    cost: {
      currency: string;
      note: string;
      value: number;
      etd: string;
    };
    service: string;
    serviceCode: string;
  };
}

export type TransactionDetailProperties = {
  transactionDetailId: string;
  transactionId: string;
  paymentType: EPaymentType;
  paymentGateway: EPaymentGateway;
  paymentMethod: EPaymentMethod;
  paymentVendor: EPaymentVendor;
  paymentAccount?: any;
  totalPayment: number;
  vendorFee: number;
  paymentStatus: EPaymentStatus;
  metaPayment?: any;
  paidAt?: Date;
  expiredAt: Date;
  updatedAt?: Date;
  createdAt?: Date;
  transaction?: TransactionProps;
};

export type DetailsTransaction = {
  key: string;
  type: string;
  label: string;
  value: number;
};

export interface TransactionProps {
  transactionId: string;
  transactionCode: string;
  totalPrice: number;
  totalFinalPrice: number;
  transactionStatus: ETransactionStatus;
  locationId: string;
  metaLocation?: StoreProps;
  buyerId: string;
  buyerDetail?: UserProperties;
  details?: { items: DetailsTransaction[] };
  createdAt?: Date;
  updatedAt?: Date;
  transactionItems?: TransactionItemProperties[];
  transactionShipment?: TransactionShipmentProperties;
  transactionDetail?: TransactionDetailProperties[];
}

export const initialTransactions: TransactionProps = {
  transactionId: '',
  transactionCode: '',
  transactionStatus: ETransactionStatus.created,
  locationId: '',
  totalFinalPrice: 0,
  totalPrice: 0,
  buyerId: '',
  details: {
    items: [
      {
        key: '',
        type: '',
        label: '',
        value: 0,
      },
    ],
  },
};
