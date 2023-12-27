import { BaseResponsePaginationProps } from "./config.type";

export interface ProductStockProps {
  productStockId: string;
  productId: string;
  productVariantId?: string;
  storeId: string;
  description: string;
  baseUnitOfMeasure: string;
  initialStock: number;
  currentStock: number;

  updatedAt?: Date | string;
  createdAt?: Date | string;
  statusLoading?: boolean;
}

export interface FetchAllProductStockResponse
  extends BaseResponsePaginationProps<ProductStockProps> {
  code: string;
  message: string;
  payload: {
    count: number;
    prev: string;
    next: string;
    results: ProductStockProps[];
  };
}

export const initialProductStock: ProductStockProps = {
  productStockId: "",
  productId: "",
  productVariantId: "",
  storeId: "",
  description: "",
  baseUnitOfMeasure: "",
  initialStock: NaN,
  currentStock: NaN,
  statusLoading: false,
};
