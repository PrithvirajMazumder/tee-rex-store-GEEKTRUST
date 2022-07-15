import {
  Alert,
  Divider,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import FilterList from "../components/FilterList";
import TeeShirtCard from "../components/TeeShirtCard";
import CatalogueService from "../services/Catalogue.service";
import { FilterOptions } from "../constants/FilterMetas";
import FilterAndSearchService from "../services/FilterAndSearch.service";
import Search from "../components/Search";
import { openAlert } from "../utils/Alert.utils";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";

function TeeShirts() {
  const catalogueService = new CatalogueService();
  const { getFilteredProducts, getProductsBySearchKey } =
    new FilterAndSearchService();

  const [allProducts, setAllProducts] = useState([]);
  const [teeShirts, setTeeShirts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [filters, setFilters] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [alertController, setAlertController] = useState({
    open: false,
  });

  const loadTeeShirts = async () => {
    setIsLoading(true);
    try {
      const products = await catalogueService.getProducts();
      setAllProducts(products);
      setTeeShirts(products);
    } catch (error) {
      setAlertController(
        openAlert({
          message: error.message,
          severity: "error",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTeeShirts();
  }, []);

  useEffect(() => {
    setTeeShirts(
      getProductsBySearchKey(
        getFilteredProducts(allProducts, filters),
        searchKey
      )
    );
  }, [filters, searchKey]);

  return (
    <Container sx={{ pt: "2rem" }}>
      <Stack direction="row">
        <Search
          onSearchKeyUpdate={(searchKey) => setSearchKey(searchKey)}
        ></Search>
        <IconButton
          onClick={() => setIsOpenFilter(!isOpenFilter)}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <FilterAltIcon />
        </IconButton>
      </Stack>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={3}
          sx={{
            display: { xs: `${isOpenFilter ? "block" : "none"}`, sm: "block" },
          }}
        >
          <Paper elevation={0} sx={{ padding: "1rem" }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6">Filters</Typography>
              <IconButton
                sx={{ display: { xs: "block", sm: "none" } }}
                onClick={() => setIsOpenFilter(false)}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
            <Divider />
            <FilterList
              onFilterUpdate={(filters) => {
                setFilters(filters);
              }}
              filtersConfig={FilterOptions}
            />
          </Paper>
        </Grid>
        <Grid item sm={9}>
          <Paper elevation={0} sx={{ padding: "1rem" }}>
            {!teeShirts.length && (
              <Typography
                variant="h6"
                my="1rem"
                textAlign="center"
                fontWeight={600}
              >
                {isLoading ? "Loading" : "No Products"}
              </Typography>
            )}
            <Grid container spacing={2}>
              {teeShirts.map((teeShirt) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={teeShirt.id}>
                    <TeeShirtCard teeShirt={teeShirt}></TeeShirtCard>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={alertController.open}
        autoHideDuration={alertController.autoClose}
        onClose={() => setAlertController({ open: false })}
      >
        <Alert severity={alertController.severity} sx={{ width: "100%" }}>
          {alertController.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default TeeShirts;
