import { BaseResponsePaginationProps } from "./config.type";
import { CategoryProps } from "./category.type";

export interface ProductImagesProps {
  productId?: string;
  imageUrls?: string[];
  updatedAt?: Date | string;
  createdAt?: Date | string;
  statusLoading?: boolean;
}

export interface FetchAllProductResponse
  extends BaseResponsePaginationProps<ProductImagesProps> {
  code: string;
  message: string;
  payload: {
    count: number;
    prev: string;
    next: string;
    results: ProductImagesProps[];
  };
}

export const initialProductImages: ProductImagesProps = {
  productId: "",
  imageUrls: [],
  updatedAt: "",
  createdAt: "",
  statusLoading: false,
};
