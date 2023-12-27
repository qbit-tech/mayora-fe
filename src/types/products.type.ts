import { BaseResponsePaginationProps } from './config.type';
import { CategoryProps } from './category.type';
import { ProductPriceProps, initialProductPrice } from './productPrices.type';
import { ProductVariantProps } from './productVariant.type';

type Dimensions = {
  dimensions: {
    lengthInCm: number,
    widthInCm: number,
    heightInCm: number
  }
}

type Specifications = {
  specifications: {
    volume: {
      label: string,
      value: string
    },
    color: {
      label: string,
      value: string
    },
    warranty: {
      label: string,
      value: string
    },
  }
}

export interface ProductProps {
  productId?: string;
  productName: string;
  productCode: string;
  grossWeightInKG: number;
  netWeightInKG: number;
  productType: string;
  productCategoryId: string;
  description: string;
  dimensions: Dimensions;
  specifications: Specifications & any;
  isPublished: boolean;
  isHighlight: boolean;
  createdByUserId: string;
  productVariants?: ProductVariantProps[];
  productCategories?: any;

  // volume: number;

  // category: string;
  // subcat: string;

  // baseUnit: string;
  // salesUnit: string;
  // purchaseUnit: string;

  images?: Array<{
    fileId: string;
    imageUrl: string | null;
  }>;

  // variants: ProductVariantProps[];
  // categories: CategoryProps[];
  // prices: ProductPriceProps[];
  // currentProductPrice: ProductPriceProps;

  updatedAt?: Date | string;
  createdAt?: Date | string;
  statusLoading?: boolean;
}

export interface FetchAllProductResponse
  extends BaseResponsePaginationProps<ProductProps> {
  code: string;
  message: string;
  payload: {
    count: number;
    prev: string;
    next: string;
    results: ProductProps[];
  };
}

export const initialProduct: ProductProps = {

  productId: '',
  productName: '',
  productCode: '',
  productType: '',
  productCategoryId: '',
  description: '',
  grossWeightInKG: 0,
  netWeightInKG: 0,
  dimensions: {
    dimensions: {
      lengthInCm: 0,
      widthInCm: 0,
      heightInCm: 0
    }
  },
  specifications: {
    specifications: {
      volume: {
        label: '',
        value: ''
      },
      color: {
        label: '',
        value: ''
      },
      warranty: {
        label: '',
        value: ''
      },
    }
  },
  isPublished: true,
  isHighlight: true,
  createdByUserId: '',
  images: [],
  updatedAt: '',
  createdAt: '',
  statusLoading: false,
};
