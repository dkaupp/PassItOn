import React, { useContext } from "react";
import { FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";
import Button from "../components/Button";
import CategoriesContext from "../context/categories/context";
import Card from "../components/Card";
import colors from "../config/colors";
import ListingsContext from "../context/listings/context";
import routes from "../navigation/routes";
import SearchBar from "../components/SearchBar";
import Screen from "../components/Screen";
import timePosted from "../utility/timePosted";
import useSearch from "../hooks/useSearch";

function ListingsScreen({ navigation }) {
  const { listings, loadListings, loading, error } = useContext(
    ListingsContext
  );
  const { categories } = useContext(CategoriesContext);

  const {
    filtered,
    onSearch,
    searchInput,
    onSelectedCategory,
    onSelectedFilter,
    selectedCategory,
    selectedFilter,
    onClearFilters,
  } = useSearch(listings, categories);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.screen}>
        {error && (
          <>
            <AppText>Couldn't retrieve the listings.</AppText>
            <Button title="Retry" onPress={loadListings} />
          </>
        )}
        <SearchBar
          onSearch={onSearch}
          input={searchInput}
          selectedFilter={selectedFilter}
          selectedCategory={selectedCategory}
          onSelectedCategory={onSelectedCategory}
          onSelectedFilter={onSelectedFilter}
          onClearFilters={onClearFilters}
        />
        <FlatList
          data={filtered}
          keyExtractor={(listing) => listing._id}
          renderItem={({ item }) => (
            <Card
              title={`${item.title}  (${item.location})`}
              date={timePosted(item.createdAt)}
              subTitle={"$" + item.price}
              imageUrl={item.images[0].url}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
              thumbnailUrl={item.images[0].thumbnailUrl}
            />
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
