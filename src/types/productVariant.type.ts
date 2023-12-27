import { BaseResponsePaginationProps } from "./config.type";

export interface ProductVariantProps {
  productVariantId: string;
  productId: string;
  productVariantCode: string;
  productVariantName: string;
  price: number;
  discount: number;
  unitOfMeasureCode: string;
  description?: string;
  isPublished: boolean;

  updatedAt?: Date | string;
  createdAt?: Date | string;
  statusLoading?: boolean;
}

export interface FetchAllProductVariantResponse
  extends BaseResponsePaginationProps<ProductVariantProps> {
  code: string;
  message: string;
  payload: {
    count: number;
    prev: string;
    next: string;
    results: ProductVariantProps[];
  };
}

export const initialProductVariant: ProductVariantProps = {
  productVariantId: "",
  productId: "",
  productVariantCode: "",
  productVariantName: "",
  price: 0,
  discount: 0,
  unitOfMeasureCode: "",
  description: "",
  isPublished: true,
  statusLoading: false,
};
