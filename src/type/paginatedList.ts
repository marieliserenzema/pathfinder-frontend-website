export type PaginatedList<T> = {
  items: T[];
  totalPages: number;
  count: number;
  currentPage: number;
  hasNextPage: boolean;
}
