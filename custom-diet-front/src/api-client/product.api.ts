import { Product } from '@/types/product.type';
import { http } from './http-wrapper';

export interface SearchProductQuery {
  query: string;
  page: number;
  limit: number;
}

export const productApi = {
  getProducts: async (
    params: SearchProductQuery
  ): Promise<{
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }> => {
    return http.get('/products/search', {
      params: {
        q: params.query,
        skip: params.page - 1,
        limit: params.limit
      }
    });
  }
};
