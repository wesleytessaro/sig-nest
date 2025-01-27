export interface PaginatedResult<T> {
  items: T[];
  meta: {
    total: number;
    pagina: number;
    tamanho: number;
    totalPaginas: number;
  };
}
