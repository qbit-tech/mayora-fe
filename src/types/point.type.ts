import { LoyaltyProps } from './loyaltyPoint.type';

export type PointProps = {
  pointId: string;
  currentState: string;
  currentAmount: number;
  pendingAmount: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  loyalty: LoyaltyProps;
};
