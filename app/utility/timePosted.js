import dayjs from "dayjs";

const timePosted = (createdAt) => {
  const now = dayjs();

  const listingday = dayjs(createdAt);

  const minutes = now.diff(listingday, "minute");
  const hours = now.diff(listingday, "hour");
  const days = now.diff(listingday, "day");

  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  return `${days}d`;
};

export default timePosted;
