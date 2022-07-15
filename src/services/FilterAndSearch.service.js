import { FilterTypes } from "../constants/FilterMetas";
import { SearchableKeys } from "../constants/SearchMetas";

export default class FilterAndSearchService {
  createFilterMetas = (filtersConfig) => {
    return filtersConfig.map(({ key, values, type }) => {
      return {
        key,
        type,
        values: values.map((value, index) => {
          return {
            id: index + 1,
            value,
          };
        }),
      };
    });
  };

  updateFilterMap = (previousFilterMap, { key, type }, filter) => {
    if (previousFilterMap[key] === undefined) {
      previousFilterMap[key] = { type };
      previousFilterMap[key][filter.id] = filter.value;

      return previousFilterMap;
    }

    if (previousFilterMap[key][filter.id] === filter.value) {
      delete previousFilterMap[key];

      return previousFilterMap;
    }

    previousFilterMap[key] = { type };
    previousFilterMap[key][filter.id] = filter.value;

    return previousFilterMap;
  };

  convertFilterMap = (filterMap) =>
    Object.keys(filterMap).map((filterMapKey) => {
      const [value, type] = Object.keys(filterMap[filterMapKey]);

      return {
        key: filterMapKey,
        type: filterMap[filterMapKey][type],
        value: filterMap[filterMapKey][value],
      };
    });

  getFilteredProducts = (products, filters) => {
    if (!filters.length) {
      return products;
    }

    let filteredProducts = [...products];
    filters.forEach(({ type, key, value }) => {
      if (type === FilterTypes.singleSelect) {
        filteredProducts = filteredProducts.filter(
          (filteredProduct) => filteredProduct[key] === value
        );

        return;
      }

      filteredProducts = filteredProducts.filter(
        (filteredProduct) =>
          filteredProduct[key] >= value.start &&
          filteredProduct[key] <= value.end
      );
    });

    return filteredProducts;
  };

  getProductsBySearchKey = (products, searchKey) => {
    return products.filter((product) =>
      SearchableKeys.some((searchableKey) =>
        product[searchableKey].toLowerCase().includes(searchKey.toLowerCase())
      )
    );
  };
}
