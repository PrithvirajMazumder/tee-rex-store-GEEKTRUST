import {
  Alert,
  Box,
  Divider,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { useContext, useState } from "react";
import CartContext from "../context/cart/Cart.context";
import { openAlert } from "../utils/Alert.utils";
import IncrementDecrementCounter from "./IncrementDecrementCounter";

export default function TeeShirtCard({ teeShirt }) {
  const { cartItems, addToCart, reduceItemFromCart } = useContext(CartContext);
  const [alertController, setAlertController] = useState({
    open: false,
  });

  const getTeeShirtCartIndex = (teeShirt) =>
    cartItems.indexOf(
      cartItems.find((cartItem) => cartItem.id === teeShirt.id)
    );

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={teeShirt.imageURL}
        alt="green iguana"
      />
      <Box>
        <Stack direction="row" alignItems="flex-end" sx={{ p: "1rem" }}>
          <Typography variant="h5" fontWeight={600} component="div">
            {teeShirt.name}
          </Typography>
          <Typography
            fontWeight={600}
            variant="caption"
            color="text.secondary"
            ml="0.5rem"
          >
            {teeShirt.gender}
          </Typography>
        </Stack>
        <Divider></Divider>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            height: "2rem",
            p: "1rem",
            bgcolor: "background.default",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            {teeShirt.currency} {teeShirt.price}
          </Typography>
          {getTeeShirtCartIndex(teeShirt) === -1 && (
            <Button
              onClick={() => {
                addToCart(teeShirt);
              }}
              variant="contained"
              size="small"
            >
              Add to cart
            </Button>
          )}
          {getTeeShirtCartIndex(teeShirt) !== -1 && (
            <IncrementDecrementCounter
              value={cartItems[getTeeShirtCartIndex(teeShirt)].cartQuantity}
              onIncrement={() => {
                if (
                  cartItems[getTeeShirtCartIndex(teeShirt)].cartQuantity >=
                  teeShirt.quantity
                ) {
                  setAlertController(
                    openAlert({
                      message: `Cannot be added more than ${teeShirt.quantity}`,
                      severity: "warning",
                    })
                  );

                  return;
                }

                addToCart(teeShirt);
              }}
              onDecrement={() => reduceItemFromCart(teeShirt)}
            />
          )}
        </Stack>
      </Box>
      <Snackbar
        open={alertController.open}
        autoHideDuration={alertController.autoClose}
        onClose={() => {
          setAlertController({ open: false });
        }}
      >
        <Alert severity={alertController.severity} sx={{ width: "100%" }}>
          {alertController.message}
        </Alert>
      </Snackbar>
    </Card>
  );
}
