import { IManualollectionListItem } from "../manual-collection";

export interface CategoryParent {
  id: string;
  name: string;
  categoryParentId: string;
  categoryLevel: string;
  updatedBy: string;
  createdBy: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface ICategoryListItem extends CategoryParent{
  children: ICategoryListItem[],
  level5: CategoryList[]
}

export interface CategoryLevel2 {
  id: string;
  name: string;
  categoryParentId: string;
  categoryLevel: string;
  updatedBy: string;
  createdBy: string;
  updatedAt: Date;
  createdAt: Date;
  childrens: CategoryList[];
  level5: CategoryList[]
}

export interface CategoryList {
  id: string;
  name: string;
  categoryParentId: string;
  categoryType: string;
  updatedBy: string;
  createdBy: string;
  updatedAt: Date;
  createdAt: Date;
  unit: string;
  manualCollection: IManualollectionListItem[]
}