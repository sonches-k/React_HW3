import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Product } from '../types';

interface InfiniteProductListProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const InfiniteProductList: React.FC<InfiniteProductListProps> = ({
  products,
  onProductClick,
}) => {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    console.log('Initializing visible products...');
    const initialProducts = products.slice(0, 8);
    setVisibleProducts(initialProducts);
    setHasMore(products.length > initialProducts.length);
  }, [products]);

  const handleLoadMore = () => {
    console.log('handleLoadMore called...');
    const currentLength = visibleProducts.length;
    const nextProducts = products.slice(currentLength, currentLength + 4);

    console.log('Current visible products length:', currentLength);
    console.log('Next products to add:', nextProducts);

    if (nextProducts.length > 0) {
      const updatedProducts = [...visibleProducts, ...nextProducts];
      setVisibleProducts(updatedProducts);
      setHasMore(updatedProducts.length < products.length);
      console.log('Updated visible products:', updatedProducts);
      console.log('Has more products to load:', updatedProducts.length < products.length);
    } else {
      console.log('No more products to add.');
      setHasMore(false);
    }
  };

  console.log('Rendering InfiniteProductList');
  console.log('Visible products:', visibleProducts);
  console.log('Total products:', products.length);
  console.log('Has more to load:', hasMore);

  return (
    <Box
      id="scrollableDiv"
      sx={{
        height: '80vh',
        overflow: 'auto', // Прокрутка внутри контейнера
      }}
    >
      <InfiniteScroll
        dataLength={visibleProducts.length} // Количество отображаемых товаров
        next={handleLoadMore} // Функция подгрузки
        hasMore={hasMore} // Есть ли ещё товары для загрузки
        loader={<Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>Downloading...</Typography>}
        endMessage={<Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>There are no more items.</Typography>}
        scrollableTarget="scrollableDiv" // Указываем контейнер для отслеживания прокрутки
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'center',
          }}
        >
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
          ))}
        </Box>
      </InfiniteScroll>
    </Box>
  );
  
};

export default InfiniteProductList;
