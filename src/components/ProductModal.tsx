import { Dialog, DialogContent, DialogTitle, Typography, Box } from '@mui/material';
import { Product } from '../types';

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose, product }) => {
  if (!product) return null;

  // использован компонент dialog, тк он более высокоуровневый и удобный относительно modal 
  // тут уже есть встроенные структуры типа DialogTitle, DialogContent
  // тут также легче настроить скролл 
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          width: '800px', 
          height: '500px', 
          maxWidth: 'none', 
        },
      }}
    >
      {/* Заголовок */}
      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          {product.name}
        </Typography>
      </DialogTitle>

      {/* Содержимое модального окна */}
      <DialogContent
        dividers
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          overflowY: 'auto', // Прокрутка
        }}
      >
        {/* Категория */}
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Category:</strong> {product.category}
        </Typography>

        {/* Изображение */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              maxWidth: '100%', 
              maxHeight: '200px', 
              objectFit: 'contain', 
            }}
          />
        </Box>

        {/* Описание */}
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Description:</strong> {product.description}
        </Typography>

        
        {/* Количество */}
        <Typography variant="body1">
          <strong>Quantity:</strong> {product.quantity} {product.unit}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
