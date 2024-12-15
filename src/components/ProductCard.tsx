import React from 'react';
import { Card, CardContent, CardMedia, Typography, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.2s ease-in-out',
  width: '350px', 
  height: '380px', 
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const StyledDescription = styled(Typography)({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  // картинка, если отсутствует изображение
  const defaultImage = 'https://avatars.mds.yandex.net/i?id=8ad6a2e3c7eb24581a1119dd06e8ee7b_sr-4798081-images-thumbs&n=13';

  return (
    <Tooltip title={product.description}>
      <StyledCard onClick={onClick}>
        <CardContent>
          {/* название */}
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {product.name}
          </Typography>

          {/* категория */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {product.category}
          </Typography>
        </CardContent>

        {/* изображение */}
        <CardMedia
          component="img"
          height="200"
          width="200"
          image={product.image || defaultImage} 
          alt={product.name}
          sx={{ objectFit: 'contain' }}
        />

        <CardContent>
          {/* описание с обрезкой */}
          <StyledDescription variant="body2" color="text.secondary">
            {product.description}
          </StyledDescription>

          {/* количество и единица измерения */}
          <Typography variant="body2" sx={{ mt: 1 }}>
            {product.quantity} {product.unit}
          </Typography>
        </CardContent>
      </StyledCard>
    </Tooltip>
  );
};

export default ProductCard;
