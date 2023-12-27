import { TransactionProps } from './transaction';

export type RedeemTransactionProps = {
  historyId: string;
  totalPointAmount: number;
  transactionId: string;
  metadata: {
    qty: number;
    pricePerUnit: number;
    redeemProductId: string;
  }[];
  transaction: TransactionProps;
  createdAt: string;
  updatedAt: string;
};
