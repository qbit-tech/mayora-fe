import { BaseResponsePaginationProps } from './config.type';


export interface NewsProps {
    articleId: string;
    images: string[];
    title: string;
    contentText: string;
    isPublished: boolean;
    statusLoading?: boolean;
    updatedAt?: Date;
    createdAt?: Date;
}

export interface FetchAllNewsResponse extends BaseResponsePaginationProps<NewsProps> {
  code: string;
    message: string;
    payload: {
        count: number
        prev: string
        next: string
        results: NewsProps[]
    }
}

export const initialNews: NewsProps = {
    articleId: '',
    images: [],
    title: '',
    contentText: '',
    isPublished: true,
}