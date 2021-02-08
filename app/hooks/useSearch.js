import { useState } from "react";

const initialFilter = {
  id: "1",
  name: "Posted",
  key: "createdAt",
  order: "desc",
};

const useSearch = (listings, categories) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);
  const [searchInput, setSearchInput] = useState("");

  const onSearch = (text) => setSearchInput(text);

  const filteredByCategory = selectedCategory
    ? listings.filter((listing) => listing.categoryId === selectedCategory._id)
    : listings;

  const filteredBySearchInput = searchInput
    ? filteredByCategory.filter(
        (listing) =>
          listing.title
            .toLowerCase()
            .includes(searchInput.toLocaleLowerCase()) ||
          listing.description
            .toLowerCase()
            .includes(searchInput.toLocaleLowerCase())
      )
    : filteredByCategory;

  const sortList = (list, key, order) => {
    if (key === "price") {
      return order !== "asc"
        ? list.sort((a, b) => (a.price < b.price ? -1 : 1))
        : list.sort((a, b) => (a.price < b.price ? -1 : 1)).reverse();
    }
    if (key === "createdAt") {
      return order !== "asc"
        ? list
            .sort((a, b) =>
              a[key].toUpperCase() < b[key].toUpperCase() ? -1 : 1
            )
            .reverse()
        : list.sort((a, b) =>
            a[key].toUpperCase() < b[key].toUpperCase() ? -1 : 1
          );
    }
    return order !== "asc"
      ? list.sort((a, b) =>
          a[key].toUpperCase() < b[key].toUpperCase() ? -1 : 1
        )
      : list
          .sort((a, b) =>
            a[key].toUpperCase() < b[key].toUpperCase() ? -1 : 1
          )
          .reverse();
  };

  const filtered = sortList(
    filteredBySearchInput,
    selectedFilter.key,
    selectedFilter.order
  );

  const getCategory = (id) =>
    categories.find((category) => category._id === id);

  const onSelectedFilter = (item) => {
    setSelectedFilter(item);
  };

  const onSelectedCategory = (id) => {
    const category = getCategory(id);
    setSelectedCategory(category);
  };

  const clearSelectedCategory = () => setSelectedCategory(null);
  const clearSelectedFilter = () => setSelectedFilter(initialFilter);

  const onClearFilters = () => {
    clearSelectedCategory();
    clearSelectedFilter();
  };

  return {
    filtered,
    onSearch,
    searchInput,
    sortList,
    onSelectedFilter,
    onSelectedCategory,
    selectedFilter,
    selectedCategory,
    onClearFilters,
  };
};

export default useSearch;
