import { ShoppingBag } from "@mui/icons-material";
import { Badge } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/cart/Cart.context";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar disableGutters>
          <Link
            to="/"
            style={{
              marginRight: 2,
              fontWeight: 700,
              fontSize: "1.5rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TeeRex Store
          </Link>

          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <Link
              to="/"
              style={{
                marginLeft: "auto",
                marginRight: "1rem",
                fontWeight: 700,
                fontSize: "1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Products
            </Link>
            <Link
              to="/cart"
              style={{
                marginRight: 2,
                fontWeight: 700,
                fontSize: "1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Badge badgeContent={cartItems.length} color="secondary">
                <ShoppingBag />
              </Badge>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
