export interface PaginationControls {
  currentPage: number;
  maxPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
}