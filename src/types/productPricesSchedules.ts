import { BaseResponsePaginationProps } from "./config.type";

export interface ProductPricesScheduleProps {
    productPricesSchedulesId: string;
    productId: string;
    productVariantId?: string;
    newUnitPrice: number;
    status?: string,
    processedAt?: Date;
    scheduleAt: Date;

    updatedAt?: Date | string;
    createdAt?: Date | string;
    statusLoading?: boolean;
}

export interface FetchAllProductPricesScheduleResponse
    extends BaseResponsePaginationProps<ProductPricesScheduleProps> {
    code: string;
    message: string;
    payload: {
        count: number;
        prev: string;
        next: string;
        results: ProductPricesScheduleProps[];
    };
}

export const initialProductPricesSchedule: ProductPricesScheduleProps = {
    productPricesSchedulesId: "",
    productId: "",
    productVariantId: "",
    newUnitPrice: 0,
    status: "",
    processedAt: new Date(),
    scheduleAt: new Date(),
    statusLoading: false
};
