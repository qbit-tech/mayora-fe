import { CategoryProps } from '../types/category.type';

export function capitalizeFirstLetter(text: string = '') {
  return text.charAt(0)?.toUpperCase() + text.slice(1);
}

export function showReadableText(str: string) {
  return str.replace(/_/g, ' ');
}
export const getCategoryName = (
  categories: CategoryProps[] | undefined,
  type: 'category' | 'subCategory'
) => {
  if (type === 'category') {
    return categories?.find((category) => category?.categoryId === null)!
      ?.categoryName;
  } else if (type === 'subCategory') {
    return categories?.find((category) => category?.categoryId !== null)!
      ?.categoryName;
  }
};
