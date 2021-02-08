import { useEffect } from "react";
import useAuth from "../auth/useAuth";
import listingsApi from "../api/listings";

const useListings = () => {
  const { user } = useAuth();
  const { data: listings, error, loading, request: loadListings } = useApi(
    listingsApi.getMyListings
  );

  useEffect(() => {
    loadListings(user._id);
  }, []);

  return { listings, error, loading, loadListings };
};

export default useListings;
