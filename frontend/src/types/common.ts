export type PaginationParams = {
  page: number;
  limit: number;
};

export type SortOrder = 'asc' | 'desc';

export type ApiResponse<T> = {
  data: T;
  message?: string;
  status: number;
};