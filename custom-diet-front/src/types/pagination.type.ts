export interface PaginationQuery {
  page: number;
  limit: number;
  orderByField?: string;
  isDesc?: boolean;
}

export interface PaginationResponse {
  totalRecordNo: number;
  totalPageNo: number;
}
