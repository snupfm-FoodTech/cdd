import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { productApi, SearchProductQuery } from '@/api-client/product.api';
import { QueryKeys } from '@/constants/query-keys.constant';
import { Product } from '@/types/product.type';
type UseProductsQueryOptions = Omit<
  UseQueryOptions<{
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }>,
  'queryKey' | 'queryFn'
>;

export const useProducts = (
  params: SearchProductQuery,
  options?: UseProductsQueryOptions
) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.PRODUCTS, params],
    queryFn: () => productApi.getProducts(params)
  });
};
