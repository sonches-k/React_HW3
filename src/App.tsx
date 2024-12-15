import React, { useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import AppBarNav from './components/AppBarNav';
import DrawerMenu from './components/DrawerMenu';
import ProductModal from './components/ProductModal';
import InfiniteProductList from './components/InfiniteProductList';
import productsData from './data/products.json';
import { lightTheme, darkTheme } from './theme';
import { Box } from '@mui/material';
import { Product, FiltersState } from './types';

const App: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<FiltersState>({
    nameRegex: null,
    category: null,
    nonZeroQuantity: false,
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const allProducts = productsData as Product[];
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);

  const applyFilters = (newFilters: FiltersState) => {
    const filtered = allProducts.filter((product) => {
      const matchesName = newFilters.nameRegex
        ? newFilters.nameRegex.test(product.name.toLowerCase())
        : true;
      const matchesCategory = newFilters.category ? product.category === newFilters.category : true;
      const matchesQuantity = newFilters.nonZeroQuantity ? product.quantity > 0 : true;

      return matchesName && matchesCategory && matchesQuantity;
    });
    setFilteredProducts(filtered);
    setFilters(newFilters); 
  };

  const categories = useMemo(() => {
    const cats = new Set(allProducts.map((p) => p.category));
    return Array.from(cats);
  }, [allProducts]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Верхняя панель навигации */}
      <AppBarNav
        onMenuToggle={() => setDrawerOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
      />

      {/* Меню с фильтрами */}
      <DrawerMenu
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        categories={categories}
        onApplyFilters={applyFilters}
        currentFilters={filters} // Передаём текущее состояние фильтров
      />

      {/* Список товаров */}
      <Box sx={{ mt: 2 }}>
        <InfiniteProductList
          products={filteredProducts}
          onProductClick={(product) => setSelectedProduct(product)}
        />
      </Box>

      {/* Модальное окно товара */}
      <ProductModal
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />
    </ThemeProvider>
  );
};

export default App;


