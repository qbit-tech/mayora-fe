import { BaseResponsePropsNoPayload } from './config.type';

export interface RegionProps {
  id: string;
  provinceName: string;
  regencyName: string;
  districtName: string;
  zipCode: string;
  jneCode: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface FetchAllRegionResponse extends BaseResponsePropsNoPayload {
  payload: {
    count: number;
    prev: string;
    next: string;
    results: RegionProps[];
  };
}

export const initialRegion: RegionProps = {
  id: '',
  regencyName: '',
  provinceName: '',
  districtName: '',
  zipCode: '',
  jneCode: '',
  updatedAt: new Date(),
  createdAt: new Date(),
};
