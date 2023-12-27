import { BaseResponsePaginationProps } from './config.type';


export interface CategoryProps {
  categoryId?: string;
  categoryName: string;
  description?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  isPublished: boolean;
  subCategories: Omit<CategoryProps, 'subCategories'>[]
  statusLoading?: boolean;
}

export interface FetchAllCategoriesResponse extends BaseResponsePaginationProps<CategoryProps> {
  code: string;
    message: string;
    payload: {
        count: number
        prev: string
        next: string
        results: CategoryProps[]
    }
}

export const initialProductCategories: CategoryProps = {
  categoryName: '',
  description: '',
  subCategories: [],
  isPublished: true,
}