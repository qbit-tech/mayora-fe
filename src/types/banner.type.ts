import { BaseResponsePropsNoPayload } from './config.type';

export interface BannerProps {
  bannerId: string;
  bannerType: string;
  bannerImageUrl?: string;
  title: string;
  subtitle: string;
  content?: string;
  createdByUserId: string;
  metaCreatedByUser: UserMetadata;
  relatedContentType?: string;
  relatedContentId?: string;
  relatedContentUrl?: string;
  isPublished: boolean;
  order: number;
  updatedAt: Date;
  createdAt: Date;
}

export interface FetchAllBannerResponse extends BaseResponsePropsNoPayload {
  payload: {
    count: number;
    prev: string;
    next: string;
    results: BannerProps[];
  };
}

export const initialBanner: BannerProps = {
  bannerId: '',
  subtitle: '',
  bannerType: '',
  bannerImageUrl: '',
  title: '',
  content: '',
  createdByUserId: '',
  metaCreatedByUser: {
    userId: '',
    userType: '',
    name: '',
  },
  relatedContentType: '',
  relatedContentId: '',
  relatedContentUrl: '',
  isPublished: true,
  order: -1,
  updatedAt: new Date(),
  createdAt: new Date(),
};

export type UserMetadata = {
  userId: string;
  userType: string;
  name: string;
};

export enum EBannerType {
  promotions = 'PROMOTIONS',
  product = 'PRODUCT',
  url = 'URL',
}
