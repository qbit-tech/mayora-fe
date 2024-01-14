export type ConfigState = {
  sidebarCollapsed: boolean;
  counterBatch: number;
};

export interface BaseResponseProps<T> {
  code: string;
  message: string;
  payload: T;
}

export interface BaseResponsePropsNoPayload {
  code: string;
  message: string;  
}

export interface UploadResponseProps {
  code: string;
  message: string;
}

export interface BaseResponsePaginationProps<T> {
  code: string;
  message: string;
  payload: {
    count: number;
    prev: string;
    next: string;
    results: Array<T>;
  };
}

export interface DefaultQuery {
  limit?: number;
  offset?: number;
}

export const initialConfig: ConfigState = {
  sidebarCollapsed: false,
  counterBatch: 0,
};

export interface HttpParam {
  showMessage?: boolean;
  token?: string;
  query?: any;
  method?: "get" | "post" | "put" | "patch" | "delete";
  path?: string;
  data?: any;
  content_type?: string;
  responseType?: string;
}
