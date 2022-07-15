import {
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FilterTypes } from "../constants/FilterMetas";
import FilterAndSearchService from "../services/FilterAndSearch.service";

export default function FilterList({ filtersConfig = [], onFilterUpdate }) {
  const filterAndSearchService = new FilterAndSearchService();
  const filterMetas = filterAndSearchService.createFilterMetas(filtersConfig);
  const [appliedFilterMap, setAppliedFilterMap] = useState({});

  useEffect(() => {
    if (onFilterUpdate) {
      onFilterUpdate(filterAndSearchService.convertFilterMap(appliedFilterMap));
    }
  }, [appliedFilterMap]);

  return (
    <Box sx={{ mt: "1rem" }}>
      {filterMetas.map((filterMeta, index) => {
        return (
          <div key={index}>
            <Typography variant="body1" color="text.secondary" fontWeight="600">
              {filterMeta.key.toUpperCase()}
            </Typography>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}
            >
              {filterMeta.values.map((filterValue, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      const updatedFilterMap =
                        filterAndSearchService.updateFilterMap(
                          appliedFilterMap,
                          filterMeta,
                          filterValue
                        );
                      setAppliedFilterMap({ ...updatedFilterMap });
                    }}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={
                          appliedFilterMap[filterMeta.key] !== undefined &&
                          appliedFilterMap[filterMeta.key][filterValue.id] !==
                            undefined
                        }
                        edge="start"
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        filterMeta.type === FilterTypes.singleSelect
                          ? filterValue.value
                          : `${filterValue.value.start}-${filterValue.value.end}`
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </div>
        );
      })}
    </Box>
  );
}
