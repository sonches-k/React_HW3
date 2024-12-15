import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Switch, Button, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '@fontsource/luckiest-guy'; 

interface AppBarNavProps {
  onMenuToggle: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const AppBarNav: React.FC<AppBarNavProps> = ({ onMenuToggle, isDarkMode, onToggleTheme }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ fontFamily: '"Luckiest Guy", cursive' }}>
        {/* меню */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuToggle}
          sx={{ fontFamily: '"Luckiest Guy", cursive' }}
        >
          <MenuIcon />
        </IconButton>

        {/* заголовок */}
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontFamily: '"Luckiest Guy", cursive',
            letterSpacing: 1.5,
            textTransform: 'uppercase',
          }}
        >
          Exotic
        </Typography>

        {/* темы */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Switch
            checked={isDarkMode}
            onChange={onToggleTheme}
            color="default"
            sx={{ fontFamily: '"Luckiest Guy", cursive' }}
          />
          <Typography
            variant="body2"
            color="inherit"
            sx={{
              fontFamily: '"Luckiest Guy", cursive',
              letterSpacing: 1,
            }}
          >
            {isDarkMode ? 'Dark' : 'Light'}
          </Typography>
        </Stack>

        {/* доп кнопки */}
        <Stack direction="row" spacing={2} sx={{ ml: 3 }}>
          <Button color="inherit" sx={{ fontFamily: '"Luckiest Guy", cursive' }}>
            Товары
          </Button>
          <Button color="inherit" sx={{ fontFamily: '"Luckiest Guy", cursive' }}>
            Склады
          </Button>
          <Button color="inherit" sx={{ fontFamily: '"Luckiest Guy", cursive' }}>
            О системе
          </Button>
          <Button color="inherit" sx={{ fontFamily: '"Luckiest Guy", cursive' }}>
            Личная страница
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarNav;
