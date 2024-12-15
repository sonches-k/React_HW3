import { useState, useEffect } from 'react';
import productsData from '../data/products.json';
import { Product, FiltersState } from '../types';

interface UseProductsParams {
  filters: FiltersState;
}

const useProducts = ({ filters }: UseProductsParams) => {
  const allProducts: Product[] = productsData as Product[];

  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const filteredProducts = allProducts.filter((p) => {
    const matchesName = filters.nameRegex ? filters.nameRegex.test(p.name.toLowerCase()) : true;
    const matchesCategory = filters.category ? p.category === filters.category : true;
    const matchesQuantity = filters.nonZeroQuantity ? p.quantity > 0 : true;

    return matchesName && matchesCategory && matchesQuantity;
  });

  useEffect(() => {
    setDisplayedProducts(filteredProducts.slice(0, 5));
    setHasMore(filteredProducts.length > 5);
  }, [filteredProducts]);

  const loadMore = () => {
    console.log('Loading more products...');
    const currentLength = displayedProducts.length;
    const nextProducts = filteredProducts.slice(currentLength, currentLength + 5);
    setDisplayedProducts((prev) => [...prev, ...nextProducts]);
    setHasMore(currentLength + nextProducts.length < filteredProducts.length);
  };

  return { displayedProducts, hasMore, loadMore };
};

export default useProducts;
