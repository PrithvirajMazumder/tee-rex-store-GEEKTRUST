import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Snackbar,
  Stack,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import IncrementDecrementCounter from "../components/IncrementDecrementCounter";
import CartContext from "../context/cart/Cart.context";
import { openAlert } from "../utils/Alert.utils";

export default function Cart() {
  const { cartItems, reduceItemFromCart, addToCart, removeFromCart } =
    useContext(CartContext);

  const [alertController, setAlertController] = useState({
    open: false,
  });

  return (
    <Container sx={{ paddingTop: "2rem" }}>
      <Grid container spacing={2}>
        <Grid sx={{ overflowY: "scroll" }} item sm={9} xs={12}>
          <Paper elevation={0} sx={{ padding: "1rem" }}>
            <Typography variant="h6">Shopping Cart</Typography>
            <Divider />
            {!cartItems.length && (
              <Typography
                variant="h6"
                my="1rem"
                textAlign="center"
                fontWeight={600}
              >
                Empty!
              </Typography>
            )}
            {cartItems.map((cartItem, index) => (
              <div key={`${cartItem.id}-${index}`}>
                <Stack direction="row" alignItems="center" py="1rem">
                  <Avatar
                    sx={{
                      height: "5rem",
                      width: "5rem",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      mr: "1rem",
                    }}
                    src={cartItem.imageURL}
                    alt={cartItem.name}
                  />
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight="600"
                      color="text.secondary"
                    >
                      {cartItem.name}
                    </Typography>
                    <Stack direction="row" alignItems="center">
                      <IncrementDecrementCounter
                        value={cartItem.cartQuantity}
                        onIncrement={() => {
                          if (cartItem.cartQuantity >= cartItem.quantity) {
                            setAlertController(
                              openAlert({
                                message: `Cannot be added more than ${cartItem.quantity}`,
                                severity: "warning",
                              })
                            );

                            return;
                          }

                          addToCart(cartItem);
                        }}
                        onDecrement={() => reduceItemFromCart(cartItem)}
                      />
                      <Button
                        onClick={() => removeFromCart(cartItem)}
                        size="small"
                        color="inherit"
                        sx={{ marginLeft: "1rem" }}
                        variant="text"
                      >
                        Remove
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
                <Divider variant="inset"></Divider>
              </div>
            ))}
          </Paper>
        </Grid>
        <Grid item sm={3} xs={12}>
          <Paper elevation={0} sx={{ padding: "1rem" }}>
            <Typography variant="h6">Billing</Typography>
            <Divider />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mt={"1rem"}
            >
              <Typography fontWeight={"600"} variant="h6">
                Total:
              </Typography>
              <Typography fontWeight={"600"} variant="h6">
                {cartItems.reduce(
                  (prev, curr) => prev + curr.cartQuantity * curr.price,
                  0
                )}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
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
    </Container>
  );
}
