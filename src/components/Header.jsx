import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAtomValue } from "jotai";
import { isAuthAtom, userAtom } from "../app/atoms";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  Button,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { redirectTo, removeCookie } from "../app/utils";
import NoticeModal from "./NoticeModal";
import { HashLink as Link } from 'react-router-hash-link';
import { buildRequestOptions } from "../app/api";

const Header = () => {
  const user = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Nouvel état pour le statut d'administrateur
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (!isLoggedIn) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:3000/admin_check', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}` // Utiliser le token de l'utilisateur
          }
        });

        if (!response.ok) {
          throw new Error('Failed to check admin status');
        }

        const data = await response.json();
        setIsAdmin(data.admin);
      } catch (error) {
        console.error('Error checking admin status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStatus();
  }, [isLoggedIn, user.token]);

  const handleResponse = (response) => {
    if (response.status.code === 200) {
      removeCookie();
      redirectTo();
    }
  };

  const handleLogout = () => {
    const { url, options } = buildRequestOptions("users", "sign_out", {
      token: user.token,
    });
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => handleResponse(response))
      .catch((err) => console.error(err));
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return <div>Loading...</div>; // Afficher un message de chargement pendant la vérification du statut admin
  }

  return (
    <header>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              RAYM Marketplace
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button component={NavLink} to="/" color="inherit">
                Accueil
              </Button>
              <Button component={Link} to="/#contact" color="inherit">
                Contact
              </Button>
              {!isLoggedIn && (
                <div>
                  <Button component={NavLink} to="/login" color="inherit">
                    Connexion
                  </Button>
                  <Button component={NavLink} to="/register" color="inherit">
                    Inscription
                  </Button>
                </div>
              )}
              {isLoggedIn && (
                <div>
                  <Button component={NavLink} to="/user_settings" color="inherit">
                    Mes informations
                  </Button>
                  <Button component={NavLink} to="/cart" color="inherit">
                    Mon Panier
                  </Button>
                  {isAdmin && (
                    <Button component={NavLink} to="/admin" color="inherit">
                      Dashboard
                    </Button>
                  )}
                  <Button onClick={handleLogout} color="inherit">
                    Se déconnecter
                  </Button>
                </div>
              )}
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton edge="start" color="inherit" onClick={handleMenuOpen}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem component={NavLink} to="/" onClick={handleMenuClose}>
            Accueil
          </MenuItem>
          {!isLoggedIn && (
            <div>
              <MenuItem component={NavLink} to="/login" onClick={handleMenuClose}>
                Connexion
              </MenuItem>
              <MenuItem
                component={NavLink}
                to="/register"
                onClick={handleMenuClose}
              >
                Inscription
              </MenuItem>
            </div>
          )}
          {isLoggedIn && (
            <div>
              <MenuItem
                component={NavLink}
                to="/user_settings"
                onClick={handleMenuClose}
              >
                Mes informations
              </MenuItem>
              <MenuItem
                component={NavLink}
                to="/cart"
                onClick={handleMenuClose}
              >
                Mon Panier
              </MenuItem>
              {isAdmin && (
                <MenuItem
                  component={NavLink}
                  to="/admin"
                  onClick={handleMenuClose}
                >
                  Dashboard
                </MenuItem>
              )}
              <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
            </div>
          )}
        </Menu>
      </AppBar>
      <NoticeModal />
    </header>
  );
};

export default Header;
