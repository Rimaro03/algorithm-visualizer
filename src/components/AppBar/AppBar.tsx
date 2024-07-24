import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CodeIcon from '@mui/icons-material/Code';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button, Container, Menu, Tooltip, useTheme } from '@mui/material';

const pages = ['Arrays', 'Trees', 'Graphs'];

export default function MenuAppBar(props: { colorMode: { toggleColorMode: () => void; }; }) {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const theme = useTheme();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <CodeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Algorithm visualizer
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <CodeIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        ALGORITHM VISUALIZER
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Change color mode">
                            <IconButton sx={{ ml: 1, p: 0 }} onClick={props.colorMode.toggleColorMode} color="inherit">
                                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton>
                        </Tooltip>
                    </Box>

                </Toolbar>
            </AppBar>
        </Box>
        // <AppBar position="static">
        //     <Container>
        //         <Toolbar>
        //             <CodeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        //             <Typography
        //                 variant="h6"
        //                 noWrap
        //                 component="a"
        //                 href="#app-bar-with-responsive-menu"
        //                 sx={{
        //                     mr: 2,
        //                     display: { xs: 'none', md: 'flex' },
        //                     fontFamily: 'monospace',
        //                     fontWeight: 700,
        //                     letterSpacing: '.3rem',
        //                     color: 'inherit',
        //                     textDecoration: 'none',
        //                 }}
        //             >
        //                 ALGORITHM VISUALIZER
        //             </Typography>

        //             <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        //                 <IconButton
        //                     size="large"
        //                     aria-label="account of current user"
        //                     aria-controls="menu-appbar"
        //                     aria-haspopup="true"
        //                     onClick={handleOpenNavMenu}
        //                     color="inherit"
        //                 >
        //                     <MenuIcon />
        //                 </IconButton>
        //                 <Menu
        //                     id="menu-appbar"
        //                     anchorEl={anchorElNav}
        //                     anchorOrigin={{
        //                         vertical: 'bottom',
        //                         horizontal: 'left',
        //                     }}
        //                     keepMounted
        //                     transformOrigin={{
        //                         vertical: 'top',
        //                         horizontal: 'left',
        //                     }}
        //                     open={Boolean(anchorElNav)}
        //                     onClose={handleCloseNavMenu}
        //                     sx={{
        //                         display: { xs: 'block', md: 'none' },
        //                     }}
        //                 >
        //                     {pages.map((page) => (
        //                         <MenuItem key={page} onClick={handleCloseNavMenu}>
        //                             <Typography textAlign="center">{page}</Typography>
        //                         </MenuItem>
        //                     ))}
        //                 </Menu>
        //             </Box>

        //             <CodeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        //             <Typography
        //                 variant="h5"
        //                 noWrap
        //                 component="a"
        //                 href="#app-bar-with-responsive-menu"
        //                 sx={{
        //                     mr: 2,
        //                     display: { xs: 'flex', md: 'none' },
        //                     flexGrow: 1,
        //                     fontFamily: 'monospace',
        //                     fontWeight: 700,
        //                     letterSpacing: '.3rem',
        //                     color: 'inherit',
        //                     textDecoration: 'none',
        //                 }}
        //             >
        //                 ALGORITHM VISUALIZER
        //             </Typography>
        //             <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        //                 {pages.map((page) => (
        //                     <Button
        //                         key={page}
        //                         onClick={handleCloseNavMenu}
        //                         sx={{ my: 2, color: 'white', display: 'block' }}
        //                     >
        //                         {page}
        //                     </Button>
        //                 ))}
        //             </Box>

        //             <Box sx={{ flexGrow: 0 }}>
        //                 <Tooltip title="Open settings">
        //                     <IconButton sx={{ ml: 1, p: 0 }} onClick={props.colorMode.toggleColorMode} color="inherit">
        //                         {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        //                     </IconButton>
        //                 </Tooltip>
        //                 <Menu
        //                     sx={{ mt: '45px' }}
        //                     id="menu-appbar"
        //                     anchorEl={anchorElUser}
        //                     anchorOrigin={{
        //                         vertical: 'top',
        //                         horizontal: 'right',
        //                     }}
        //                     keepMounted
        //                     transformOrigin={{
        //                         vertical: 'top',
        //                         horizontal: 'right',
        //                     }}
        //                     open={Boolean(anchorElUser)}
        //                     onClose={handleCloseUserMenu}
        //                 >
        //                     {pages.map((page) => (
        //                         <MenuItem key={page} onClick={handleCloseUserMenu}>
        //                             <Typography textAlign="center">{page}</Typography>
        //                         </MenuItem>
        //                     ))}
        //                 </Menu>
        //             </Box>
        //         </Toolbar>
        //     </Container>
        // </AppBar>
    );
}