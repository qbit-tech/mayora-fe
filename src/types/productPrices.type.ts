import { BaseResponsePaginationProps } from "./config.type";

export interface ProductPriceProps {
  productPriceId: string;
  productId: string;
  productVariantId?: string;
  startAt?: Date;
  endAt?: Date;
  unitOfMeasureCode: string;
  unitPrice: number;
  minQty: number;

  updatedAt?: Date | string;
  createdAt?: Date | string;
  statusLoading?: boolean;
}

export interface FetchAllProductPriceResponse
  extends BaseResponsePaginationProps<ProductPriceProps> {
  code: string;
  message: string;
  payload: {
    count: number;
    prev: string;
    next: string;
    results: ProductPriceProps[];
  };
}

export const initialProductPrice: ProductPriceProps = {
  productPriceId: "",
  productId: "",
  productVariantId: "",
  startAt: new Date(),
  endAt: new Date(),
  unitOfMeasureCode: "pcs",
  unitPrice: 10000,
  minQty: 1,
  statusLoading: false,
};
