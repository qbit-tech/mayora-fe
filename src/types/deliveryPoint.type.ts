import { StoreProps } from "./store.type";

export interface DeliveryPointProps {
  deliveryPointId: string;
  name: string;
  locationId: string;
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  location?: StoreProps;
  statusLoading?: boolean;
}

export const initialDeliveryPoint: DeliveryPointProps = {
  deliveryPointId: "",
  name: "",
  isPublished: false,
  locationId: "",
  statusLoading: false,
};
