export interface ICategoryListItem {
  id: string;
  name: string;
  categoryParentId: string;
  categoryLevel: string;
  updatedBy: string;
  createdBy: string;
  updatedAt: Date;
  createdAt: Date;
  level2: CategoryLevel2[];
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
  level3: CategoryList[];
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
}