import React, { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import ListingsContext from "../context/listings/context";
import routes from "../navigation/routes";
import Screen from "../components/Screen";

import timePosted from "../utility/timePosted";
import useAuth from "../auth/useAuth";

function MyListingsScreen({ navigation }) {
  const { user } = useAuth();
  const { listings, loadListings, error, loading } = useContext(
    ListingsContext
  );

  const myListings = listings.filter((listing) => listing.userId === user._id);

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
        <FlatList
          data={myListings}
          keyExtractor={(listing) => listing._id}
          renderItem={({ item }) => (
            <View>
              <Card
                title={`${item.title}  (${item.location})`}
                date={timePosted(item.updatedAt)}
                subTitle={"$" + item.price}
                imageUrl={item.images[0].url}
                onPress={() => navigation.navigate(routes.EDIT_LISTING, item)}
                thumbnailUrl={item.images[0].thumbnailUrl}
              />
            </View>
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default MyListingsScreen;
