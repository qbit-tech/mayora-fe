import { BaseResponsePaginationProps } from './config.type';

export interface StoreProps {
  storeId: string;
  storeCode: string;
  storeName: string;
  description?: string;
  address?: string;
  address2?: string;
  city?: string;
  district?: string;
  province?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  siteUrl?: string;
  isPublished: boolean;
  geolocation?: {
    lat: number;
    lng: number;
  };
  shipmentSetting?: shipmentSettingProps;
  updatedAt?: Date | string;
  createdAt?: Date | string;
  statusLoading?: boolean;
  customerName?: string;
  deliveryPoint?: {
    name: string;
  };
  image?: string;
}

export interface LocationImageProps {
  storeImageId: string;
  storeId: string;
  imageUrl: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface FetchAllStoreResponse
  extends BaseResponsePaginationProps<StoreProps> {
  code: string;
  message: string;
  payload: {
    count: number;
    prev: string;
    next: string;
    results: StoreProps[];
  };
}

export const initialStore: StoreProps = {
  storeId: '',
  storeCode: '',
  storeName: '',
  description: '',
  address: '',
  address2: '',
  city: '',
  postalCode: '',
  phone: '',
  email: '',
  siteUrl: '',
  isPublished: true,
  geolocation: {
    lat: 0,
    lng: 0,
  },
  shipmentSetting: {
    jne: { originCode: '', branchCode: '' },
    rpx: { originCode: '' },
    rex: { originCode: '' },
  },
  statusLoading: false,
};

export interface shipmentSettingProps {
  jne: { originCode: string; branchCode: string };
  rpx: { originCode: string };
  rex: { originCode: string };
}

export const initialShipmentSetting: shipmentSettingProps = {
  jne: { originCode: '', branchCode: '' },
  rpx: { originCode: '' },
  rex: { originCode: '' },
};
